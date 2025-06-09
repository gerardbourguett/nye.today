import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2, 
  Volume2, 
  VolumeX, 
  Maximize2,
  Globe,
  TrendingUp,
  Timer,
  Zap,
  Star
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface CountryStats {
  id: string
  country: string
  countryCode: string
  city: string
  timezone: string
  timeToMidnight: string
  hoursToMidnight: number
  population: number
  isLive: boolean
  status: 'celebrating' | 'upcoming' | 'waiting'
  progress: number
  viewers: number
  twitchChannel?: string
}

interface TwitchStream {
  channel: string
  title: string
  viewers: number
  isLive: boolean
  category: string
  language: string
}

const mockCountryStats: CountryStats[] = [
  {
    id: '1',
    country: 'New Zealand',
    countryCode: 'nz',
    city: 'Auckland',
    timezone: 'NZDT (UTC+13)',
    timeToMidnight: 'CELEBRATING NOW! 🎉',
    hoursToMidnight: 0,
    population: 5000000,
    isLive: true,
    status: 'celebrating',
    progress: 100,
    viewers: 45230,
    twitchChannel: 'nz_newyear_official'
  },
  {
    id: '2',
    country: 'Australia',
    countryCode: 'au',
    city: 'Sydney',
    timezone: 'AEDT (UTC+11)',
    timeToMidnight: '00:15:32',
    hoursToMidnight: 0.25,
    population: 25000000,
    isLive: true,
    status: 'celebrating',
    progress: 95,
    viewers: 128450,
    twitchChannel: 'sydney_harbour_live'
  },
  {
    id: '3',
    country: 'Japan',
    countryCode: 'jp',
    city: 'Tokyo',
    timezone: 'JST (UTC+9)',
    timeToMidnight: '01:45:12',
    hoursToMidnight: 1.75,
    population: 125000000,
    isLive: true,
    status: 'upcoming',
    progress: 85,
    viewers: 89320,
    twitchChannel: 'tokyo_countdown_2024'
  },
  {
    id: '4',
    country: 'United Kingdom',
    countryCode: 'gb',
    city: 'London',
    timezone: 'GMT (UTC+0)',
    timeToMidnight: '06:30:45',
    hoursToMidnight: 6.5,
    population: 67000000,
    isLive: false,
    status: 'waiting',
    progress: 45,
    viewers: 156780,
    twitchChannel: 'london_bigben_official'
  },
  {
    id: '5',
    country: 'United States',
    countryCode: 'us',
    city: 'New York',
    timezone: 'EST (UTC-5)',
    timeToMidnight: '11:45:20',
    hoursToMidnight: 11.75,
    population: 330000000,
    isLive: false,
    status: 'waiting',
    progress: 25,
    viewers: 234560,
    twitchChannel: 'timessquare_ballDrop'
  },
  {
    id: '6',
    country: 'Brazil',
    countryCode: 'br',
    city: 'Rio de Janeiro',
    timezone: 'BRT (UTC-3)',
    timeToMidnight: '14:20:15',
    hoursToMidnight: 14.33,
    population: 215000000,
    isLive: false,
    status: 'waiting',
    progress: 15,
    viewers: 98760,
    twitchChannel: 'copacabana_reveillon'
  }
]

const vanderfondiStream: TwitchStream = {
  channel: 'vanderfondi',
  title: 'New Year Celebrations Around the World! 🌍🎆',
  viewers: 2500,
  isLive: true,
  category: 'Just Chatting',
  language: 'English'
}

