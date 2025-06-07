import { useState } from "react";
import { motion } from "motion/react";
import TimeProgress from "./components/time-progress";
import TimeStats from "./components/time-stats";
import MaritimeEffects from "./components/maritime-effects";
import CelebrationEffects from "./components/celebration-effects";
import CursorEffects from "./components/cursor-effects";
import SpecialDateBanner from "./components/special-date-banner";
import Footer from "./components/footer";
import Navbar from "./components/navbar";

function App() {
  const [progress, setProgress] = useState(0);
  const CURRENT_YEAR = new Date().getFullYear();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Special Date Banner */}
      <SpecialDateBanner />

      {/* Cursor Effects */}
      <CursorEffects />

      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(14,165,233,0.1), rgba(59,130,246,0.1), rgba(147,51,234,0.1))",
            "linear-gradient(45deg, rgba(59,130,246,0.1), rgba(147,51,234,0.1), rgba(14,165,233,0.1))",
            "linear-gradient(45deg, rgba(147,51,234,0.1), rgba(14,165,233,0.1), rgba(59,130,246,0.1))",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Base background */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm -z-5" />

      {/* Maritime effects */}
      <MaritimeEffects />

      {/* Celebration effects */}
      <CelebrationEffects progress={progress} />

      <div className="w-full max-w-none mx-auto space-y-8 sm:space-y-10 lg:space-y-12 p-3 sm:p-4 lg:p-6 xl:p-8 relative z-10">
        <motion.header
          className="text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-7xl sm:text-8xl font-medium flex items-center justify-center gap-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span
              className="font-medium relative"
              animate={{
                textShadow: [
                  "0 0 10px rgba(59,130,246,0.3)",
                  "0 0 20px rgba(59,130,246,0.5)",
                  "0 0 10px rgba(59,130,246,0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              #{CURRENT_YEAR + 1}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.span>
            <motion.span
              className="text-sky-500 font-medium relative"
              animate={{
                textShadow: [
                  "0 0 15px rgba(14,165,233,0.4)",
                  "0 0 25px rgba(14,165,233,0.6)",
                  "0 0 15px rgba(14,165,233,0.4)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              Live
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-sky-500/20 to-cyan-500/20 rounded-lg blur-xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </motion.span>
          </motion.h1>

          {/* Subtitle with gradient text */}
          <motion.p
            className="mt-4 text-lg bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Navigate through the year with our Spanish galleon
          </motion.p>
        </motion.header>

        <TimeProgress onProgressChange={setProgress} />

        {/* Responsive layout: one column on mobile, two columns on desktop */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 items-start">
          <div className="xl:order-1">
            <TimeStats />
          </div>

          {/* Space for additional content or extended information */}
          <motion.div
            className="xl:order-2 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Extended maritime information panel */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50/80 to-blue-50/80 dark:from-slate-950/80 dark:to-blue-950/80 backdrop-blur-sm border border-slate-200/30 dark:border-slate-800/30">
              <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                🧭 Captain's Log
              </h3>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  📍 <strong>Current Position:</strong> Atlantic Ocean, heading
                  northeast
                </p>
                <p>
                  🌤️ <strong>Weather:</strong> Fair winds and following seas
                </p>
                <p>
                  ⛵ <strong>Sail Status:</strong> Full canvas deployed
                </p>
                <p>
                  👥 <strong>Crew Morale:</strong> High spirits aboard
                </p>
                <p>
                  🎯 <strong>Mission:</strong> Safe passage to Port 2026
                </p>
              </div>
            </div>

            {/* Mapa de progreso visual */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-blue-950/80 dark:to-purple-950/80 backdrop-blur-sm border border-blue-200/30 dark:border-blue-800/30">
              <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                🗺️ Navigation Chart
              </h3>
              <div className="relative h-32 bg-gradient-to-r from-blue-200 to-blue-300 dark:from-blue-800 dark:to-blue-700 rounded-lg overflow-hidden">
                {/* Ruta del barco */}
                <motion.div
                  className="absolute top-1/2 h-1 bg-yellow-400"
                  style={{
                    width: `${Math.min(progress, 95)}%`,
                    transform: "translateY(-50%)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 95)}%` }}
                  transition={{ duration: 1 }}
                />
                {/* Puertos */}
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="absolute left-2 bottom-1 text-xs text-gray-600 dark:text-gray-300">
                  2025
                </div>
                <div className="absolute right-2 bottom-1 text-xs text-gray-600 dark:text-gray-300">
                  2026
                </div>

                {/* Barco */}
                <motion.div
                  className="absolute top-1/2 transform -translate-y-1/2 text-lg"
                  style={{ left: `${Math.min(progress, 92)}%` }}
                  animate={{
                    y: [0, -2, 0],
                    rotate: [0, 1, -1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ⛵
                </motion.div>
              </div>
            </div>

            {/* Additional statistics */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-950/80 dark:to-pink-950/80 backdrop-blur-sm border border-purple-200/30 dark:border-purple-800/30">
              <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                📊 Voyage Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {Math.round(
                      (Date.now() - new Date("2025-01-01").getTime()) /
                        (1000 * 60 * 60)
                    )}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Hours at Sea
                  </div>
                </div>
                <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">
                    {Math.round(progress * 24)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Nautical Miles
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default App;
