import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface MaritimeEffectsProps {
  className?: string;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  opacity: number;
}

export default function MaritimeEffects({ className }: MaritimeEffectsProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate bubbles
    const bubblesArray: Bubble[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 4,
    }));

    // Generate stars
    const starsArray: Star[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.8 + 0.2,
    }));

    setBubbles(bubblesArray);
    setStars(starsArray);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 pointer-events-none overflow-hidden",
        className
      )}
    >
      {/* Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-blue-400/20 dark:bg-blue-300/10"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: bubble.size,
            height: bubble.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(bubble.id) * 10, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="bg-yellow-300 dark:bg-yellow-200 rounded-full"
            style={{
              width: star.size,
              height: star.size,
              boxShadow: `0 0 ${star.size * 2}px rgba(253, 224, 71, 0.4)`,
            }}
          />
        </motion.div>
      ))}

      {/* Water waves effect */}
      <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 w-[200%] h-full"
          style={{
            background:
              "linear-gradient(to top, rgba(59, 130, 246, 0.1), transparent)",
          }}
          animate={{
            x: ["-50%", "0%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            className="absolute bottom-0 left-0 w-full h-full"
            viewBox="0 0 400 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M0,50 Q100,20 200,50 T400,50 L400,100 L0,100 Z"
              fill="rgba(59, 130, 246, 0.1)"
              animate={{
                d: [
                  "M0,50 Q100,20 200,50 T400,50 L400,100 L0,100 Z",
                  "M0,40 Q100,30 200,40 T400,40 L400,100 L0,100 Z",
                  "M0,50 Q100,20 200,50 T400,50 L400,100 L0,100 Z",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
