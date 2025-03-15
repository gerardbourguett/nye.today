import React, { useEffect, useState } from "react";
import { Progress } from "./ui/progress";
import { cn } from "~/lib/utils";
import { motion } from "motion/react";
import NumberFlow, { continuous } from "@number-flow/react";

interface TimeProgressProps {
  theme?: "light" | "dark";
  className?: string;
}

export default function TimeProgress({
  theme = "dark",
  className,
}: TimeProgressProps) {
  const [progress, setProgress] = useState(0);

  const calculateProgressPercentage = () => {
    const dateStart = new Date("2025-01-01T00:00:00");
    const dateEnd = new Date("2026-01-01T00:00:00");
    const dateNow = new Date();
    const totalDuration = dateEnd.getTime() - dateStart.getTime();
    const elapsedTime = dateNow.getTime() - dateStart.getTime();
    const percentage = Math.max(
      0,
      Math.min(100, (elapsedTime / totalDuration) * 100)
    );
    setProgress(percentage);
  };

  useEffect(() => {
    calculateProgressPercentage();
    const timer = setInterval(() => {
      calculateProgressPercentage();
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const textColor = theme === "dark" ? "text-blue-200" : "text-blue-700";
  const accentColor = theme === "dark" ? "text-blue-400" : "text-blue-600";
  const progressColor =
    theme === "dark"
      ? "bg-blue-500 data-[state=complete]:bg-blue-400"
      : "bg-blue-600 data-[state=complete]:bg-blue-500";

  return (
    <motion.div
      className={cn(
        "flex flex-col items-center justify-center w-full space-y-3",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between w-full max-w-md mb-1">
        <span className={cn("text-xs font-medium", textColor)}>2025</span>
        <span className={cn("text-xs font-medium", textColor)}>2026</span>
      </div>

      <div className="w-full max-w-md">
        <Progress
          value={progress}
          className={cn(
            "h-3 w-full bg-opacity-20 rounded-md",
            theme === "dark" ? "bg-slate-700" : "bg-slate-200"
          )}
          indicatorClassName={cn(progressColor, "rounded-md")}
        />
      </div>

      <motion.div
        className="flex items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <span className={cn("text-sm font-bold", accentColor)}>
          <NumberFlow
            value={progress}
            format={{
              minimumFractionDigits: 5,
              maximumFractionDigits: 5,
            }}
            plugins={[continuous]}
            willChange={true}
            suffix="%"
            className="tabular-nums"
          />
        </span>
        <span className={cn("text-sm", textColor)}>of 2025 completed</span>
      </motion.div>
    </motion.div>
  );
}
