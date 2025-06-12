import supabase from "@/utils/supabase";
import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { TimeZoneReduced, TimeZoneGroup } from "@/types/types";
import { DigitalClock } from "@/components/road-to-2026/digital-clock";
import { TimezoneStats } from "@/components/road-to-2026/timezone-stats";
import { TimezoneCard } from "@/components/road-to-2026/timezone-card";
import { TimezoneModal } from "@/components/road-to-2026/timezone-modal";
import { useTimezoneData } from "@/components/road-to-2026/use-timezone-data";

export default function RoadTo2026() {
  const [timezones, setTimezones] = useState<TimeZoneReduced[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeZone, setSelectedTimeZone] =
    useState<TimeZoneGroup | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const upcomingScrollRef = useRef<HTMLDivElement>(null);
  const celebratingScrollRef = useRef<HTMLDivElement>(null);
  const waitingScrollRef = useRef<HTMLDivElement>(null);

  // Use custom hook for timezone calculations
  const { timeZoneGroups } = useTimezoneData(timezones);

  // Handle modal open/close
  const openModal = (timeZoneGroup: TimeZoneGroup) => {
    setSelectedTimeZone(timeZoneGroup);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTimeZone(null);
    document.body.style.overflow = "unset";
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isModalOpen]);

  useEffect(() => {
    async function getTimeZoneReduced() {
      try {
        setLoading(true);
        setError(null);

        const { data: timezones, error: supabaseError } = await supabase
          .from("time_zone_reduced")
          .select("*");

        if (supabaseError) {
          console.error("Supabase error:", supabaseError);
          setError(supabaseError.message);
          return;
        }

        if (timezones) {
          setTimezones(timezones as TimeZoneReduced[]);
          console.log("Successfully loaded timezones:", timezones.length);
        }
      } catch (err) {
        console.error("Error fetching timezones:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    getTimeZoneReduced();

    // Update every minute to keep times accurate
    const interval = setInterval(getTimeZoneReduced, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollContainer = (
    direction: "left" | "right",
    containerRef: React.RefObject<HTMLDivElement | null>
  ) => {
    if (containerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        direction === "left"
          ? containerRef.current.scrollLeft - scrollAmount
          : containerRef.current.scrollLeft + scrollAmount;

      containerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-sky-200 dark:border-sky-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-2 border-slate-300 dark:border-slate-700 border-t-transparent rounded-full animate-spin animate-reverse"></div>
          </div>
          <p className="text-slate-800 dark:text-white text-xl font-medium animate-pulse">
            Loading timezones...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <Card className="max-w-lg bg-red-50/80 dark:bg-red-950/80 border-red-200 dark:border-red-800 animate-fade-in p-8 text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 text-red-500">⚠️</div>
          </div>
          <h2 className="text-red-600 dark:text-red-400 text-2xl font-bold mb-4">
            Connection Error
          </h2>
          <p className="text-red-500 dark:text-red-300 mb-6 leading-relaxed">
            {error}
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
            Please check your Supabase configuration and internet connection.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700"
          >
            Retry Connection
          </Button>
        </Card>
      </div>
    );
  }

  const upcomingGroups = timeZoneGroups.filter(
    (group) => group.status === "upcoming"
  );

  const celebratingGroups = timeZoneGroups.filter(
    (group) => group.status === "celebrating"
  );

  const waitingGroups = timeZoneGroups.filter(
    (group) => group.status === "waiting"
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8 overflow-x-hidden"
    >
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-sky-400/30 to-slate-400/30 rounded-full animate-float"
            style={{
              left: `${10 + ((i * 8) % 80)}%`,
              top: `${15 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-2 h-2 bg-gradient-to-r from-sky-300/40 to-slate-300/40 rounded-full animate-pulse"
            style={{
              right: `${5 + ((i * 12) % 70)}%`,
              top: `${10 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        {/* Digital Clock */}
        <div className="mb-8 animate-fade-in-up">
          <DigitalClock />
        </div>

        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-sky-600 via-slate-600 to-sky-600 dark:from-sky-400 dark:via-slate-400 dark:to-sky-400 bg-clip-text text-transparent mb-6">
            Road To 2026
          </h1>
          <p className="text-sky-600 dark:text-sky-300 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Watch the world celebrate as each timezone welcomes the new year
          </p>
          <TimezoneStats
            celebratingCount={celebratingGroups.length}
            upcomingCount={upcomingGroups.length}
            waitingCount={waitingGroups.length}
          />
        </div>

        <div className="space-y-16">
          {/* Upcoming Time Zones */}
          {upcomingGroups.length > 0 && (
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-sky-600 dark:from-amber-400 dark:to-sky-400 bg-clip-text text-transparent mb-3">
                    ⏰ Upcoming Celebrations
                  </h2>
                  <p className="text-sky-600 dark:text-sky-300 text-lg">
                    Time zones within 1 hour of midnight
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scrollContainer("left", upcomingScrollRef)}
                    className="rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-sky-200/50 dark:border-sky-500/20 hover:border-sky-400/60 dark:hover:border-sky-400/50"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scrollContainer("right", upcomingScrollRef)}
                    className="rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-sky-200/50 dark:border-sky-500/20 hover:border-sky-400/60 dark:hover:border-sky-400/50"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              <div
                ref={upcomingScrollRef}
                className="flex space-x-8 overflow-x-auto pb-6 scrollbar-hide"
                style={{ scrollBehavior: "smooth" }}
              >
                {upcomingGroups.map((group, index) => (
                  <TimezoneCard
                    key={`${group.gmtOffset}-upcoming`}
                    group={group}
                    index={index}
                    onClick={openModal}
                    variant="large"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Celebrating Time Zones */}
          {celebratingGroups.length > 0 && (
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-3">
                    🎉 Celebrating Now
                  </h2>
                  <p className="text-green-600 dark:text-green-300 text-lg">
                    Time zones currently celebrating the new year
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      scrollContainer("left", celebratingScrollRef)
                    }
                    className="rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-green-200/50 dark:border-green-500/20 hover:border-green-400/60 dark:hover:border-green-400/50"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      scrollContainer("right", celebratingScrollRef)
                    }
                    className="rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-green-200/50 dark:border-green-500/20 hover:border-green-400/60 dark:hover:border-green-400/50"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              <div
                ref={celebratingScrollRef}
                className="flex space-x-8 overflow-x-auto pb-6 scrollbar-hide"
                style={{ scrollBehavior: "smooth" }}
              >
                {celebratingGroups.map((group, index) => (
                  <TimezoneCard
                    key={`${group.gmtOffset}-celebrating`}
                    group={group}
                    index={index}
                    onClick={openModal}
                    variant="large"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Waiting Time Zones */}
          {waitingGroups.length > 0 && (
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-slate-600 dark:from-sky-400 dark:to-slate-400 bg-clip-text text-transparent mb-3">
                    ⏳ Waiting Time Zones
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-base">
                    Time zones waiting more than 1 hour
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scrollContainer("left", waitingScrollRef)}
                    className="rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-sky-200/50 dark:border-sky-500/20 hover:border-sky-400/60 dark:hover:border-sky-400/50"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scrollContainer("right", waitingScrollRef)}
                    className="rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-sky-200/50 dark:border-sky-500/20 hover:border-sky-400/60 dark:hover:border-sky-400/50"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              <div
                ref={waitingScrollRef}
                className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide"
                style={{ scrollBehavior: "smooth" }}
              >
                {waitingGroups.map((group, index) => (
                  <TimezoneCard
                    key={`${group.gmtOffset}-waiting`}
                    group={group}
                    index={index}
                    onClick={openModal}
                    variant="small"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <TimezoneModal
        selectedTimeZone={selectedTimeZone}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.9);
          }
          to { 
            opacity: 1; 
            transform: scale(1);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }

        .animate-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  );
}
