import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  Clock,
  Users,
  Eye,
  Heart,
  Share2,
  Volume2,
  VolumeX,
  Maximize2,
  ExternalLink,
} from "lucide-react";
import supabase from "@/utils/supabase";
import type { TimeZoneReduced } from "@/types/types";

gsap.registerPlugin(ScrollTrigger);

interface StreamData {
  id: string;
  countryName: string;
  countryCode: string;
  zoneName: string;
  gmtOffset: number;
  viewers: number;
  live: boolean;
  streamUrl?: string;
  celebrationStatus?: "not_started" | "live" | "completed";
  timeToMidnight: string;
  streamTitle: string;
  thumbnail: string;
}

// Function to get thumbnail based on country
const getCountryThumbnail = (countryCode: string) => {
  const thumbnails: Record<string, string> = {
    nz: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop",
    au: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop",
    jp: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=225&fit=crop",
    gb: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=225&fit=crop",
    us: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=225&fit=crop",
    br: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=225&fit=crop",
    fr: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=225&fit=crop",
    de: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=225&fit=crop",
    it: "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=400&h=225&fit=crop",
    cl: "https://images.unsplash.com/photo-1544397881-6afe09ba7eb4?w=400&h=225&fit=crop",
  };
  return (
    thumbnails[countryCode.toLowerCase()] ||
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop"
  );
};

// Function to generate stream title
const generateStreamTitle = (
  countryName: string,
  zoneName: string,
  celebrationStatus?: string
) => {
  const cityName = zoneName.split("/")[1] || zoneName;
  if (celebrationStatus === "live") {
    return `🎆 LIVE: ${cityName} New Year Celebration! 🎆`;
  }
  return `📺 ${cityName}, ${countryName} - Countdown to 2026!`;
};