export default function Stream() {
  const statsRef = useRef<HTMLDivElement>(null)
  const [selectedCountry, setSelectedCountry] = useState<CountryStats>(mockCountryStats[0]!)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // GSAP Animations
    const tl = gsap.timeline()
    
    // Header animation
    tl.fromTo('.stream-header', 
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )

    // Player animation
    tl.fromTo('.twitch-player', 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    )

    // Statistics animation
    const statCards = statsRef.current?.querySelectorAll('.stat-card')
    if (statCards) {
      gsap.fromTo(statCards,
        { opacity: 0, y: 50, rotationX: -15 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }

    // Progress bar animation
    const progressBars = document.querySelectorAll('.progress-bar')
    progressBars.forEach((bar, index) => {
      const progress = mockCountryStats[index]?.progress || 0
      gsap.to(bar, {
        width: `${progress}%`,
        duration: 1.5,
        ease: "power2.out",
        delay: index * 0.1,
        scrollTrigger: {
          trigger: bar,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      })
    })

    return () => {
      lenisRef.current?.destroy()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const formatViewers = (viewers: number) => {
    if (viewers >= 1000000) return `${(viewers / 1000000).toFixed(1)}M`
    if (viewers >= 1000) return `${(viewers / 1000).toFixed(1)}K`
    return viewers.toString()
  }

  const formatPopulation = (population: number) => {
    if (population >= 1000000) return `${(population / 1000000).toFixed(0)}M`
    if (population >= 1000) return `${(population / 1000).toFixed(0)}K`
    return population.toString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'celebrating': return 'text-green-400 bg-green-500/20'
      case 'upcoming': return 'text-yellow-400 bg-yellow-500/20'
      case 'waiting': return 'text-blue-400 bg-blue-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'celebrating': return '🎉 Celebrating'
      case 'upcoming': return '⏰ Next'
      case 'waiting': return '⏳ Waiting'
      default: return '❓ Unknown'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="stream-header sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-sky-200/50 dark:border-sky-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-slate-500 rounded-xl flex items-center justify-center">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Global Stream</h1>
                <p className="text-sky-600 dark:text-sky-300">Live New Year celebrations</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sky-600 dark:text-sky-300">
                <Eye className="w-5 h-5" />
                <span className="font-semibold">
                  {formatViewers(mockCountryStats.reduce((acc, country) => acc + country.viewers, 0))} viewers
                </span>
              </div>
              <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">
                  {mockCountryStats.filter(c => c.isLive).length} live
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Stream Player */}
          <div className="xl:col-span-2">
            <div className="twitch-player bg-white/80 dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-sky-200/50 dark:border-sky-500/20 backdrop-blur-sm">
              {/* Stream Header */}
              <div className="p-4 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">V</span>
                    </div>
                    <div>
                      <h2 className="text-slate-800 dark:text-white font-bold text-lg">
                        vanderfondi
                      </h2>
                      <p className="text-sky-600 dark:text-sky-300 text-sm">{vanderfondiStream.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {vanderfondiStream.isLive && (
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          LIVE
                        </span>
                      </div>
                    )}
                    <div className="bg-black/50 text-white text-sm px-3 py-1 rounded flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{formatViewers(vanderfondiStream.viewers)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Twitch Embed */}
              <div className="relative aspect-video bg-gradient-to-br from-slate-100/50 to-sky-100/50 dark:from-slate-800/50 dark:to-slate-700/50">
                {/* Twitch Iframe Embed */}
                <iframe
                  src="https://player.twitch.tv/?channel=vanderfondi&parent=localhost&parent=127.0.0.1&parent=nye.live&autoplay=false&muted=true"
                  className="w-full h-full border-0"
                  allowFullScreen
                  title="vanderfondi Twitch Stream"
                ></iframe>
                
                {/* Overlay Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors pointer-events-auto"
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <div className="bg-black/50 text-white px-4 py-2 rounded-lg text-sm font-mono">
                      {selectedCountry.timeToMidnight}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors pointer-events-auto"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Stream Info */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-red-400 hover:text-red-300 cursor-pointer transition-colors" />
                      <span className="text-slate-800 dark:text-white text-sm">1.2K</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-5 h-5 text-sky-400 hover:text-sky-300 cursor-pointer transition-colors" />
                      <span className="text-slate-800 dark:text-white text-sm">Chat</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Share2 className="w-5 h-5 text-green-400 hover:text-green-300 cursor-pointer transition-colors" />
                      <span className="text-slate-800 dark:text-white text-sm">Share</span>
                    </div>
                  </div>
                  <div className="text-sky-600 dark:text-sky-300 text-sm">
                    Category: {vanderfondiStream.category} • {vanderfondiStream.language}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Sidebar */}
          <div className="xl:col-span-1">
            <div className="bg-white/80 dark:bg-slate-800/50 rounded-2xl border border-sky-200/50 dark:border-sky-500/20 overflow-hidden backdrop-blur-sm">
              <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                  <h3 className="text-slate-800 dark:text-white font-bold text-xl">Global Statistics</h3>
                </div>
                <p className="text-sky-600 dark:text-sky-300 text-sm">
                  Countries closest to New Year
                </p>
              </div>

              <div ref={statsRef} className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
                {mockCountryStats
                  .sort((a, b) => a.hoursToMidnight - b.hoursToMidnight)
                  .map((country, index) => (
                  <div
                    key={country.id}
                    className={`stat-card p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      selectedCountry.id === country.id
                        ? 'bg-sky-100 dark:bg-sky-600/20 border-sky-400/50'
                        : 'bg-slate-50 dark:bg-slate-700/30 border-slate-200 dark:border-slate-600/30 hover:border-sky-400/50 dark:hover:border-sky-500/30'
                    }`}
                    onClick={() => setSelectedCountry(country)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={`/src/assets/flags/4x3/${country.countryCode}.svg`}
                            alt={country.country}
                            className="w-8 h-6 rounded shadow-lg"
                          />
                          {index === 0 && (
                            <Star className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 fill-current" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-slate-800 dark:text-white font-semibold text-sm">
                            {country.city}
                          </h4>
                          <p className="text-slate-500 dark:text-slate-400 text-xs">{country.country}</p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(country.status)}`}>
                        {getStatusText(country.status)}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                          <Timer className="w-4 h-4" />
                          <span>{country.timeToMidnight}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sky-600 dark:text-sky-300">
                          <Eye className="w-4 h-4" />
                          <span>{formatViewers(country.viewers)}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>{country.timezone}</span>
                        <span>{formatPopulation(country.population)} people</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-200/50 dark:bg-slate-600/50 rounded-full h-2 overflow-hidden">
                        <div 
                          className="progress-bar h-full bg-gradient-to-r from-sky-500 to-slate-500 rounded-full transition-all duration-300"
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
