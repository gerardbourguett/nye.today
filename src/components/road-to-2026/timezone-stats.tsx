import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface TimezoneStatsProps {
  celebratingCount: number;
  upcomingCount: number;
  waitingCount: number;
}

export function TimezoneStats({
  celebratingCount,
  upcomingCount,
  waitingCount,
}: TimezoneStatsProps) {
  return (
    <Card className="inline-flex items-center gap-8 px-8 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-sky-200/50 dark:border-sky-500/20 shadow-xl">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-green-600 dark:text-green-400 font-semibold">
          {celebratingCount} celebrating
        </span>
      </div>
      <Separator orientation="vertical" className="h-6" />
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
        <span className="text-amber-600 dark:text-amber-400 font-semibold">
          {upcomingCount} upcoming
        </span>
      </div>
      <Separator orientation="vertical" className="h-6" />
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-sky-500 rounded-full"></div>
        <span className="text-sky-600 dark:text-sky-400 font-semibold">
          {waitingCount} waiting
        </span>
      </div>
    </Card>
  );
}
