import supabase from '@/utils/supabase'
import React, { useEffect, useState, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { ChevronLeft, ChevronRight, X, Clock, MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export interface TimeZoneReduced {
  id: number
  countryCode: string
  countryName: string
  zoneName: string
  gmtOffset: number
  timestamp: number
}

interface TimeZoneWithCalculations extends TimeZoneReduced {
  localTime: Date
  timeToMidnight: string
  hoursToMidnight: number
  minutesToMidnight: number
  progress: number
  status: 'celebrating' | 'upcoming' | 'waiting'
}

interface TimeZoneGroup {
  gmtOffset: number
  gmtOffsetDisplay: string
  zoneName: string
  status: 'celebrating' | 'upcoming' | 'waiting'
  timeToMidnight: string
  progress: number
  countries: TimeZoneWithCalculations[]
  totalPopulation: number
  nextMidnight: Date
}

export default function RoadTo2026() {
  const [timezones, setTimezones] = useState<TimeZoneReduced[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeZone, setSelectedTimeZone] = useState<TimeZoneGroup | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const celebratingScrollRef = useRef<HTMLDivElement>(null);
  const waitingScrollRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Calculate enhanced timezone data and group by timezone
  const { timeZoneGroups } = useMemo(() => {
    const now = new Date();
    const currentUTC = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
    
    const enhanced = timezones.map(tz => {
      const localTime = new Date(currentUTC.getTime() + (tz.gmtOffset * 1000));
      const localNow = new Date(localTime);
      const midnight = new Date(localNow);
      midnight.setDate(midnight.getDate() + 1);
      midnight.setHours(0, 0, 0, 0);
      
      const diffMs = midnight.getTime() - localNow.getTime();
      const totalMinutesToMidnight = Math.floor(diffMs / (1000 * 60));
      const hoursToMidnight = Math.floor(totalMinutesToMidnight / 60);
      const minutesToMidnight = totalMinutesToMidnight % 60;
      
      let timeToMidnight: string;
      let status: 'celebrating' | 'upcoming' | 'waiting';
      
      if (hoursToMidnight === 0 && minutesToMidnight <= 5) {
        timeToMidnight = '🎉 CELEBRATING NOW!';
        status = 'celebrating';
      } else if (hoursToMidnight < 1) {
        timeToMidnight = `${minutesToMidnight}m to midnight`;
        status = 'upcoming';
      } else if (hoursToMidnight < 24) {
        timeToMidnight = `${hoursToMidnight}h ${minutesToMidnight}m`;
        status = 'upcoming';
      } else {
        const days = Math.floor(hoursToMidnight / 24);
        const remainingHours = hoursToMidnight % 24;
        timeToMidnight = `${days}d ${remainingHours}h`;
        status = 'waiting';
      }
      
      const startOfDay = new Date(localNow);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(startOfDay);
      endOfDay.setDate(endOfDay.getDate() + 1);
      
      const dayProgress = (localNow.getTime() - startOfDay.getTime()) / (endOfDay.getTime() - startOfDay.getTime());
      const progress = Math.max(0, Math.min(100, dayProgress * 100));

      return {
        ...tz,
        localTime,
        timeToMidnight,
        hoursToMidnight,
        minutesToMidnight: totalMinutesToMidnight,
        progress,
        status
      } as TimeZoneWithCalculations;
    });

    // Group by GMT offset and create timezone groups
    const groups = new Map<number, TimeZoneGroup>();
    
    enhanced.forEach(tz => {
      const key = tz.gmtOffset;
      if (!groups.has(key)) {
        const offsetHours = Math.round(tz.gmtOffset / 3600);
        const offsetDisplay = offsetHours >= 0 ? `UTC+${offsetHours}` : `UTC${offsetHours}`;
        
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
        });
      }
      
      const group = groups.get(key)!;
      group.countries.push(tz);
      
      // Update group status to the most urgent one
      if (tz.status === 'celebrating' || 
          (tz.status === 'upcoming' && group.status === 'waiting')) {
        group.status = tz.status;
        group.timeToMidnight = tz.timeToMidnight;
        group.progress = tz.progress;
      }
    });

    // Convert to array and sort by time to midnight
    const sortedGroups = Array.from(groups.values()).sort((a, b) => {
      const aMinutes = a.countries[0]?.minutesToMidnight || 0;
      const bMinutes = b.countries[0]?.minutesToMidnight || 0;
      return aMinutes - bMinutes;
    });

    return {
      timeZoneGroups: sortedGroups
    };
  }, [timezones]);

  // Handle modal open/close
  const openModal = (timeZoneGroup: TimeZoneGroup) => {
    setSelectedTimeZone(timeZoneGroup);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTimeZone(null);
    document.body.style.overflow = 'unset'; // Restore scroll
  };

  // Modal animations
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      gsap.fromTo(modalRef.current, 
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" }
      );
    }
  }, [isModalOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (!loading && timeZoneGroups.length > 0) {
      // GSAP Animations
      const tl = gsap.timeline();

      // Header animation
      tl.fromTo('.page-header', 
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Stats animation
      tl.fromTo('.stats-summary', 
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );

      // Timezone cards animation
      const timezoneCards = document.querySelectorAll('.timezone-card');
      if (timezoneCards.length > 0) {
        gsap.fromTo(timezoneCards,
          { opacity: 0, x: 100, rotationY: -15 },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: '.timezone-groups-container',
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Progress bars animation
      const progressBars = document.querySelectorAll('.progress-bar');
      progressBars.forEach((bar, index) => {
        const progress = timeZoneGroups[index]?.progress || 0;
        gsap.to(bar, {
          width: `${progress}%`,
          duration: 1.5,
          ease: "power2.out",
          delay: index * 0.05,
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Floating elements animation
      gsap.to('.floating-element', {
        y: "-=20",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.5
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [loading, timeZoneGroups]);

  useEffect(() => {
    async function getTimeZoneReduced() {
      try {
        setLoading(true);
        setError(null);
        
        const { data: timezones, error: supabaseError } = await supabase
          .from('time_zone_reduced')
          .select('*');
        
        if (supabaseError) {
          console.error('Supabase error:', supabaseError);
          setError(supabaseError.message);
          return;
        }
        
        if (timezones) {
          setTimezones(timezones as TimeZoneReduced[]);
          console.log('Successfully loaded timezones:', timezones.length);
        }
      } catch (err) {
        console.error('Error fetching timezones:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    getTimeZoneReduced();
    
    // Update every minute to keep times accurate
    const interval = setInterval(getTimeZoneReduced, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollContainer = (direction: 'left' | 'right', containerRef: React.RefObject<HTMLDivElement | null>) => {
    if (containerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left' 
        ? containerRef.current.scrollLeft - scrollAmount
        : containerRef.current.scrollLeft + scrollAmount;
      
      gsap.to(containerRef.current, {
        scrollLeft: newScrollLeft,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'celebrating': return 'text-green-400 bg-green-500/20 border-green-500/30 dark:text-green-400 dark:bg-green-500/20 dark:border-green-500/30';
      case 'upcoming': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30 dark:text-yellow-400 dark:bg-yellow-500/20 dark:border-yellow-500/30';
      case 'waiting': return 'text-sky-400 bg-sky-500/20 border-sky-500/30 dark:text-sky-400 dark:bg-sky-500/20 dark:border-sky-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30 dark:text-slate-400 dark:bg-slate-500/20 dark:border-slate-500/30';
    }
  };

  const formatLocalTime = (localTime: Date) => {
    return localTime.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-800 dark:text-white text-lg">Loading timezones...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center bg-red-500/10 border border-red-500/20 rounded-xl p-8 max-w-md">
          <h2 className="text-red-600 dark:text-red-400 text-xl font-bold mb-4">Connection Error</h2>
          <p className="text-red-500 dark:text-red-300 mb-4">{error}</p>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Please check your Supabase configuration and internet connection.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const celebratingAndUpcoming = timeZoneGroups.filter(group => 
    group.status === 'celebrating' || group.status === 'upcoming'
  );
  
  const waitingGroups = timeZoneGroups.filter(group => 
    group.status === 'waiting'
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`floating-element absolute w-2 h-2 bg-sky-400/20 dark:bg-sky-400/30 rounded-full`}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        <div className="page-header text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Road To 2026</h1>
          <p className="text-sky-600 dark:text-sky-300">Time zones ordered by proximity to New Year midnight</p>
          <div className="stats-summary mt-4 inline-flex items-center gap-6 px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-sky-200/50 dark:border-sky-500/20">
            <span className="text-green-600 dark:text-green-400 font-semibold">
              {celebratingAndUpcoming.filter(g => g.status === 'celebrating').length} celebrating
            </span>
            <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
              {celebratingAndUpcoming.filter(g => g.status === 'upcoming').length} upcoming
            </span>
            <span className="text-sky-600 dark:text-sky-400 font-semibold">
              {waitingGroups.length} waiting
            </span>
          </div>
        </div>

        <div className="timezone-groups-container space-y-12">
          {/* Celebrating & Upcoming Time Zones */}
          {celebratingAndUpcoming.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">🎉 Celebrating & Upcoming</h2>
                  <p className="text-sky-600 dark:text-sky-300 text-sm">Time zones celebrating now or within 24 hours</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => scrollContainer('left', celebratingScrollRef)}
                    className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 border border-sky-200/50 dark:border-sky-500/20 hover:border-sky-400/60 dark:hover:border-sky-400/50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  </button>
                  <button
                    onClick={() => scrollContainer('right', celebratingScrollRef)}
                    className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 border border-sky-200/50 dark:border-sky-500/20 hover:border-sky-400/60 dark:hover:border-sky-400/50 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  </button>
                </div>
              </div>
              
              <div 
                ref={celebratingScrollRef}
                className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide"
                style={{ scrollBehavior: 'smooth' }}
              >
                {celebratingAndUpcoming.map((group, index) => (
                  <div 
                    key={`${group.gmtOffset}-celebrating`}
                    className="timezone-card flex-shrink-0 w-80 bg-gradient-to-r from-white/90 to-sky-50/90 dark:from-slate-800/70 dark:to-slate-700/70 rounded-2xl p-6 border border-sky-200/50 dark:border-sky-500/30 hover:border-sky-400/60 dark:hover:border-sky-400/50 transition-all duration-300 backdrop-blur-sm cursor-pointer hover:scale-105"
                    onClick={() => openModal(group)}
                  >
                    {/* Glow effect for celebrating zones */}
                    {group.status === 'celebrating' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl"></div>
                    )}
                    
                    <div className="relative z-10">
                      {/* Timezone Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                            group.status === 'celebrating' 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                              : 'bg-gradient-to-r from-sky-500 to-sky-600 text-white'
                          }`}>
                            #{index + 1}
                          </div>
                          <div>
                            <h3 className="text-slate-800 dark:text-white font-bold text-xl">{group.gmtOffsetDisplay}</h3>
                            <p className="text-sky-600 dark:text-sky-300 text-sm">{group.zoneName}</p>
                          </div>
                        </div>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(group.status)}`}>
                          {group.status === 'celebrating' && '🎉 Celebrating'}
                          {group.status === 'upcoming' && '⏰ Upcoming'}
                        </div>
                      </div>

                      {/* Time Info */}
                      <div className="mb-4">
                        <div className="text-center">
                          <div className={`font-bold text-lg ${
                            group.status === 'celebrating' ? 'text-green-600 dark:text-green-400' : 'text-sky-600 dark:text-sky-400'
                          }`}>
                            {group.timeToMidnight}
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                          <span>Progress to midnight</span>
                          <span>{Math.round(group.progress)}%</span>
                        </div>
                        <div className="w-full bg-slate-200/50 dark:bg-slate-600/50 rounded-full h-3 overflow-hidden">
                          <div 
                            className={`progress-bar h-full rounded-full transition-all duration-1000 ${
                              group.status === 'celebrating' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                              'bg-gradient-to-r from-sky-500 to-sky-600'
                            }`}
                            style={{ width: '0%' }}
                          ></div>
                        </div>
                      </div>

                      {/* Countries in this timezone */}
                      <div className="space-y-2">
                        <h4 className="text-slate-700 dark:text-slate-300 font-medium text-sm">Countries in this timezone:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {group.countries.slice(0, 4).map((country) => (
                            <div key={country.id} className="flex items-center space-x-2 text-sm">
                              <img
                                src={`/src/assets/flags/4x3/${country.countryCode.toLowerCase()}.svg`}
                                alt={country.countryName}
                                className="w-4 h-3 rounded shadow-sm"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                              <span className="text-slate-600 dark:text-slate-400 text-xs truncate">
                                {country.countryName}
                              </span>
                            </div>
                          ))}
                          {group.countries.length > 4 && (
                            <div className="text-xs text-slate-500 dark:text-slate-500 col-span-2 flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>+{group.countries.length - 4} more (click to see all)</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Waiting Time Zones */}
          {waitingGroups.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">⏳ Waiting Time Zones</h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Time zones waiting more than 24 hours</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => scrollContainer('left', waitingScrollRef)}
                    className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 border border-sky-200/50 dark:border-sky-500/20 hover:border-sky-400/60 dark:hover:border-sky-400/50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  </button>
                  <button
                    onClick={() => scrollContainer('right', waitingScrollRef)}
                    className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 border border-sky-200/50 dark:border-sky-500/20 hover:border-sky-400/60 dark:hover:border-sky-400/50 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  </button>
                </div>
              </div>
              
              <div 
                ref={waitingScrollRef}
                className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
                style={{ scrollBehavior: 'smooth' }}
              >
                {waitingGroups.map((group) => (
                  <div 
                    key={`${group.gmtOffset}-waiting`}
                    className="timezone-card flex-shrink-0 w-64 bg-white/80 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200/50 dark:border-slate-600/30 hover:border-sky-400/50 dark:hover:border-sky-500/30 transition-all duration-300 backdrop-blur-sm cursor-pointer hover:scale-105"
                    onClick={() => openModal(group)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-slate-800 dark:text-white font-semibold text-lg">{group.gmtOffsetDisplay}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{group.zoneName}</p>
                      </div>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(group.status)}`}>
                        ⏳ Waiting
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="text-center">
                        <div className="text-sky-600 dark:text-sky-400 font-medium">
                          {group.timeToMidnight}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                          <span>Progress</span>
                          <span>{Math.round(group.progress)}%</span>
                        </div>
                        <div className="w-full bg-slate-200/50 dark:bg-slate-600/50 rounded-full h-2 overflow-hidden">
                          <div 
                            className="progress-bar h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-sky-500 to-slate-500"
                            style={{ width: '0%' }}
                          ></div>
                        </div>
                      </div>

                      {/* Countries sample */}
                      <div className="space-y-1">
                        {group.countries.slice(0, 3).map((country) => (
                          <div key={country.id} className="flex items-center space-x-2">
                            <img
                              src={`/src/assets/flags/4x3/${country.countryCode.toLowerCase()}.svg`}
                              alt={country.countryName}
                              className="w-3 h-2 rounded shadow-sm"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                            <span className="text-slate-600 dark:text-slate-400 text-xs truncate">
                              {country.countryName}
                            </span>
                          </div>
                        ))}
                        {group.countries.length > 3 && (
                          <div className="text-xs text-slate-500 dark:text-slate-500 flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>+{group.countries.length - 3} more (click to see all)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedTimeZone && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            ref={modalRef}
            className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden border border-sky-200/50 dark:border-sky-500/20"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200/50 dark:border-slate-600/50">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                  selectedTimeZone.status === 'celebrating' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                    : selectedTimeZone.status === 'upcoming'
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white'
                    : 'bg-gradient-to-r from-sky-500 to-sky-600 text-white'
                }`}>
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{selectedTimeZone.gmtOffsetDisplay}</h2>
                  <p className="text-sky-600 dark:text-sky-300">{selectedTimeZone.zoneName} • {selectedTimeZone.timeToMidnight}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <X className="w-6 h-6 text-slate-600 dark:text-slate-300" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="mb-4">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(selectedTimeZone.status)}`}>
                  {selectedTimeZone.status === 'celebrating' && '🎉 Celebrating Now'}
                  {selectedTimeZone.status === 'upcoming' && '⏰ Upcoming'}
                  {selectedTimeZone.status === 'waiting' && '⏳ Waiting'}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                Countries and territories in this time zone ({selectedTimeZone.countries.length} total):
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedTimeZone.countries.map((country) => (
                  <div 
                    key={country.id}
                    className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-4 border border-slate-200/50 dark:border-slate-600/30 hover:border-sky-400/50 dark:hover:border-sky-500/30 transition-colors"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src={`/src/assets/flags/4x3/${country.countryCode.toLowerCase()}.svg`}
                        alt={country.countryName}
                        className="w-8 h-6 rounded shadow-md"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div>
                        <h4 className="font-semibold text-slate-800 dark:text-white">{country.countryName}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{country.zoneName}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Local time:</span>
                        <span className="text-sky-600 dark:text-sky-400 font-mono">
                          {formatLocalTime(country.localTime)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">To midnight:</span>
                        <span className="text-sky-600 dark:text-sky-400 font-medium">
                          {country.timeToMidnight}
                        </span>
                      </div>
                      
                      {/* Individual progress bar */}
                      <div className="mt-2">
                        <div className="w-full bg-slate-200/50 dark:bg-slate-600/50 rounded-full h-1.5">
                          <div 
                            className={`h-full rounded-full ${
                              country.status === 'celebrating' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                              country.status === 'upcoming' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                              'bg-gradient-to-r from-sky-500 to-slate-500'
                            }`}
                            style={{ width: `${country.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-200/50 dark:border-slate-600/50 bg-slate-50/50 dark:bg-slate-700/50">
              <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                Click anywhere outside this modal or press <kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-600 rounded">Esc</kbd> to close
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}