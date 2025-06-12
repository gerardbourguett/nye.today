import { useMemo } from 'react'
import type { TimeZoneReduced, TimeZoneWithCalculations, TimeZoneGroup } from '@/types/types'

export function useTimezoneData(timezones: TimeZoneReduced[]) {
  const { timeZoneGroups } = useMemo(() => {
    const now = new Date()
    const currentUTC = new Date(now.getTime() + (now.getTimezoneOffset() * 60000))
    
    const enhanced = timezones.map(tz => {
      const localTime = new Date(currentUTC.getTime() + (tz.gmtOffset * 1000))
      const localNow = new Date(localTime)
      const midnight = new Date(localNow)
      midnight.setDate(midnight.getDate() + 1)
      midnight.setHours(0, 0, 0, 0)
      
      const diffMs = midnight.getTime() - localNow.getTime()
      const totalMinutesToMidnight = Math.floor(diffMs / (1000 * 60))
      const hoursToMidnight = Math.floor(totalMinutesToMidnight / 60)
      const minutesToMidnight = totalMinutesToMidnight % 60
      
      let timeToMidnight: string
      let status: 'celebrating' | 'upcoming' | 'waiting'
      
      // Nueva lógica: Si pasó la medianoche (dentro de la primera hora del nuevo año) = celebrating, < 1 hora = upcoming, resto = waiting
      if (diffMs <= 0 || (localNow.getHours() === 0 && localNow.getMinutes() < 60)) {
        // Ya pasó la medianoche o está en la primera hora del nuevo año, están celebrando
        timeToMidnight = '🎉 CELEBRATING NOW!'
        status = 'celebrating'
      } else if (hoursToMidnight === 0) {
        // Menos de 1 hora para medianoche
        timeToMidnight = `${minutesToMidnight}m to midnight`
        status = 'upcoming'
      } else if (hoursToMidnight < 24) {
        // Entre 1 y 24 horas
        timeToMidnight = `${hoursToMidnight}h ${minutesToMidnight}m`
        status = 'waiting'
      } else {
        // Más de 24 horas
        const days = Math.floor(hoursToMidnight / 24)
        const remainingHours = hoursToMidnight % 24
        timeToMidnight = `${days}d ${remainingHours}h`
        status = 'waiting'
      }
      
      const startOfDay = new Date(localNow)
      startOfDay.setHours(0, 0, 0, 0)
      const endOfDay = new Date(startOfDay)
      endOfDay.setDate(endOfDay.getDate() + 1)
      
      const dayProgress = (localNow.getTime() - startOfDay.getTime()) / (endOfDay.getTime() - startOfDay.getTime())
      const progress = Math.max(0, Math.min(100, dayProgress * 100))

      return {
        ...tz,
        localTime,
        timeToMidnight,
        hoursToMidnight,
        minutesToMidnight: totalMinutesToMidnight,
        progress,
        status
      } as TimeZoneWithCalculations
    })

    // Group by GMT offset and create timezone groups
    const groups = new Map<number, TimeZoneGroup>()
    
    enhanced.forEach(tz => {
      const key = tz.gmtOffset
      if (!groups.has(key)) {
        const offsetHours = Math.round(tz.gmtOffset / 3600)
        const offsetDisplay = offsetHours >= 0 ? `UTC+${offsetHours}` : `UTC${offsetHours}`
        
        groups.set(key, {
          gmtOffset: tz.gmtOffset,
          gmtOffsetDisplay: offsetDisplay,
          zoneName: tz.zoneName.split('/')[0] || tz.zoneName,
          status: tz.status,
          timeToMidnight: tz.timeToMidnight,
          progress: tz.progress,
          countries: [],
          totalPopulation: 0,
          nextMidnight: new Date(tz.localTime.getTime() + (tz.minutesToMidnight * 60 * 1000))
        })
      }
      
      const group = groups.get(key)!
      group.countries.push(tz)
      
      // Update group status to the most urgent one (celebrating > upcoming > waiting)
      if (tz.status === 'celebrating' || 
          (tz.status === 'upcoming' && group.status === 'waiting')) {
        group.status = tz.status
        group.timeToMidnight = tz.timeToMidnight
        group.progress = tz.progress
      }
    })

    // Convert to array and sort by urgency: celebrating first, then upcoming, then waiting
    const sortedGroups = Array.from(groups.values()).sort((a, b) => {
      // Priority order: celebrating > upcoming > waiting
      const statusPriority = { celebrating: 0, upcoming: 1, waiting: 2 }
      const aPriority = statusPriority[a.status]
      const bPriority = statusPriority[b.status]
      
      if (aPriority !== bPriority) {
        return aPriority - bPriority
      }
      
      // Within same status, sort by time to midnight
      const aMinutes = a.countries[0]?.minutesToMidnight || 0
      const bMinutes = b.countries[0]?.minutesToMidnight || 0
      return aMinutes - bMinutes
    })

    return {
      timeZoneGroups: sortedGroups
    }
  }, [timezones])

  return { timeZoneGroups }
} 