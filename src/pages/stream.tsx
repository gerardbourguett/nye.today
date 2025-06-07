import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Flag from "@/components/flag";
import {
  Play,
  Users,
  Clock,
  Calendar,
  ExternalLink,
  MessageCircle,
  Star,
  Globe,
  Anchor,
  Compass,
  Eye,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Trophy,
  MapPin,
} from "lucide-react";

// Interface for previous years' recaps
interface YearRecap {
  year: number;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  highlights: string[];
  videoUrl: string;
}

// Interface for coverage schedule
interface CoverageSchedule {
  country: string;
  flagCode: string;
  timezone: string;
  localTime: string;
  coverageTime: string;
  status: "completed" | "live" | "upcoming";
}

export default function Stream() {
  const [isLive, setIsLive] = useState(true);
  const [viewerCount, setViewerCount] = useState(2847);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  // Official Twitch channel (configurable by admin)
  const twitchChannel = "vanderfondi"; // Change to real channel

  // Previous years' recaps
  const yearRecaps: YearRecap[] = [
    {
      year: 2025,
      title: "New Year 2025: The Complete World Journey",
      thumbnail:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
      duration: "2:45:30",
      views: "156K",
      highlights: [
        "Spectacular Auckland",
        "Sydney Harbour Bridge",
        "Tokyo Sky Tree",
        "London Big Ben",
      ],
      videoUrl: "https://youtube.com/watch?v=ejemplo2025",
    },
    {
      year: 2024,
      title: "New Year 2024 Special: Around the World",
      thumbnail:
        "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400&h=300&fit=crop",
      duration: "3:12:15",
      views: "234K",
      highlights: [
        "Dubai Burj Khalifa",
        "Paris Eiffel Tower",
        "New York Times Square",
        "Rio de Janeiro",
      ],
      videoUrl: "https://youtube.com/watch?v=ejemplo2024",
    },
    {
      year: 2023,
      title: "New Year 2023: Global Celebrations",
      thumbnail:
        "https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?w=400&h=300&fit=crop",
      duration: "2:58:45",
      views: "189K",
      highlights: [
        "Singapore Marina Bay",
        "Barcelona",
        "Los Angeles",
        "Hawaii",
      ],
      videoUrl: "https://youtube.com/watch?v=ejemplo2023",
    },
  ]; // 2026 Coverage schedule
  const coverageSchedule: CoverageSchedule[] = [
    {
      country: "New Zealand",
      flagCode: "NZ",
      timezone: "UTC+13",
      localTime: "00:00",
      coverageTime: "11:00 AM",
      status: "completed",
    },
    {
      country: "Australia",
      flagCode: "AU",
      timezone: "UTC+11",
      localTime: "00:00",
      coverageTime: "1:00 PM",
      status: "completed",
    },
    {
      country: "Japan",
      flagCode: "JP",
      timezone: "UTC+9",
      localTime: "00:00",
      coverageTime: "3:00 PM",
      status: "completed",
    },
    {
      country: "China",
      flagCode: "CN",
      timezone: "UTC+8",
      localTime: "00:00",
      coverageTime: "4:00 PM",
      status: "live",
    },
    {
      country: "Thailand",
      flagCode: "TH",
      timezone: "UTC+7",
      localTime: "00:00",
      coverageTime: "5:00 PM",
      status: "upcoming",
    },
    {
      country: "India",
      flagCode: "IN",
      timezone: "UTC+5:30",
      localTime: "00:00",
      coverageTime: "6:30 PM",
      status: "upcoming",
    },
    {
      country: "United Arab Emirates",
      flagCode: "AE",
      timezone: "UTC+4",
      localTime: "00:00",
      coverageTime: "8:00 PM",
      status: "upcoming",
    },
    {
      country: "Germany",
      flagCode: "DE",
      timezone: "UTC+1",
      localTime: "00:00",
      coverageTime: "11:00 PM",
      status: "upcoming",
    },
    {
      country: "United Kingdom",
      flagCode: "GB",
      timezone: "UTC+0",
      localTime: "00:00",
      coverageTime: "12:00 AM",
      status: "upcoming",
    },
    {
      country: "Brazil",
      flagCode: "BR",
      timezone: "UTC-3",
      localTime: "00:00",
      coverageTime: "3:00 AM",
      status: "upcoming",
    },
    {
      country: "United States (East)",
      flagCode: "US",
      timezone: "UTC-5",
      localTime: "00:00",
      coverageTime: "5:00 AM",
      status: "upcoming",
    },
    {
      country: "Mexico",
      flagCode: "MX",
      timezone: "UTC-6",
      localTime: "00:00",
      coverageTime: "6:00 AM",
      status: "upcoming",
    },
  ];
  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate viewer count changes
      setViewerCount((prev) => prev + Math.floor(Math.random() * 20 - 10));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: CoverageSchedule["status"]) => {
    switch (status) {
      case "completed":
        return "text-gray-500";
      case "live":
        return "text-red-500";
      case "upcoming":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusText = (status: CoverageSchedule["status"]) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "live":
        return "LIVE";
      case "upcoming":
        return "Upcoming";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Maritime background effects */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl animate-bounce">
          ⚓
        </div>
        <div className="absolute top-20 right-20 text-4xl animate-pulse">
          🧭
        </div>
        <div className="absolute bottom-20 left-20 text-5xl animate-pulse">
          ⛵
        </div>
        <div className="absolute bottom-10 right-10 text-3xl animate-bounce">
          🗺️
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            🏴‍☠️ #BYE2025 🏴‍☠️
          </h1>
          <p className="text-xl md:text-2xl text-blue-300 mb-2">
            Special Coverage: New Year Around the World
          </p>
          <div className="flex items-center justify-center gap-4 text-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span>LIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span>{viewerCount.toLocaleString()} viewers</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </motion.div>{" "}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stream */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-black rounded-xl overflow-hidden shadow-2xl"
            >
              {/* Twitch Player */}
              <div className="relative aspect-video">
                {isLive ? (
                  <iframe
                    src={`https://player.twitch.tv/?channel=${twitchChannel}&parent=localhost&autoplay=false&muted=${isMuted}`}
                    className="w-full h-full"
                    allowFullScreen
                    title="Live stream"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                      <h3 className="text-xl font-semibold mb-2">
                        Stream unavailable
                      </h3>
                      <p className="text-gray-400">
                        The stream will start soon
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Stream controls */}
              <div className="bg-slate-900 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                  <span className="text-sm text-gray-400">
                    {isMuted ? "Muted" : "With audio"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://twitch.tv/${twitchChannel}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Watch on Twitch
                  </a>
                </div>
              </div>
            </motion.div>{" "}
            {/* Special Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Anchor className="w-6 h-6 text-yellow-400" />
                New Year 2026 Special
              </h2>
              <p className="text-gray-300 mb-4">
                Join us on an epic journey around the world following the New
                Year 2026 celebrations. From New Zealand to Mexico, we'll cover
                live the best fireworks, traditions and unique moments from each
                country.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-slate-700 rounded-lg p-3">
                  <Globe className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                  <div className="text-sm text-gray-400">Countries</div>
                  <div className="font-bold">12+</div>
                </div>
                <div className="bg-slate-700 rounded-lg p-3">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-green-400" />
                  <div className="text-sm text-gray-400">Duration</div>
                  <div className="font-bold">18h</div>
                </div>
                <div className="bg-slate-700 rounded-lg p-3">
                  <Star className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                  <div className="text-sm text-gray-400">Specials</div>
                  <div className="font-bold">25+</div>
                </div>
                <div className="bg-slate-700 rounded-lg p-3">
                  <Users className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                  <div className="text-sm text-gray-400">Community</div>
                  <div className="font-bold">Global</div>
                </div>
              </div>
            </motion.div>
          </div>{" "}
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Coverage Schedule */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                Coverage Schedule
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {coverageSchedule.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      item.status === "live"
                        ? "bg-red-500/20 border border-red-500/30"
                        : "bg-slate-700/50"
                    }`}
                  >
                    <Flag code={item.flagCode} />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.country}</div>
                      <div className="text-sm text-gray-400">
                        {item.coverageTime}
                      </div>
                    </div>
                    <div
                      className={`text-xs font-bold ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {getStatusText(item.status)}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>{" "}
            {/* Integrated chat (simulated) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-400" />
                Community Chat
              </h3>
              <div className="space-y-2 text-sm h-48 overflow-y-auto">
                <div className="p-2 bg-slate-700 rounded">
                  <span className="font-semibold text-blue-400">
                    Captain_2026:
                  </span>{" "}
                  Amazing fireworks in Sydney! 🎆
                </div>
                <div className="p-2 bg-slate-700 rounded">
                  <span className="font-semibold text-green-400">
                    Global_Sailor:
                  </span>{" "}
                  What time do you cover Spain?
                </div>
                <div className="p-2 bg-slate-700 rounded">
                  <span className="font-semibold text-purple-400">
                    NYE_Explorer:
                  </span>{" "}
                  This stream is epic 🔥
                </div>
              </div>
              <div className="mt-4">
                <a
                  href={`https://twitch.tv/${twitchChannel}/chat`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Join Chat
                </a>
              </div>
            </motion.div>
          </div>
        </div>{" "}
        {/* Previous Years' Recaps */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            Previous Years' Recaps
            <Trophy className="w-8 h-8 text-yellow-400" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {yearRecaps.map((recap, index) => (
              <motion.div
                key={recap.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() =>
                  setSelectedYear(
                    selectedYear === recap.year ? null : recap.year
                  )
                }
              >
                <div className="relative">
                  <img
                    src={recap.thumbnail}
                    alt={recap.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-sm">
                    {recap.duration}
                  </div>
                  <div className="absolute bottom-2 left-2 bg-red-600 px-2 py-1 rounded text-sm font-bold">
                    {recap.year}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">
                    {recap.title}
                  </h3>{" "}
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {recap.views} views
                    </span>
                  </div>
                  <AnimatePresence>
                    {selectedYear === recap.year && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-slate-600 pt-3"
                      >
                        <h4 className="font-semibold text-sm mb-2">
                          Highlights:
                        </h4>
                        <ul className="text-sm text-gray-300 space-y-1 mb-3">
                          {recap.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <Star className="w-3 h-3 text-yellow-400" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                        <a
                          href={recap.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Play className="w-4 h-4" />
                          Watch on YouTube
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>{" "}
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center bg-gradient-to-r from-blue-800/50 to-purple-800/50 backdrop-blur-sm rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold mb-4">Don't miss a moment!</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Follow us on our social networks and activate notifications so you
            don't miss any New Year celebration around the world.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://twitch.tv/${twitchChannel}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Follow on Twitch
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <Play className="w-5 h-5" />
              Subscribe on YouTube
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
