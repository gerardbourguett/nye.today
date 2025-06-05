import { motion, AnimatePresence } from "motion/react";
import { useSpecialDates } from "@/hooks/use-special-dates";
import { cn } from "@/lib/utils";

interface SpecialDateBannerProps {
  className?: string;
}

export default function SpecialDateBanner({
  className,
}: SpecialDateBannerProps) {
  const specialDate = useSpecialDates();

  // Only render if there's actually a special date and it's active
  if (!specialDate || !specialDate.isActive) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={specialDate.name}
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full backdrop-blur-md border border-white/20 shadow-2xl bg-gradient-to-r",
          specialDate.color,
          className
        )}
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.8 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="flex items-center gap-3 text-white font-medium"
          animate={{
            textShadow: [
              "0 0 5px rgba(255,255,255,0.5)",
              "0 0 15px rgba(255,255,255,0.8)",
              "0 0 5px rgba(255,255,255,0.5)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.span
            className="text-2xl"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {specialDate.emoji}
          </motion.span>
          <span className="text-sm sm:text-base">
            Happy {specialDate.name}!
          </span>
        </motion.div>

        {/* Sparkle effects */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 2) * 20}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
