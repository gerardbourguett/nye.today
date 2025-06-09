import {
  useEffect,
  useState,
  useRef, // Import useRef
} from "react";
import { cn } from "@/lib/utils";
import { motion, useSpring } from "motion/react";
import NumberFlow, { continuous } from "@number-flow/react";
import ShareButtons from "./share-buttons";
import { Sailboat, Waves, Anchor, Clock } from "lucide-react";

interface TimeProgressProps {
  theme?: "light" | "dark";
  className?: string;
  onProgressChange?: (progress: number) => void;
}

export default function TimeProgress({
  theme = "dark",
  className,
  onProgressChange,
}: TimeProgressProps) {
  const [progress, setProgress] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [showProgressPulse, setShowProgressPulse] = useState(false);
  const springProgress = useSpring(0, { stiffness: 100, damping: 30 }); // calculateProgressPercentage is defined here. It will be recreated on each render
  // with access to the most recent state.
  const calculateProgressPercentage = () => {
    const dateStart = new Date("2025-01-01T00:00:00");
    const dateEnd = new Date("2026-01-01T00:00:00");
    const dateNow = new Date();
    const totalDuration = dateEnd.getTime() - dateStart.getTime();
    const elapsedTime = dateNow.getTime() - dateStart.getTime();
    const percentage = Math.max(
      0,
      Math.min(100, (elapsedTime / totalDuration) * 100)
    ); // Check if a minute has passed since the last update
    const currentMinute = Math.floor(dateNow.getTime() / (60 * 1000));
    const lastMinute = Math.floor(lastUpdate.getTime() / (60 * 1000));

    if (currentMinute > lastMinute) {
      setLastUpdate(dateNow);
      setShowProgressPulse(true);
      // Remove the pulse after 2 seconds
      setTimeout(() => setShowProgressPulse(false), 2000);
    }

    setProgress(percentage);
    springProgress.set(percentage);
    onProgressChange?.(percentage);
  };
  // Create a reference to maintain the latest version of calculateProgressPercentage
  const calculateProgressPercentageRef = useRef(calculateProgressPercentage);
  // This useEffect runs after EVERY render.
  // Updates the reference so it always points to the most recent function.
  useEffect(() => {
    calculateProgressPercentageRef.current = calculateProgressPercentage;
  });
  // This useEffect runs only once (on mount and unmount).
  useEffect(() => {
    // Initial call to calculate progress
    calculateProgressPercentageRef.current();

    const timer = setInterval(() => {
      // Calls the function through the reference,
      // ensuring it's always the most recent version.
      calculateProgressPercentageRef.current();
    }, 1000); // The interval remains 1 second to update the UI

    return () => clearInterval(timer);
  }, []); // The empty dependency array ensures it runs once

  return (
    <motion.div
      className={cn(
        "flex flex-col items-center justify-center w-full space-y-6",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Progress Labels with Icons */}
      <motion.div
        className="flex justify-between items-center w-full max-w-md mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <Anchor className={cn("w-4 h-4 text-sky-500")} />
          <span className={cn("text-sm font-bold text-sky-500")}>2025</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("text-sm font-bold text-slate-500")}>2026</span>
          <Anchor className={cn("w-4 h-4 text-slate-500")} />
        </div>
      </motion.div>
      {/* Enhanced Progress Bar */}
      <div className="w-full max-w-md relative">
        {/* Background with gradient */}
        <motion.div
          className="h-6 w-full rounded-full relative overflow-hidden"
          style={{
            background:
              "linear-gradient(90deg, rgba(125,211,252,0.2), rgba(100,116,139,0.2))",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          {/* Animated water effect background */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                "linear-gradient(90deg, transparent, rgba(125,211,252,0.3), transparent)",
                "linear-gradient(90deg, transparent, rgba(14,165,233,0.3), transparent)",
                "linear-gradient(90deg, transparent, rgba(125,211,252,0.3), transparent)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Progress fill with gradient */}
          <motion.div
            className="h-full rounded-full relative overflow-hidden"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #0ea5e9, #7dd3fc, #64748b)",
              boxShadow: "0 0 20px rgba(14,165,233,0.5)",
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 -skew-x-12"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                width: "30%",
              }}
              animate={{
                x: ["-100%", "400%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1,
              }}
            />
          </motion.div>
        </motion.div>

        {/* Animated Sailboat */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 z-10"
          style={{
            left: `${Math.min(progress, 95)}%`, // Ensure sailboat doesn't go too far off screen
            x: "-50%",
          }}
          animate={{
            y: [0, -3, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sailboat
              className={cn(
                "w-8 h-8 drop-shadow-lg",
                theme === "dark" ? "text-yellow-400" : "text-yellow-600"
              )}
            />
            {/* Boat wake effect */}
            <motion.div
              className="absolute -left-8 top-1/2 -translate-y-1/2"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scaleX: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Waves className="w-6 h-6 text-sky-400/60" />
            </motion.div>
          </motion.div>{" "}
        </motion.div>
      </div>{" "}
      {/* Updated Progress Indicator */}
      <motion.div
        className={cn(
          "flex items-center gap-3 px-4 py-2 rounded-lg backdrop-blur-sm border transition-all duration-500",
          "bg-gradient-to-r from-sky-50/80 to-slate-50/80 dark:from-slate-950/50 dark:to-slate-800/50",
          "border-sky-200/50 dark:border-slate-800/50",
          showProgressPulse ? "ring-2 ring-sky-400 shadow-lg scale-105" : ""
        )}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: showProgressPulse ? 1.05 : 1,
        }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 300,
        }}
      >
        <motion.div
          animate={{
            rotate: showProgressPulse ? [0, 360] : 0,
          }}
          transition={{ duration: 1 }}
        >
          <Clock className={cn("w-4 h-4 text-sky-500")} />
        </motion.div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-xs font-medium text-slate-600 dark:text-slate-400"
              )}
            >
              Current Progress:
            </span>
            <motion.span
              className={cn(
                "text-sm font-bold bg-gradient-to-r from-sky-600 to-slate-600 bg-clip-text dark:text-white text-transparent"
              )}
              animate={showProgressPulse ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <NumberFlow
                value={progress}
                format={{
                  minimumFractionDigits: 4,
                  maximumFractionDigits: 4,
                }}
                plugins={[continuous]}
                willChange={true}
                suffix="%"
                className="tabular-nums"
              />
            </motion.span>
          </div>{" "}
          <span className={cn("text-xs text-slate-500 dark:text-slate-500")}>
            Last updated:{" "}
            {lastUpdate.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
        </div>

        {showProgressPulse && (
          <motion.div
            className="w-2 h-2 bg-green-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1,
              repeat: 2,
            }}
          />
        )}
      </motion.div>
      {/* Enhanced Progress Text */}
      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.div
          className="text-center p-4 rounded-xl bg-gradient-to-br from-sky-50 to-slate-50 dark:from-slate-950/50 dark:to-slate-800/50 backdrop-blur-sm border border-sky-200/30 dark:border-slate-800/30"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span
            className={cn("text-base italic text-slate-700 dark:text-slate-300")}
          >
            Why is a Spanish Galleon?{" "}
          </span>

          <a
            href="https://www.youtube.com/watch?v=Qk6FEcFKWyw"
            className={cn(
              "text-base font-bold italic text-slate-700 dark:text-slate-300"
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Look at this!
          </a>
        </motion.div>

        {/* Additional stats */}
        <motion.div
          className="flex gap-4 text-xs text-slate-500 dark:text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span>🌊 Sailing since Jan 1st</span>
          <span>⚓ Destination: 2026</span>
          <span>🧭 Course: Steady</span>
        </motion.div>
      </motion.div>
      {/* Enhanced Share Buttons */}
      <motion.div
        className="w-full flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <ShareButtons value={progress.toFixed(6)} />
      </motion.div>
    </motion.div>
  );
}
