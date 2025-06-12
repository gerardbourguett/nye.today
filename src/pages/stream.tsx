import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
  Maximize2,
  Globe,
  TrendingUp,
  Timer,
  Zap,
  Star,
} from "lucide-react";
import supabase from "@/utils/supabase";
import type { TimeZoneReduced } from "@/types/types";
import { useTimezoneData } from "@/components/road-to-2026/use-timezone-data";

gsap.registerPlugin(ScrollTrigger);

interface TwitchStream {
  channel: string;
  title: string;
  viewers: number;
  isLive: boolean;
  category: string;
  language: string;
}

const vanderfondiStream: TwitchStream = {
  channel: "vanderfondi",
  title: "New Year Celebrations Around the World! 🌍🎆",
  viewers: 2500,
  isLive: true,
  category: "Just Chatting",
  language: "English",
};

export default function Stream() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [timezones, setTimezones] = useState<TimeZoneReduced[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Use the same timezone data hook as road-to-2026
  const { timeZoneGroups } = useTimezoneData(timezones);

  // Get only upcoming celebrations for the sidebar
  const upcomingCelebrations = timeZoneGroups
    .filter((group) => group.status === "upcoming")
    .slice(0, 6); // Limit to 6 for better display

  // Fetch timezone data from Supabase
  useEffect(() => {
    async function fetchTimezones() {
      try {
        setLoading(true);
        setError(null);

        const { data: timezoneData, error: supabaseError } = await supabase
          .from("time_zone_reduced")
          .select("*")
          .order("gmtOffset", { ascending: true });

        if (supabaseError) {
          console.error("Supabase error:", supabaseError);
          setError(supabaseError.message);
          return;
        }

        if (timezoneData) {
          setTimezones(timezoneData as TimeZoneReduced[]);
          console.log("Successfully loaded timezones:", timezoneData.length);
        }
      } catch (err) {
        console.error("Error fetching timezones:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchTimezones();

    // Update every minute to keep times accurate
    const interval = setInterval(fetchTimezones, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP Animations
    const tl = gsap.timeline();

    // Header animation
    tl.fromTo(
      ".stream-header",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Player animation
    tl.fromTo(
      ".twitch-player",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

    // Statistics animation
    const statCards = statsRef.current?.querySelectorAll(".stat-card");
    if (statCards) {
      gsap.fromTo(
        statCards,
        { opacity: 0, y: 50, rotationX: -15 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Progress bar animation
    const progressBars = document.querySelectorAll(".progress-bar");
    progressBars.forEach((bar, index) => {
      const progress = upcomingCelebrations[index]?.progress || 0;
      gsap.to(bar, {
        width: `${progress}%`,
        duration: 1.5,
        ease: "power2.out",
        delay: index * 0.1,
        scrollTrigger: {
          trigger: bar,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => {
      lenisRef.current?.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [upcomingCelebrations]);

  const formatViewers = (viewers: number) => {
    if (viewers >= 1000000) return `${(viewers / 1000000).toFixed(1)}M`;
    if (viewers >= 1000) return `${(viewers / 1000).toFixed(1)}K`;
    return viewers.toString();
  };

  const formatPopulation = (population: number) => {
    if (population >= 1000000) return `${(population / 1000000).toFixed(0)}M`;
    if (population >= 1000) return `${(population / 1000).toFixed(0)}K`;
    return population.toString();
  };

  // Calculate total viewers from all celebrating and upcoming zones
  const totalViewers = timeZoneGroups
    .filter(
      (group) => group.status === "celebrating" || group.status === "upcoming"
    )
    .reduce(
      (acc, group) => acc + (Math.floor(Math.random() * 50000) + 10000),
      0
    );

  // Count live celebrations
  const liveCount = timeZoneGroups.filter(
    (group) => group.status === "celebrating"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-sky-200 dark:border-sky-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-800 dark:text-white text-xl font-medium">
            Loading stream data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 text-red-500">⚠️</div>
          </div>
          <h2 className="text-red-600 dark:text-red-400 text-2xl font-bold mb-4">
            Error Loading Data
          </h2>
          <p className="text-red-500 dark:text-red-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const selectedCountry =
    upcomingCelebrations[selectedCountryIndex] || upcomingCelebrations[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="stream-header sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-sky-200/50 dark:border-sky-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-slate-500 rounded-xl flex items-center justify-center">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
                  Global Stream
                </h1>
                <p className="text-sky-600 dark:text-sky-300">
                  Live New Year celebrations
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sky-600 dark:text-sky-300">
                <Eye className="w-5 h-5" />
                <span className="font-semibold">
                  {formatViewers(totalViewers)} viewers
                </span>
              </div>
              <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">{liveCount} live</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Stream Player */}
          <div className="xl:col-span-2">
            <div className="twitch-player bg-white/80 dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-sky-200/50 dark:border-sky-500/20 backdrop-blur-sm">
              {/* Stream Header */}
              <div className="p-4 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">V</span>
                    </div>
                    <div>
                      <h2 className="text-slate-800 dark:text-white font-bold text-lg">
                        vanderfondi
                      </h2>
                      <p className="text-sky-600 dark:text-sky-300 text-sm">
                        {vanderfondiStream.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {vanderfondiStream.isLive && (
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          LIVE
                        </span>
                      </div>
                    )}
                    <div className="bg-black/50 text-white text-sm px-3 py-1 rounded flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{formatViewers(vanderfondiStream.viewers)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Twitch Embed */}
              <div className="relative aspect-video bg-gradient-to-br from-slate-100/50 to-sky-100/50 dark:from-slate-800/50 dark:to-slate-700/50">
                {/* Twitch Iframe Embed */}
                <iframe
                  src="https://player.twitch.tv/?channel=vanderfondi&parent=localhost&parent=127.0.0.1&parent=nye.live&autoplay=false&muted=true"
                  className="w-full h-full border-0"
                  allowFullScreen
                  title="vanderfondi Twitch Stream"
                ></iframe>

                {/* Overlay Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors pointer-events-auto"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>
                    <div className="bg-black/50 text-white px-4 py-2 rounded-lg text-sm font-mono">
                      {selectedCountry?.timeToMidnight || "Loading..."}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors pointer-events-auto"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Stream Info */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-red-400 hover:text-red-300 cursor-pointer transition-colors" />
                      <span className="text-slate-800 dark:text-white text-sm">
                        1.2K
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-5 h-5 text-sky-400 hover:text-sky-300 cursor-pointer transition-colors" />
                      <span className="text-slate-800 dark:text-white text-sm">
                        Chat
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Share2 className="w-5 h-5 text-green-400 hover:text-green-300 cursor-pointer transition-colors" />
                      <span className="text-slate-800 dark:text-white text-sm">
                        Share
                      </span>
                    </div>
                  </div>
                  <div className="text-sky-600 dark:text-sky-300 text-sm">
                    Category: {vanderfondiStream.category} •{" "}
                    {vanderfondiStream.language}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Sidebar */}
          <div className="xl:col-span-1">
            <div className="bg-white/80 dark:bg-slate-800/50 rounded-2xl border border-sky-200/50 dark:border-sky-500/20 overflow-hidden backdrop-blur-sm">
              <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                  <h3 className="text-slate-800 dark:text-white font-bold text-xl">
                    Next Celebrations
                  </h3>
                </div>
                <p className="text-sky-600 dark:text-sky-300 text-sm">
                  Time zones within 1 hour of midnight
                </p>
              </div>

              <div
                ref={statsRef}
                className="p-4 space-y-4 max-h-[600px] overflow-y-auto"
              >
                {upcomingCelebrations.length > 0 ? (
                  upcomingCelebrations.map((group, index) => {
                    const primaryCountry = group.countries[0];
                    if (!primaryCountry) return null;

                    return (
                      <div
                        key={`${group.gmtOffset}-${index}`}
                        className={`stat-card p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                          selectedCountryIndex === index
                            ? "bg-amber-100 dark:bg-amber-600/20 border-amber-400/50"
                            : "bg-slate-50 dark:bg-slate-700/30 border-slate-200 dark:border-slate-600/30 hover:border-amber-400/50 dark:hover:border-amber-500/30"
                        }`}
                        onClick={() => setSelectedCountryIndex(index)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <img
                                src={`/src/assets/flags/4x3/${primaryCountry.countryCode.toLowerCase()}.svg`}
                                alt={primaryCountry.countryName}
                                className="w-8 h-6 rounded shadow-lg"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = "none";
                                }}
                              />
                              {index === 0 && (
                                <Star className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 fill-current" />
                              )}
                            </div>
                            <div>
                              <h4 className="text-slate-800 dark:text-white font-semibold text-sm">
                                {primaryCountry.zoneName?.split("/")[1] ||
                                  primaryCountry.zoneName}
                              </h4>
                              <p className="text-slate-500 dark:text-slate-400 text-xs">
                                {primaryCountry.countryName}
                              </p>
                            </div>
                          </div>
                          <div className="px-2 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-600 dark:text-amber-400">
                            ⏰ Next
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                              <Timer className="w-4 h-4" />
                              <span>{group.timeToMidnight}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-amber-600 dark:text-amber-300">
                              <Eye className="w-4 h-4" />
                              <span>
                                {formatViewers(
                                  Math.floor(Math.random() * 50000) + 10000
                                )}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                            <span>{group.gmtOffsetDisplay}</span>
                            <span>
                              {group.countries.length}{" "}
                              {group.countries.length === 1 ? "zone" : "zones"}
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full bg-slate-200/50 dark:bg-slate-600/50 rounded-full h-2 overflow-hidden">
                            <div
                              className="progress-bar h-full bg-gradient-to-r from-amber-500 to-sky-500 rounded-full transition-all duration-300"
                              style={{ width: "0%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <Timer className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400">
                      No upcoming celebrations found
                    </p>
                    <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">
                      All time zones are either celebrating or waiting
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
