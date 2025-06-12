import { Clock, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TimeZoneGroup } from "@/types/types";

interface TimezoneModalProps {
  selectedTimeZone: TimeZoneGroup | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TimezoneModal({
  selectedTimeZone,
  isOpen,
  onClose,
}: TimezoneModalProps) {
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

  if (!isOpen || !selectedTimeZone) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card
        className="max-w-5xl w-full max-h-[85vh] overflow-hidden bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-sky-200/50 dark:border-sky-500/20 shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <CardHeader className="border-b border-slate-200/50 dark:border-slate-600/50 bg-gradient-to-r from-sky-50/50 to-slate-50/50 dark:from-slate-800/50 dark:to-sky-900/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl ${
                  selectedTimeZone.status === "celebrating"
                    ? "bg-gradient-to-br from-green-500 to-sky-600 text-white"
                    : selectedTimeZone.status === "upcoming"
                    ? "bg-gradient-to-br from-amber-500 to-sky-600 text-white"
                    : "bg-gradient-to-br from-sky-500 to-slate-600 text-white"
                }`}
              >
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <CardTitle className="text-3xl">
                  {selectedTimeZone.gmtOffsetDisplay}
                </CardTitle>
                <CardDescription className="text-sky-600 dark:text-sky-300 text-lg font-medium">
                  {selectedTimeZone.zoneName} •{" "}
                  {selectedTimeZone.timeToMidnight}
                </CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={onClose}
              className="rounded-2xl"
            >
              <X className="w-7 h-7" />
            </Button>
          </div>
        </CardHeader>

        {/* Modal Content */}
        <CardContent className="p-8 overflow-y-auto max-h-[calc(85vh-200px)]">
          <div className="mb-6">
            <Badge
              className={`${getStatusColor(
                selectedTimeZone.status
              )} text-base px-6 py-3`}
            >
              {selectedTimeZone.status === "celebrating" &&
                "🎉 Celebrating Now"}
              {selectedTimeZone.status === "upcoming" && "⏰ Upcoming"}
              {selectedTimeZone.status === "waiting" && "⏳ Waiting"}
            </Badge>
          </div>

          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
            Countries and territories in this time zone (
            {selectedTimeZone.countries.length} total):
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedTimeZone.countries.map((country, index) => (
              <Card
                key={country.id}
                className="bg-white/60 dark:bg-slate-700/60 border-slate-200/50 dark:border-slate-600/30 hover:border-sky-400/50 dark:hover:border-sky-500/30 transition-all duration-300 backdrop-blur-sm hover:scale-105 hover:shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 0.02}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-4">
                    <img
                      src={`/src/assets/flags/4x3/${country.countryCode.toLowerCase()}.svg`}
                      alt={country.countryName}
                      className="w-10 h-8 rounded shadow-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                    <div>
                      <CardTitle className="text-lg">
                        {country.countryName}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {country.zoneName}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3 text-sm">
                    {/* Live Stream Status */}
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">
                        Live Stream:
                      </span>
                      <div className="flex items-center space-x-2">
                        {country.live ? (
                          <>
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-red-600 dark:text-red-400 font-bold">
                              {country.live}
                            </span>
                          </>
                        ) : (
                          <span className="text-slate-500 dark:text-slate-400">
                            Not available
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Celebration Status */}
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">
                        Status:
                      </span>
                      <span
                        className={`font-bold ${
                          country.status === "celebrating"
                            ? "text-green-600 dark:text-green-400"
                            : country.status === "upcoming"
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-sky-600 dark:text-sky-400"
                        }`}
                      >
                        {country.status === "celebrating"
                          ? "🎉 Celebrating"
                          : country.status === "upcoming"
                          ? "⏰ Upcoming"
                          : "⏳ Waiting"}
                      </span>
                    </div>

                    {/* Time to midnight */}
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">
                        To midnight:
                      </span>
                      <span className="text-sky-600 dark:text-sky-400 font-mono font-bold">
                        {country.timeToMidnight}
                      </span>
                    </div>

                    {/* Stream URL if available */}
                    {country.streamUrl && (
                      <div className="pt-2">
                        <a
                          href={country.streamUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        >
                          <span className="text-sm font-medium">
                            Watch Live
                          </span>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      </div>
                    )}

                    {/* Individual progress bar */}
                    <div className="mt-4">
                      <div className="w-full bg-slate-200/60 dark:bg-slate-600/60 rounded-full h-2 shadow-inner">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            country.status === "celebrating"
                              ? "bg-gradient-to-r from-green-500 to-sky-600 shadow-md shadow-green-500/50"
                              : country.status === "upcoming"
                              ? "bg-gradient-to-r from-amber-500 to-sky-600 shadow-md shadow-amber-500/50"
                              : "bg-gradient-to-r from-sky-500 to-slate-600 shadow-md shadow-sky-500/50"
                          }`}
                          style={{ width: `${country.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-200/50 dark:border-slate-600/50 bg-gradient-to-r from-slate-50/50 to-sky-50/50 dark:from-slate-800/50 dark:to-slate-700/50 backdrop-blur-sm">
          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            Click anywhere outside this modal or press{" "}
            <kbd className="px-3 py-1 bg-slate-200 dark:bg-slate-600 rounded-lg font-mono">
              Esc
            </kbd>{" "}
            to close
          </div>
        </div>
      </Card>
    </div>
  );
}