// Function to calculate time to midnight
const calculateTimeToMidnight = (gmtOffset: number) => {
  const now = new Date();
  const currentUTC = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  const localTime = new Date(currentUTC.getTime() + gmtOffset * 1000);
  const midnight = new Date(localTime);
  midnight.setDate(midnight.getDate() + 1);
  midnight.setHours(0, 0, 0, 0);

  const diffMs = midnight.getTime() - localTime.getTime();

  if (diffMs <= 0) {
    return "🎉 CELEBRATING NOW!";
  }

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export default function Carousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedStream, setSelectedStream] = useState<StreamData | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [streams, setStreams] = useState<StreamData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Fetch live streams from Supabase
  useEffect(() => {
    async function fetchLiveStreams() {
      try {
        setLoading(true);
        setError(null);

        const { data: liveStreams, error: supabaseError } = await supabase
          .from("time_zone_reduced")
          .select("*")
          .eq("live", true)
          .order("gmtOffset", { ascending: true });

        if (supabaseError) {
          console.error("Supabase error:", supabaseError);
          setError(supabaseError.message);
          return;
        }

        if (liveStreams) {
          const formattedStreams: StreamData[] = liveStreams.map(
            (stream: TimeZoneReduced) => ({
              id: stream.id.toString(),
              countryName: stream.countryName || "Unknown",
              countryCode: stream.countryCode,
              zoneName: stream.zoneName || "Unknown/Unknown",
              gmtOffset: stream.gmtOffset || 0,
              viewers: Math.floor(Math.random() * 200000) + 10000, // Random viewers for demo
              live: Boolean(stream.live),
              streamUrl: stream.streamUrl,
              celebrationStatus: stream.celebrationStatus,
              timeToMidnight: calculateTimeToMidnight(stream.gmtOffset || 0),
              streamTitle: generateStreamTitle(
                stream.countryName || "Unknown",
                stream.zoneName || "Unknown",
                stream.celebrationStatus
              ),
              thumbnail: getCountryThumbnail(stream.countryCode),
            })
          );

          setStreams(formattedStreams);
          console.log(
            "Successfully loaded live streams:",
            formattedStreams.length
          );
        }
      } catch (err) {
        console.error("Error fetching live streams:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchLiveStreams();

    // Update every 30 seconds to keep times accurate
    const interval = setInterval(fetchLiveStreams, 30000);
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
    const streamCards = containerRef.current?.querySelectorAll(".stream-card");
    if (streamCards) {
      gsap.fromTo(
        streamCards,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Pulse animation for live indicators
    const liveIndicators =
      containerRef.current?.querySelectorAll(".live-indicator");
    if (liveIndicators) {
      gsap.to(liveIndicators, {
        scale: 1.2,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }

    return () => {
      lenisRef.current?.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [streams]);

  const formatViewers = (viewers: number) => {
    if (viewers >= 1000000) return `${(viewers / 1000000).toFixed(1)}M`;
    if (viewers >= 1000) return `${(viewers / 1000).toFixed(1)}K`;
    return viewers.toString();
  };

  const openStreamModal = (stream: StreamData) => {
    setSelectedStream(stream);
    document.body.style.overflow = "hidden";
  };

  const closeStreamModal = () => {
    setSelectedStream(null);
    document.body.style.overflow = "auto";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-sky-200 dark:border-sky-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-800 dark:text-white text-xl font-medium">
            Loading live streams...
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
            Error Loading Streams
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

  if (streams.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-sky-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-sky-500" />
          </div>
          <h2 className="text-slate-800 dark:text-white text-2xl font-bold mb-4">
            No Live Streams
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            There are currently no live New Year celebrations streaming. Check
            back later!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-sky-200/50 dark:border-sky-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-slate-500 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Global New Year
                </h1>
                <p className="text-sky-600 dark:text-sky-300">
                  Live celebrations around the world
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sky-600 dark:text-sky-300">
              <Users className="w-5 h-5" />
              <span className="font-semibold">
                {formatViewers(
                  streams.reduce((acc, stream) => acc + stream.viewers, 0)
                )}{" "}
                viewers
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Streams Grid */}
      <div ref={containerRef} className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {streams.map((stream) => (
            <div
              key={stream.id}
              className="stream-card group cursor-pointer"
              onClick={() => openStreamModal(stream)}
            >
              <div className="relative bg-white/80 dark:bg-slate-800/50 rounded-xl overflow-hidden border border-sky-200/50 dark:border-sky-500/20 hover:border-sky-400/60 dark:hover:border-sky-400/40 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={stream.thumbnail}
                    alt={`${stream.zoneName}, ${stream.countryName}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Live Indicator */}
                  {stream.live && (
                    <div className="absolute top-3 left-3 flex items-center space-x-2">
                      <div className="live-indicator w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        LIVE
                      </span>
                    </div>
                  )}

                  {/* Viewers */}
                  <div className="absolute top-3 right-3 bg-black/70 text-white text-sm px-2 py-1 rounded flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{formatViewers(stream.viewers)}</span>
                  </div>

                  {/* Country Flag */}
                  <div className="absolute bottom-3 left-3">
                    <img
                      src={`/src/assets/flags/4x3/${stream.countryCode.toLowerCase()}.svg`}
                      alt={stream.countryName}
                      className="w-8 h-6 rounded shadow-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </div>

                  {/* Time to Midnight */}
                  <div className="absolute bottom-3 right-3 bg-sky-600/90 text-white text-sm font-mono px-2 py-1 rounded">
                    {stream.timeToMidnight}
                  </div>
                </div>

                {/* Stream Info */}
                <div className="p-4">
                  <h3 className="text-slate-800 dark:text-white font-semibold text-lg mb-2 line-clamp-2">
                    {stream.streamTitle}
                  </h3>
                  <div className="flex items-center justify-between text-sky-600 dark:text-sky-300 text-sm">
                    <div>
                      <p className="font-medium">
                        {stream.zoneName.split("/")[1] || stream.zoneName},{" "}
                        {stream.countryName}
                      </p>
                      <p className="text-xs opacity-75">
                        UTC{stream.gmtOffset >= 0 ? "+" : ""}
                        {Math.round(stream.gmtOffset / 3600)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Heart className="w-4 h-4 hover:text-red-400 transition-colors" />
                      <Share2 className="w-4 h-4 hover:text-green-400 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stream Modal - Simplified without chat */}
      {selectedStream && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Video Player */}
            <div className="relative">
              <img
                src={selectedStream.thumbnail}
                alt={selectedStream.zoneName}
                className="w-full h-64 md:h-96 object-cover"
              />

              {/* Player Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                  <div className="bg-black/50 text-white px-3 py-1 rounded text-sm font-mono">
                    {selectedStream.timeToMidnight}
                  </div>
                  {selectedStream.streamUrl && (
                    <a
                      href={selectedStream.streamUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600/80 text-white px-4 py-2 rounded-full hover:bg-blue-700/80 transition-colors flex items-center space-x-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Watch Live</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={closeStreamModal}
                    className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>

            {/* Stream Info */}
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                    {selectedStream.streamTitle}
                  </h2>
                  <div className="flex items-center space-x-4 text-sky-600 dark:text-sky-300 mb-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src={`/src/assets/flags/4x3/${selectedStream.countryCode.toLowerCase()}.svg`}
                        alt={selectedStream.countryName}
                        className="w-6 h-4 rounded shadow"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                      <span className="font-medium">
                        {selectedStream.zoneName.split("/")[1] ||
                          selectedStream.zoneName}
                        , {selectedStream.countryName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>
                        {formatViewers(selectedStream.viewers)} viewers
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                    <span>
                      UTC{selectedStream.gmtOffset >= 0 ? "+" : ""}
                      {Math.round(selectedStream.gmtOffset / 3600)}
                    </span>
                    <span>•</span>
                    <span className="capitalize">
                      {selectedStream.celebrationStatus?.replace("_", " ")}
                    </span>
                  </div>
                </div>

                {selectedStream.live && (
                  <div className="flex items-center space-x-2 bg-red-500 text-white px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold">LIVE</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
