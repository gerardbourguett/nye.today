
import { MapPin, Globe, Clock, Compass } from 'lucide-react'

export default function Map() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-slate-500 rounded-xl flex items-center justify-center">
              <Globe className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Global Map</h1>
          <p className="text-sky-600 dark:text-sky-300 text-lg">Interactive world map showing New Year celebrations</p>
        </div>

        {/* Coming Soon Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-sky-200/50 dark:border-sky-500/20 p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-sky-400/20 to-slate-400/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <MapPin className="w-12 h-12 text-sky-600 dark:text-sky-400" />
            </div>
            
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Coming Soon</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              We're working on an interactive world map that will show real-time New Year celebrations across all time zones. 
              Track the wave of midnight as it travels around the globe!
            </p>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-slate-50/50 dark:bg-slate-700/30 rounded-xl p-6 border border-slate-200/50 dark:border-slate-600/30">
                <Clock className="w-8 h-8 text-sky-600 dark:text-sky-400 mx-auto mb-4" />
                <h3 className="text-slate-800 dark:text-white font-semibold mb-2">Real-time Updates</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Live countdown timers for each time zone showing exact time to midnight
                </p>
              </div>

              <div className="bg-slate-50/50 dark:bg-slate-700/30 rounded-xl p-6 border border-slate-200/50 dark:border-slate-600/30">
                <Globe className="w-8 h-8 text-sky-600 dark:text-sky-400 mx-auto mb-4" />
                <h3 className="text-slate-800 dark:text-white font-semibold mb-2">Interactive Globe</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  3D interactive globe with zoom, rotation, and detailed country information
                </p>
              </div>

              <div className="bg-slate-50/50 dark:bg-slate-700/30 rounded-xl p-6 border border-slate-200/50 dark:border-slate-600/30">
                <Compass className="w-8 h-8 text-sky-600 dark:text-sky-400 mx-auto mb-4" />
                <h3 className="text-slate-800 dark:text-white font-semibold mb-2">Time Zone Explorer</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Click on any country to see local celebrations and cultural traditions
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 p-6 bg-gradient-to-r from-sky-50/80 to-slate-50/80 dark:from-sky-900/30 dark:to-slate-800/30 rounded-xl border border-sky-200/50 dark:border-sky-500/30">
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                In the meantime, explore our other sections:
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a 
                  href="/road-to-2026" 
                  className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium"
                >
                  Road to 2026
                </a>
                <a 
                  href="/watch-carousel" 
                  className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
                >
                  Watch Celebrations
                </a>
                <a 
                  href="/watch-stream" 
                  className="px-6 py-3 bg-gradient-to-r from-sky-600 to-slate-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Live Streams
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements for visual interest */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-sky-400/20 dark:bg-sky-400/30 rounded-full animate-pulse"
              style={{
                left: `${10 + i * 12}%`,
                top: `${15 + (i % 4) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
