import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DigitalClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-sky-200/50 dark:border-sky-500/20 shadow-xl">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-lg font-bold text-slate-800 dark:text-white">
          Current Time (UTC)
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="font-mono text-3xl font-bold text-sky-600 dark:text-sky-400 mb-2">
          {formatTime(currentTime)}
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          {formatDate(currentTime)}
        </div>
      </CardContent>
    </Card>
  );
}
