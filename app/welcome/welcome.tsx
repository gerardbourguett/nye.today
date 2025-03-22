import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "~/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import TimeCard from "~/components/time-card";
import TimeProgress from "~/components/time-progress";
import TablaComponent from "~/components/tabla/tabla-component";
import { CURRENT_YEAR, NEXT_YEAR } from "~/data/constants";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { ModeToggle } from "~/components/mode-toggle";
export function Welcome() {
  const [timeLeft, setTimeLeft] = useState(0);
  const targetData = new Date("2026-01-01T00:00:00").getTime();

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

  return (
    <div>
      <motion.main
        className={`flex min-h-screen flex-col items-center justify-center`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>

        <motion.div
          className="max-w-4xl w-full text-center mb-16"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <h1 className={`text-6xl md:text-8xl font-medium text-center `}>
            #{NEXT_YEAR}
            <span className="text-blue-500">Live</span>
          </h1>

          <motion.p
            className={`mt-4 text-lg `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <TimeProgress />
          </motion.p>
        </motion.div>

        <Tabs defaultValue="time" className="w-[1000px] max-w-3xl">
          <TabsList className="mb-4 items-center justify-center">
            <TabsTrigger value="time">Time</TabsTrigger>
            <TabsTrigger value="countries">Countries</TabsTrigger>
          </TabsList>
          <TabsContent value="time">
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
              <TimeCard title="Days" value={days} />
              <TimeCard title="Hours" value={hours} />
              <TimeCard title="Minutes" value={minutes} />
              <TimeCard title="Seconds" value={seconds} />
            </motion.div>
          </TabsContent>
          <TabsContent value="countries">
            <TablaComponent />
          </TabsContent>
        </Tabs>
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
