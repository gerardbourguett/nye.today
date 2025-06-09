import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { Clock, Users, Eye, Heart, MessageCircle, Share2, Volume2, VolumeX, Maximize2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface StreamData {
  id: string
  country: string
  countryCode: string
  city: string
  timezone: string
  viewers: number
  isLive: boolean
  timeToMidnight: string
  streamTitle: string
  thumbnail: string
  chatMessages: ChatMessage[]
}

interface ChatMessage {
  id: string
  username: string
  message: string
  timestamp: string
  country: string
}

const mockStreams: StreamData[] = [
  {
    id: '1',
    country: 'New Zealand',
    countryCode: 'nz',
    city: 'Auckland',
    timezone: 'NZDT',
    viewers: 45230,
    isLive: true,
    timeToMidnight: '00:00:00',
    streamTitle: '🎆 HAPPY NEW YEAR FROM AUCKLAND! 🎆',
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop',
    chatMessages: [
      { id: '1', username: 'KiwiLover', message: 'HAPPY NEW YEAR! 🎉', timestamp: '23:59', country: 'nz' },
      { id: '2', username: 'Auckland2024', message: 'The fireworks are incredible!', timestamp: '00:01', country: 'nz' },
      { id: '3', username: 'NewYear_Fan', message: 'What a beautiful show! 🎆', timestamp: '00:02', country: 'nz' }
    ]
  },
  {
    id: '2',
    country: 'Australia',
    countryCode: 'au',
    city: 'Sydney',
    timezone: 'AEDT',
    viewers: 128450,
    isLive: true,
    timeToMidnight: '00:15:32',
    streamTitle: 'Sydney Harbour Bridge - Countdown to 2024! 🌉',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop',
    chatMessages: [
      { id: '4', username: 'SydneyVibes', message: 'The Opera House looks spectacular!', timestamp: '23:45', country: 'au' },
      { id: '5', username: 'AussieNY', message: 'Waiting for the fireworks 🎆', timestamp: '23:46', country: 'au' },
      { id: '6', username: 'HarbourView', message: 'Millions of people here!', timestamp: '23:47', country: 'au' }
    ]
  },
  {
    id: '3',
    country: 'Japan',
    countryCode: 'jp',
    city: 'Tokyo',
    timezone: 'JST',
    viewers: 89320,
    isLive: true,
    timeToMidnight: '01:45:12',
    streamTitle: 'Tokyo Skytree - Japanese New Year 🗼',
    thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=225&fit=crop',
    chatMessages: [
      { id: '7', username: 'TokyoDrift', message: 'あけましておめでとう！', timestamp: '23:30', country: 'jp' },
      { id: '8', username: 'SakuraFan', message: 'Tokyo Skytree looks beautiful', timestamp: '23:31', country: 'jp' },
      { id: '9', username: 'NipponNY', message: 'Ancient traditions! 🎌', timestamp: '23:32', country: 'jp' }
    ]
  },
  {
    id: '4',
    country: 'United Kingdom',
    countryCode: 'gb',
    city: 'London',
    timezone: 'GMT',
    viewers: 156780,
    isLive: false,
    timeToMidnight: '06:30:45',
    streamTitle: 'Big Ben & London Eye - New Year Celebration 🇬🇧',
    thumbnail: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=225&fit=crop',
    chatMessages: [
      { id: '10', username: 'LondonCalling', message: 'Waiting for Big Ben!', timestamp: '18:00', country: 'gb' },
      { id: '11', username: 'BritishVibes', message: 'Thames looks incredible', timestamp: '18:01', country: 'gb' },
      { id: '12', username: 'QueensFan', message: 'God save the King! 👑', timestamp: '18:02', country: 'gb' }
    ]
  },
  {
    id: '5',
    country: 'United States',
    countryCode: 'us',
    city: 'New York',
    timezone: 'EST',
    viewers: 234560,
    isLive: false,
    timeToMidnight: '11:45:20',
    streamTitle: 'Times Square Ball Drop 2024! 🗽',
    thumbnail: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=225&fit=crop',
    chatMessages: [
      { id: '13', username: 'NYCNative', message: 'Times Square is packed!', timestamp: '12:00', country: 'us' },
      { id: '14', username: 'BigApple', message: 'The ball is dropping soon! 🎊', timestamp: '12:01', country: 'us' },
      { id: '15', username: 'Broadway2024', message: 'NYC never sleeps!', timestamp: '12:02', country: 'us' }
    ]
  },
  {
    id: '6',
    country: 'Brazil',
    countryCode: 'br',
    city: 'Rio de Janeiro',
    timezone: 'BRT',
    viewers: 98760,
    isLive: false,
    timeToMidnight: '14:20:15',
    streamTitle: 'Copacabana Beach - Reveillon 2024! 🏖️',
    thumbnail: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=225&fit=crop',
    chatMessages: [
      { id: '16', username: 'CariocaVibes', message: 'Copacabana looks beautiful!', timestamp: '09:30', country: 'br' },
      { id: '17', username: 'RioFan', message: 'Waiting for the show! 🎵', timestamp: '09:31', country: 'br' },
      { id: '18', username: 'BeachParty', message: 'Millions on the beach! 🌊', timestamp: '09:32', country: 'br' }
    ]
  }
]

export default function Carousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedStream, setSelectedStream] = useState<StreamData | null>(null)
  const [isMuted, setIsMuted] = useState(true)
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
    const streams = containerRef.current?.querySelectorAll('.stream-card')
    if (streams) {
      gsap.fromTo(streams, 
        { 
          opacity: 0, 
          y: 100,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }

    // Pulse animation for live indicators
    const liveIndicators = containerRef.current?.querySelectorAll('.live-indicator')
    if (liveIndicators) {
      gsap.to(liveIndicators, {
        scale: 1.2,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      })
    }

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

  const openStreamModal = (stream: StreamData) => {
    setSelectedStream(stream)
    document.body.style.overflow = 'hidden'
  }

  const closeStreamModal = () => {
    setSelectedStream(null)
    document.body.style.overflow = 'auto'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-sky-200/50 dark:border-sky-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-slate-500 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Global New Year</h1>
                <p className="text-sky-600 dark:text-sky-300">Live celebrations around the world</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sky-600 dark:text-sky-300">
              <Users className="w-5 h-5" />
              <span className="font-semibold">
                {formatViewers(mockStreams.reduce((acc, stream) => acc + stream.viewers, 0))} viewers
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Streams Grid */}
      <div ref={containerRef} className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockStreams.map((stream) => (
            <div
              key={stream.id}
              className="stream-card group cursor-pointer"
              onClick={() => openStreamModal(stream)}
            >
              <div className="relative bg-white/80 dark:bg-slate-800/50 rounded-xl overflow-hidden border border-sky-200/50 dark:border-sky-500/20 hover:border-sky-400/60 dark:hover:border-sky-400/40 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={stream.thumbnail}
                    alt={`${stream.city}, ${stream.country}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Live Indicator */}
                  {stream.isLive && (
                    <div className="absolute top-3 left-3 flex items-center space-x-2">
                      <div className="live-indicator w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        LIVE
                      </span>
                    </div>
                  )}

                  {/* Viewers */}
                  <div className="absolute top-3 right-3 bg-black/70 text-white text-sm px-2 py-1 rounded flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{formatViewers(stream.viewers)}</span>
                  </div>

                  {/* Country Flag */}
                  <div className="absolute bottom-3 left-3">
                    <img
                      src={`/src/assets/flags/4x3/${stream.countryCode}.svg`}
                      alt={stream.country}
                      className="w-8 h-6 rounded shadow-lg"
                    />
                  </div>

                  {/* Time to Midnight */}
                  <div className="absolute bottom-3 right-3 bg-sky-600/90 text-white text-sm font-mono px-2 py-1 rounded">
                    {stream.timeToMidnight}
                  </div>
                </div>

                {/* Stream Info */}
                <div className="p-4">
                  <h3 className="text-slate-800 dark:text-white font-semibold text-lg mb-2 line-clamp-2">
                    {stream.streamTitle}
                  </h3>
                  <div className="flex items-center justify-between text-sky-600 dark:text-sky-300 text-sm">
                    <div>
                      <p className="font-medium">{stream.city}, {stream.country}</p>
                      <p className="text-xs opacity-75">{stream.timezone}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Heart className="w-4 h-4 hover:text-red-400 transition-colors" />
                      <MessageCircle className="w-4 h-4 hover:text-sky-400 transition-colors" />
                      <Share2 className="w-4 h-4 hover:text-green-400 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stream Modal */}
      {selectedStream && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex flex-col lg:flex-row h-full">
              {/* Video Player */}
              <div className="flex-1 relative">
                <img
                  src={selectedStream.thumbnail}
                  alt={selectedStream.city}
                  className="w-full h-64 lg:h-full object-cover"
                />
                
                {/* Player Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <div className="bg-black/50 text-white px-3 py-1 rounded text-sm">
                      {selectedStream.timeToMidnight}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                      <Maximize2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={closeStreamModal}
                      className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat Sidebar */}
              <div className="w-full lg:w-80 bg-slate-100 dark:bg-slate-700 flex flex-col">
                <div className="p-4 border-b border-slate-200 dark:border-slate-600">
                  <h3 className="text-slate-800 dark:text-white font-semibold flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>Live Chat</span>
                  </h3>
                  <p className="text-sky-600 dark:text-sky-300 text-sm">
                    {formatViewers(selectedStream.viewers)} viewers
                  </p>
                </div>
                
                <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                  {selectedStream.chatMessages.map((message) => (
                    <div key={message.id} className="flex items-start space-x-2">
                      <img
                        src={`/src/assets/flags/4x3/${message.country}.svg`}
                        alt=""
                        className="w-4 h-3 rounded mt-1 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-sky-600 dark:text-sky-400 font-medium text-sm">
                            {message.username}
                          </span>
                          <span className="text-slate-500 text-xs">
                            {message.timestamp}
                          </span>
                        </div>
                        <p className="text-slate-800 dark:text-white text-sm break-words">
                          {message.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-slate-200 dark:border-slate-600">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 bg-white dark:bg-slate-600 text-slate-800 dark:text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 border border-slate-200 dark:border-transparent"
                    />
                    <button className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
