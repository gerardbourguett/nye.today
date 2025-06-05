import React, {
  useEffect,
  useState,
  useRef, // Importa useRef
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
  const springProgress = useSpring(0, { stiffness: 100, damping: 30 });
  // calculateProgressPercentage se define aquí. Se recreará en cada render
  // con acceso al estado más reciente.
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

    // Verificar si ha pasado un minuto desde la última actualización
    const currentMinute = Math.floor(dateNow.getTime() / (60 * 1000));
    const lastMinute = Math.floor(lastUpdate.getTime() / (60 * 1000));

    if (currentMinute > lastMinute) {
      setLastUpdate(dateNow);
      setShowProgressPulse(true);
      // Quitar el pulso después de 2 segundos
      setTimeout(() => setShowProgressPulse(false), 2000);
    }

    setProgress(percentage);
    springProgress.set(percentage);
    onProgressChange?.(percentage);
  };

  // Crea una referencia para mantener la última versión de calculateProgressPercentage
  const calculateProgressPercentageRef = useRef(calculateProgressPercentage);

  // Este useEffect se ejecuta después de CADA renderización.
  // Actualiza la referencia para que siempre apunte a la función más reciente.
  useEffect(() => {
    calculateProgressPercentageRef.current = calculateProgressPercentage;
  });

  // Este useEffect se ejecuta solo una vez (al montar y desmontar).
  useEffect(() => {
    // Llamada inicial para calcular el progreso
    calculateProgressPercentageRef.current();

    const timer = setInterval(() => {
      // Llama a la función a través de la referencia,
      // asegurando que sea siempre la versión más reciente.
      calculateProgressPercentageRef.current();
    }, 1000); // El intervalo sigue siendo de 1 segundo para actualizar la UI

    return () => clearInterval(timer);
  }, []); // El array de dependencias vacío asegura que se ejecute una vez

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
          <Anchor className={cn("w-4 h-4 text-blue-500")} />
          <span className={cn("text-sm font-bold text-blue-500")}>2025</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("text-sm font-bold text-purple-500")}>2026</span>
          <Anchor className={cn("w-4 h-4 text-purple-500")} />
        </div>
      </motion.div>

      {/* Enhanced Progress Bar */}
      <div className="w-full max-w-md relative">
        {/* Background with gradient */}
        <motion.div
          className="h-6 w-full rounded-full relative overflow-hidden"
          style={{
            background:
              "linear-gradient(90deg, rgba(59,130,246,0.2), rgba(147,51,234,0.2))",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          {/* Animated water effect background */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                "linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)",
                "linear-gradient(90deg, transparent, rgba(14,165,233,0.3), transparent)",
                "linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)",
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
              background: "linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6)",
              boxShadow: "0 0 20px rgba(59,130,246,0.5)",
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
              <Waves className="w-6 h-6 text-blue-400/60" />
            </motion.div>
          </motion.div>{" "}
        </motion.div>
      </div>

      {/* Indicador de Progreso Actualizado */}
      <motion.div
        className={cn(
          "flex items-center gap-3 px-4 py-2 rounded-lg backdrop-blur-sm border transition-all duration-500",
          "bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-950/50 dark:to-purple-950/50",
          "border-blue-200/50 dark:border-blue-800/50",
          showProgressPulse ? "ring-2 ring-blue-400 shadow-lg scale-105" : ""
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
          <Clock className={cn("w-4 h-4 text-blue-500")} />
        </motion.div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-xs font-medium text-gray-600 dark:text-gray-400"
              )}
            >
              Current Progress:
            </span>
            <motion.span
              className={cn(
                "text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text dark:text-white text-transparent"
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
          </div>
          <span className={cn("text-xs text-gray-500 dark:text-gray-500")}>
            Last updated:{" "}
            {lastUpdate.toLocaleTimeString("es-ES", {
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
          className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 backdrop-blur-sm border border-blue-200/30 dark:border-blue-800/30"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span
            className={cn("text-base italic text-gray-700 dark:text-gray-300")}
          >
            Why is a Spanish Galleon?{" "}
          </span>

          <a
            href="https://www.youtube.com/watch?v=Qk6FEcFKWyw"
            className={cn(
              "text-base font-bold italic text-gray-700 dark:text-gray-300"
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
          className="flex gap-4 text-xs text-gray-500 dark:text-gray-400"
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
