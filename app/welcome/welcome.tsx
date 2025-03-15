import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "~/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import TimeCard from "~/components/time-card";
import TimeProgress from "~/components/time-progress";
export function Welcome() {
  const [timeLeft, setTimeLeft] = useState(0);
  const targetData = new Date("2026-01-01T00:00:00").getTime();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetData - now;
      setTimeLeft(distance > 0 ? distance : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetData]);

  const calculateTimeLeft = () => {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = calculateTimeLeft();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const bgClasses =
    theme === "dark"
      ? "from-slate-950 via-slate-900 to-blue-950"
      : "from-blue-100 via-white to-purple-100";

  const textClasses = theme === "dark" ? "text-white" : "text-slate-900";

  return (
    <div>
      <motion.main
        className={`flex min-h-screen flex-col items-center justify-center bg-gradient-to-br ${bgClasses} ${textClasses} p-4`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-4 right-4">
          <Button
            onClick={toggleTheme}
            variant="ghost"
            className={`rounded-full w-10 h-10 p-0 flex items-center justify-center ${
              theme === "dark"
                ? "text-yellow-300 hover:text-yellow-200"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            {theme === "dark" ? <SunIcon size={24} /> : <MoonIcon size={24} />}
          </Button>
        </div>

        <motion.div
          className="max-w-4xl w-full text-center mb-16"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <h1
            className={`text-6xl md:text-8xl font-medium text-center ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            #2026<span className="text-blue-500">Live</span>
          </h1>

          <motion.p
            className={`mt-4 text-lg ${
              theme === "dark" ? "text-blue-200" : "text-blue-700"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <TimeProgress theme={theme} />
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-3xl"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          initial="hidden"
          animate="show"
        >
          <TimeCard title="Days" value={days} theme={theme} />
          <TimeCard title="Hours" value={hours} theme={theme} />
          <TimeCard title="Minutes" value={minutes} theme={theme} />
          <TimeCard title="Seconds" value={seconds} theme={theme} />
        </motion.div>
        <div className="flex justify-center items-center">
          <footer className="mt-8 p-4 rounded-lg shadow-md">
            <p className="text-sm text-gray-500 text-center">
              © 2024 - 2025. Created by GerardABC
            </p>
          </footer>
        </div>
      </motion.main>
    </div>
  );
}
