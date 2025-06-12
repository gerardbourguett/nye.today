import { Clock, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TimeZoneGroup } from "@/types/types";

interface TimezoneCardProps {
  group: TimeZoneGroup;
  index: number;
  onClick: (group: TimeZoneGroup) => void;
  variant?: "large" | "small";
}

export function TimezoneCard({
  group,
  index,
  onClick,
  variant = "large",
}: TimezoneCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "celebrating":
        return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800";
      case "upcoming":
        return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800";
      case "waiting":
        return "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950 border-sky-200 dark:border-sky-800";
      default:
        return "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800";
    }
  };

  if (variant === "small") {
    return (
      <Card
        className="group flex-shrink-0 w-80 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-sky-500/10 animate-fade-in-up bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl border-sky-200/50 dark:border-sky-500/20"
        style={{ animationDelay: `${index * 0.05}s` }}
        onClick={() => onClick(group)}
      >
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-slate-600 flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">
                  {group.gmtOffsetDisplay}
                </CardTitle>
                <CardDescription className="text-sky-600 dark:text-sky-300 font-medium">
                  {group.zoneName}
                </CardDescription>
              </div>
            </div>
            <Badge className={getStatusColor(group.status)}>⏳ Waiting</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4 text-sm">
            <div className="text-center">
              <div className="text-sky-600 dark:text-sky-400 font-bold text-lg">
                {group.timeToMidnight}
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
                <span>Progress</span>
                <span>{Math.round(group.progress)}%</span>
              </div>
              <div className="w-full bg-slate-200/60 dark:bg-slate-600/60 rounded-full h-3 overflow-hidden shadow-inner">
                <div
                  className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-sky-500 to-slate-600 shadow-md shadow-sky-500/50"
                  style={{ width: `${group.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Countries sample */}
            <div className="space-y-2">
              {group.countries.slice(0, 3).map((country) => (
                <div
                  key={country.id}
                  className="flex items-center space-x-3 bg-white/40 dark:bg-slate-700/40 rounded-lg p-2 backdrop-blur-sm"
                >
                  <img
                    src={`/src/assets/flags/4x3/${country.countryCode.toLowerCase()}.svg`}
                    alt={country.countryName}
                    className="w-4 h-3 rounded shadow-sm"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                  <span className="text-slate-600 dark:text-slate-300 text-sm font-medium truncate">
                    {country.countryName}
                  </span>
                </div>
              ))}
              {group.countries.length > 3 && (
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-2 bg-white/30 dark:bg-slate-700/30 rounded-lg p-2 backdrop-blur-sm">
                  <MapPin className="w-3 h-3" />
                  <span className="font-medium">
                    +{group.countries.length - 3} more (click to see all)
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="group flex-shrink-0 w-96 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/10 animate-fade-in-up bg-white/90 dark:bg-slate-800/70 backdrop-blur-xl border-sky-200/50 dark:border-sky-500/30"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => onClick(group)}
    >
      {/* Glow effect for celebrating zones */}
      {group.status === "celebrating" && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-sky-500/20 rounded-lg animate-pulse"></div>
      )}

      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                group.status === "celebrating"
                  ? "bg-gradient-to-br from-green-500 to-sky-600 text-white"
                  : "bg-gradient-to-br from-sky-500 to-slate-600 text-white"
              }`}
            >
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <CardTitle className="text-2xl">
                {group.gmtOffsetDisplay}
              </CardTitle>
              <CardDescription className="text-sky-600 dark:text-sky-300 font-medium">
                {group.zoneName}
              </CardDescription>
            </div>
          </div>
          <Badge className={getStatusColor(group.status)}>
            {group.status === "celebrating" && "🎉 Celebrating"}
            {group.status === "upcoming" && "⏰ Upcoming"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative z-10">
        {/* Time Info */}
        <div className="text-center mb-6">
          <div
            className={`font-bold text-xl ${
              group.status === "celebrating"
                ? "text-green-600 dark:text-green-400"
                : "text-sky-600 dark:text-sky-400"
            }`}
          >
            {group.timeToMidnight}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 mb-3 font-medium">
            <span>Progress to midnight</span>
            <span>{Math.round(group.progress)}%</span>
          </div>
          <div className="w-full bg-slate-200/60 dark:bg-slate-600/60 rounded-full h-4 overflow-hidden shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                group.status === "celebrating"
                  ? "bg-gradient-to-r from-green-500 to-sky-600 shadow-lg shadow-green-500/50"
                  : "bg-gradient-to-r from-sky-500 to-slate-600 shadow-lg shadow-sky-500/50"
              }`}
              style={{ width: `${group.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Countries in this timezone */}
        <div className="space-y-3">
          <h4 className="text-slate-700 dark:text-slate-300 font-bold text-base">
            Countries in this timezone:
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {group.countries.slice(0, 4).map((country) => (
              <div
                key={country.id}
                className="flex items-center space-x-3 text-sm bg-white/50 dark:bg-slate-700/50 rounded-xl p-3 backdrop-blur-sm"
              >
                <img
                  src={`/src/assets/flags/4x3/${country.countryCode.toLowerCase()}.svg`}
                  alt={country.countryName}
                  className="w-5 h-4 rounded shadow-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
                <span className="text-slate-600 dark:text-slate-300 text-sm font-medium truncate">
                  {country.countryName}
                </span>
              </div>
            ))}
            {group.countries.length > 4 && (
              <div className="text-sm text-slate-500 dark:text-slate-400 col-span-2 flex items-center space-x-2 bg-white/30 dark:bg-slate-700/30 rounded-xl p-3 backdrop-blur-sm">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">
                  +{group.countries.length - 4} more (click to see all)
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
