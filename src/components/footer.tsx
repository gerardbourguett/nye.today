import { motion } from "motion/react";
import { Github, Ship } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className={cn(
        "w-full mt-16 py-8 px-4 relative overflow-hidden",
        className
      )}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-sky-50/50 to-transparent dark:from-slate-950/20 dark:to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Decorative wave */}
        <motion.div
          className="mb-6"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            className="w-full h-8 text-sky-300/50 dark:text-sky-600/30"
            viewBox="0 0 400 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M0,20 Q100,10 200,20 T400,20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              animate={{
                d: [
                  "M0,20 Q100,10 200,20 T400,20",
                  "M0,25 Q100,15 200,25 T400,25",
                  "M0,20 Q100,10 200,20 T400,20",
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

        <div className="text-center space-y-6">
          {/* Main footer content */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-600 dark:text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
          >
            <div className="flex items-center gap-2">
              <Ship className="w-4 h-4 text-sky-500" />
              <span>Sailing through {currentYear + 1}</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <span>Made with</span>
              GerardABC
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9 }}
          >
            <motion.a
              href="https://github.com/gerardbourguett/nye.today"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
              <span className="text-sm font-medium">Source</span>
            </motion.a>
          </motion.div>

          {/* Inspirational quote */}
          <motion.div
            className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1 }}
          >
            <motion.p
              className="text-xs italic text-slate-500 dark:text-slate-400 max-w-md mx-auto"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              "The Spanish Galleon arrived, Leaving a wake in the sea. Its flag
              in the air, Its distinguished figure, Will conquer your world."
              <br />
              <a
                href="https://es.wikipedia.org/wiki/Tommy_Rey"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block"
              >
                <span className="text-sky-500 dark:text-sky-400 font-medium">
                  — Tommy Rey
                </span>
              </a>
            </motion.p>
          </motion.div>

          {/* Floating elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-sky-400/30 rounded-full"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${20 + i * 15}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
