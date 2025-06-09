import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Calendar, Compass, Wind, Waves, Ship, Anchor } from "lucide-react";
import NumberFlow from "@number-flow/react";

interface TimeStatsProps {
  className?: string;
}

interface TimeData {
  daysRemaining: number;
  hoursRemaining: number;
  minutesRemaining: number;
  secondsRemaining: number;
  totalDaysInYear: number;
  daysPassed: number;
}

export default function TimeStats({ className }: TimeStatsProps) {
  const [timeData, setTimeData] = useState<TimeData>({
    daysRemaining: 0,
    hoursRemaining: 0,
    minutesRemaining: 0,
    secondsRemaining: 0,
    totalDaysInYear: 0,
    daysPassed: 0,
  });

  const calculateTimeData = () => {
    const now = new Date();
    const yearStart = new Date("2025-01-01T00:00:00");
    const yearEnd = new Date("2026-01-01T00:00:00");

    const totalMs = yearEnd.getTime() - yearStart.getTime();
    const elapsedMs = now.getTime() - yearStart.getTime();
    const remainingMs = Math.max(0, yearEnd.getTime() - now.getTime());

    const totalDaysInYear = Math.ceil(totalMs / (1000 * 60 * 60 * 24));
    const daysPassed = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));

    const daysRemaining = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor(
      (remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesRemaining = Math.floor(
      (remainingMs % (1000 * 60 * 60)) / (1000 * 60)
    );
    const secondsRemaining = Math.floor((remainingMs % (1000 * 60)) / 1000);

    setTimeData({
      daysRemaining,
      hoursRemaining,
      minutesRemaining,
      secondsRemaining,
      totalDaysInYear,
      daysPassed,
    });
  };

  useEffect(() => {
    calculateTimeData();
    const interval = setInterval(calculateTimeData, 1000);
    return () => clearInterval(interval);
  }, []); // Generate random but realistic ship data
  const generateShipData = () => {
    const baseSpeed = 8; // base knots
    const speedVariation = Math.sin(Date.now() / 10000) * 2; // smooth variation
    const currentSpeed = Math.max(6, baseSpeed + speedVariation);

    const windDirection = Math.floor((Date.now() / 5000) % 360); // degrees
    const waveHeight = Math.max(0.5, 2 + Math.sin(Date.now() / 8000) * 1.5); // meters
    const distanceToPort = Math.max(100, 2500 - timeData.daysPassed * 6.8); // nautical miles

    return {
      speed: Math.round(currentSpeed * 10) / 10,
      windDirection,
      waveHeight: Math.round(waveHeight * 10) / 10,
      distanceToPort: Math.round(distanceToPort),
    };
  };

  const shipData = generateShipData();

  const stats = [
    {
      icon: Calendar,
      label: "Days Sailed",
      value: timeData.daysPassed,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Ship,
      label: "Current Speed",
      value: shipData.speed,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      suffix: " knots",
    },
    {
      icon: Compass,
      label: "Wind Direction",
      value: shipData.windDirection,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      suffix: "°",
    },
    {
      icon: Waves,
      label: "Wave Height",
      value: shipData.waveHeight,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      suffix: "m",
    },
    {
      icon: Anchor,
      label: "Distance to Port",
      value: shipData.distanceToPort,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      suffix: " nm",
    },
    {
      icon: Wind,
      label: "Favorable Winds",
      value: Math.round((shipData.speed / 12) * 100),
      color: "text-teal-500",
      bgColor: "bg-teal-500/10",
      suffix: "%",
    },
  ];

  return (
    <motion.div
      className={cn(
        "w-full max-w-4xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {/* Countdown Display */}
      <motion.div
        className="mb-8 text-center p-6 rounded-2xl bg-gradient-to-br from-slate-50/80 to-sky-50/80 dark:from-slate-950/80 dark:to-slate-800/80 backdrop-blur-sm border border-slate-200/30 dark:border-slate-800/30"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-300">
          ⏰ Time Until We Reach Port 2026
        </h3>
        <div className="flex justify-center items-center gap-4 text-2xl sm:text-3xl font-bold">
          <motion.div
            className="flex flex-col items-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <NumberFlow
              value={timeData.daysRemaining}
              className="text-sky-600 dark:text-sky-400 tabular-nums"
            />
            <span className="text-xs text-slate-500 font-normal">DAYS</span>
          </motion.div>
          <span className="text-slate-400">:</span>
          <motion.div
            className="flex flex-col items-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          >
            <NumberFlow
              value={timeData.hoursRemaining}
              className="text-slate-600 dark:text-slate-400 tabular-nums"
            />
            <span className="text-xs text-slate-500 font-normal">HOURS</span>
          </motion.div>
          <span className="text-slate-400">:</span>
          <motion.div
            className="flex flex-col items-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          >
            <NumberFlow
              value={timeData.minutesRemaining}
              className="text-green-600 dark:text-green-400 tabular-nums"
            />
            <span className="text-xs text-slate-500 font-normal">MINS</span>
          </motion.div>
          <span className="text-slate-400">:</span>
          <motion.div
            className="flex flex-col items-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <NumberFlow
              value={timeData.secondsRemaining}
              className="text-orange-600 dark:text-orange-400 tabular-nums"
            />
            <span className="text-xs text-slate-500 font-normal">SECS</span>
          </motion.div>
        </div>{" "}
      </motion.div>{" "}
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className={cn(
              "p-4 rounded-xl backdrop-blur-sm border border-slate-200/30 dark:border-slate-800/30",
              stat.bgColor
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.7 + index * 0.1,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className={cn("p-2 rounded-lg", stat.bgColor)}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              >
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </motion.div>
              <div>
                {" "}
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {stat.label}
                </p>
                <div
                  className={cn(
                    "text-lg font-bold tabular-nums flex items-baseline",
                    stat.color
                  )}
                >
                  <NumberFlow value={stat.value} />
                  {stat.suffix && (
                    <span className="text-xs ml-1 opacity-70">
                      {stat.suffix}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Fun Facts */}
      <motion.div
        className="mt-6 p-4 rounded-xl bg-gradient-to-r from-amber-50/80 to-yellow-50/80 dark:from-amber-950/30 dark:to-yellow-950/30 backdrop-blur-sm border border-amber-200/30 dark:border-amber-800/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="text-center text-sm text-amber-700 dark:text-amber-300">
          <p>
            🌟 Our galleon has been sailing for{" "}
            <span className="font-bold">
              <NumberFlow value={timeData.daysPassed} />
            </span>{" "}
            days out of {timeData.totalDaysInYear} total days in this voyage!
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
