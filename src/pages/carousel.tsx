import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Flag from "@/components/flag";
import {
  Search,
  Clock,
  Globe,
  Star,
  Play,
  Eye,
  MapPin,
  Settings,
  Save,
  X,
  Edit,
  ExternalLink,
} from "lucide-react";

// Types for streams
interface CountryStream {
  id: string;
  name: string;
  flagCode: string;
  timezone: string;
  timezoneOffset: number; // Offset in hours from UTC
  region: string;
  viewers: number;
  status: "live" | "upcoming" | "ended";
  timeToNY: string;
  thumbnail: string;
  featured: boolean;
  streamUrl?: string;
  youtubeId?: string;
  twitchChannel?: string;
  nyeTime: string; // Specific celebration time (e.g., "23:59")
}

// Country data with their streams and real time zones (ordered by time zone)
const initialCountryStreams: CountryStream[] = [
  {
    id: "nz",
    name: "New Zealand",
    flagCode: "NZ",
    timezone: "NZDT",
    timezoneOffset: 13, // UTC+13
    region: "Oceania",
    viewers: 15420,
    status: "ended",
    timeToNY: "Already celebrated!",
    thumbnail:
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400&h=300&fit=crop",
    featured: true,
    nyeTime: "00:00",
    youtubeId: "", // To be filled by the administrator
  },
  {
    id: "au",
    name: "Australia",
    flagCode: "AU",
    timezone: "AEDT",
    timezoneOffset: 11, // UTC+11
    region: "Oceania",
    viewers: 28750,
    status: "ended",
    timeToNY: "Already celebrated!",
    thumbnail:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    featured: true,
    nyeTime: "00:00",
    youtubeId: "",
  },
  {
    id: "jp",
    name: "Japan",
    flagCode: "JP",
    timezone: "JST",
    timezoneOffset: 9, // UTC+9
    region: "Asia",
    viewers: 45680,
    status: "ended",
    timeToNY: "Already celebrated!",
    thumbnail:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=300&fit=crop",
    featured: true,
    nyeTime: "00:00",
    youtubeId: "",
  },
  {
    id: "kr",
    name: "South Korea",
    flagCode: "KR",
    timezone: "KST",
    timezoneOffset: 9, // UTC+9
    region: "Asia",
    viewers: 32100,
    status: "ended",
    timeToNY: "Already celebrated!",
    thumbnail:
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&h=300&fit=crop",
    featured: false,
    nyeTime: "00:00",
    youtubeId: "",
  },
  {
    id: "cn",
    name: "China",
    flagCode: "CN",
    timezone: "CST",
    timezoneOffset: 8, // UTC+8
    region: "Asia",
    viewers: 89230,
    status: "ended",
    timeToNY: "Already celebrated!",
    thumbnail:
      "https://images.unsplash.com/photo-1537196299481-8cc297ad4c94?w=400&h=300&fit=crop",
    featured: true,
    nyeTime: "00:00",
    youtubeId: "",
  },
  {
    id: "in",
    name: "India",
    flagCode: "IN",
    timezone: "IST",
    timezoneOffset: 5.5, // UTC+5:30
    region: "Asia",
    viewers: 67890,
    status: "ended",
    timeToNY: "Already celebrated!",
    thumbnail:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop",
    featured: false,
    nyeTime: "00:00",
    youtubeId: "",
  },
  {
    id: "ae",
    name: "UAE",
    flagCode: "AE",
    timezone: "GST",
    timezoneOffset: 4, // UTC+4
    region: "Asia",
    viewers: 23450,
    status: "ended",
    timeToNY: "Already celebrated!",
    thumbnail:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
    featured: false,
    nyeTime: "00:00",
    youtubeId: "",
  },
  {
    id: "ru",
    name: "Russia",
    flagCode: "RU",
    timezone: "MSK",
    timezoneOffset: 3, // UTC+3
    region: "Europe",
    viewers: 78920,
    status: "ended",
    timeToNY: "Already celebrated!",
    thumbnail:
      "https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=400&h=300&fit=crop",
    featured: true,
    nyeTime: "00:00",
    youtubeId: "",
  },
  {
    id: "de",
    name: "Germany",
    flagCode: "DE",
    timezone: "CET",
    timezoneOffset: 1, // UTC+1
    region: "Europe",
    viewers: 45670,
    status: "ended",
    timeToNY: "Already celebrated!",
    thumbnail:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop",
    featured: false,
    nyeTime: "00:00",
    youtubeId: "",
  },
  {
    id: "fr",
    name: "France",
    flagCode: "FR",
    timezone: "CET",
    timezoneOffset: 1, // UTC+1
    region: "Europe",
    viewers: 56780,
    status: "ended",
    timeToNY: "Already celebrated!",
    thumbnail:
      "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop",
    featured: true,
    nyeTime: "00:00",
    youtubeId: "",
  },
  {
    id: "gb",
    name: "United Kingdom",
    flagCode: "GB",
    timezone: "GMT",
    timezoneOffset: 0, // UTC+0
    region: "Europe",
    viewers: 67890,
    status: "ended",
    timeToNY: "Already celebrated!",
    thumbnail:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop",
    featured: true,
    nyeTime: "00:00",
    youtubeId: "",
  },
  {
    id: "us",
    name: "United States",
    flagCode: "US",
    timezone: "EST",
    timezoneOffset: -5, // UTC-5
    region: "Americas",
    viewers: 156780,
    status: "upcoming",
    timeToNY: "7h 30m",
    thumbnail:
      "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&h=300&fit=crop",
    featured: true,
    nyeTime: "00:00",
    youtubeId: "",
  },
  {
    id: "br",
    name: "Brazil",
    flagCode: "BR",
    timezone: "BRT",
    timezoneOffset: -3, // UTC-3
    region: "Americas",
    viewers: 89450,
    status: "upcoming",
    timeToNY: "9h 45m",
    thumbnail:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=300&fit=crop",
    featured: true,
    nyeTime: "00:00",
    youtubeId: "",
  },
  {
    id: "mx",
    name: "Mexico",
    flagCode: "MX",
    timezone: "CST",
    timezoneOffset: -6, // UTC-6
    region: "Americas",
    viewers: 45230,
    status: "upcoming",
    timeToNY: "12h 15m",
    thumbnail:
      "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=400&h=300&fit=crop",
    featured: false,
    nyeTime: "00:00",
    youtubeId: "",
  },
];

export default function Carousel() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedStream, setSelectedStream] = useState<CountryStream | null>(
    null
  );
  const [countryStreams, setCountryStreams] = useState<CountryStream[]>(
    initialCountryStreams
  );
  const [filteredStreams, setFilteredStreams] = useState<CountryStream[]>(
    initialCountryStreams
  );
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [editingStream, setEditingStream] = useState<CountryStream | null>(
    null
  );
  const [tempUrl, setTempUrl] = useState("");
  const regions = ["All", "Americas", "Europe", "Asia", "Oceania"];

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      updateStreamsStatus();
    }, 60000); // Update every minute

    // Update immediately when mounting
    updateStreamsStatus();
    return () => clearInterval(timer);
  }, []);

  // Load saved URLs from localStorage
  useEffect(() => {
    const savedUrls = localStorage.getItem("nye-stream-urls");
    if (savedUrls) {
      try {
        const parsedUrls = JSON.parse(savedUrls);
        const updatedStreams = countryStreams.map((stream) => ({
          ...stream,
          streamUrl: parsedUrls[stream.id] || stream.streamUrl,
          youtubeId: parsedUrls[stream.id]
            ? getYouTubeId(parsedUrls[stream.id]) || undefined
            : stream.youtubeId,
        }));
        setCountryStreams(updatedStreams);
      } catch (error) {
        console.error("Error loading saved URLs:", error);
      }
    }
  }, []);

  // Function to calculate each country's status in real time
  const calculateStreamStatus = (stream: CountryStream): CountryStream => {
    const now = new Date();

    // For testing, we use 2025 as the target year
    const targetYear = 2025;
    const nyeDate = new Date(`${targetYear}-12-31T23:59:59.000Z`);

    // Adjust for the country's time zone
    const countryTime = new Date(
      now.getTime() + stream.timezoneOffset * 60 * 60 * 1000
    );
    const countryNYE = new Date(
      nyeDate.getTime() + stream.timezoneOffset * 60 * 60 * 1000
    );

    // Calculate difference in milliseconds
    const timeDiff = countryNYE.getTime() - countryTime.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    let status: "live" | "upcoming" | "ended";
    let timeToNY: string;

    if (hoursDiff < -1) {
      // More than 1 hour after midnight
      status = "ended";
      timeToNY = "Already celebrated! 🎉";
    } else if (hoursDiff >= -1 && hoursDiff <= 0.5) {
      // Between 1 hour before and 30 minutes after midnight
      status = "live";
      timeToNY = "CELEBRATING NOW! 🎆";
    } else {
      // Time remaining until midnight
      status = "upcoming";

      const days = Math.floor(hoursDiff / 24);
      const hours = Math.floor(hoursDiff % 24);
      const minutes = Math.floor((hoursDiff % 1) * 60);

      if (days > 0) {
        timeToNY = `${days}d ${hours}h ${minutes}m`;
      } else if (hours > 0) {
        timeToNY = `${hours}h ${minutes}m`;
      } else {
        timeToNY = `${minutes}m`;
      }
    }

    return {
      ...stream,
      status,
      timeToNY,
    };
  };

  // Update all stream statuses
  const updateStreamsStatus = () => {
    const updated = countryStreams.map(calculateStreamStatus);
    setCountryStreams(updated);
    filterStreams(updated, searchTerm, selectedRegion);
  };
  // Extract YouTube ID from a URL
  const getYouTubeId = (url: string): string | null => {
    if (!url) return null;
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/live\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };
  // Create YouTube embed URL
  const getYouTubeEmbedUrl = (stream: CountryStream): string | null => {
    if (!stream.youtubeId) return null;
    return `https://www.youtube.com/embed/${stream.youtubeId}?autoplay=1&mute=1`;
  };
  // Update stream URL
  const updateStreamUrl = (streamId: string, newUrl: string) => {
    const youtubeId = getYouTubeId(newUrl);

    const updatedStreams = countryStreams.map((stream) =>
      stream.id === streamId
        ? { ...stream, streamUrl: newUrl, youtubeId: youtubeId || "" }
        : stream
    );
    setCountryStreams(updatedStreams);

    // Save to localStorage
    const urlsToSave = updatedStreams.reduce((acc, stream) => {
      if (stream.streamUrl) {
        acc[stream.id] = stream.streamUrl;
      }
      return acc;
    }, {} as Record<string, string>);
    localStorage.setItem("nye-stream-urls", JSON.stringify(urlsToSave));
  };

  // Handle URL saving
  const handleSaveUrl = () => {
    if (editingStream && tempUrl.trim()) {
      updateStreamUrl(editingStream.id, tempUrl.trim());
      setEditingStream(null);
      setTempUrl("");
    }
  };

  // Filter streams
  const filterStreams = (
    streams: CountryStream[],
    search: string,
    region: string
  ) => {
    let filtered = streams;

    if (search) {
      filtered = filtered.filter((stream) =>
        stream.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (region !== "All") {
      filtered = filtered.filter((stream) => stream.region === region);
    } // Sort by status and then by viewers
    const statusOrder = { live: 0, upcoming: 1, ended: 2 };
    filtered.sort((a, b) => {
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return b.viewers - a.viewers;
    });

    setFilteredStreams(filtered);
  };
  // Effects for filtering
  useEffect(() => {
    filterStreams(countryStreams, searchTerm, selectedRegion);
  }, [searchTerm, selectedRegion, countryStreams]);
  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-500";
      case "upcoming":
        return "bg-yellow-500";
      case "ended":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "live":
        return "LIVE";
      case "upcoming":
        return "UPCOMING";
      case "ended":
        return "ENDED";
      default:
        return "UNKNOWN";
    }
  };

  const formatViewers = (viewers: number) => {
    if (viewers >= 1000000) {
      return `${(viewers / 1000000).toFixed(1)}M`;
    } else if (viewers >= 1000) {
      return `${(viewers / 1000).toFixed(1)}K`;
    }
    return viewers.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            🎆 New Year Around the World 🎆
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Follow the wave of New Year celebrations as they travel across the
            globe! Watch live streams from different countries as they welcome
            2026.
          </motion.p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex gap-2">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedRegion === region
                    ? "bg-purple-600 text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Admin Toggle */}
          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`p-3 rounded-lg transition-all ${
              isAdminMode
                ? "bg-green-600 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
            title="Admin Mode"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Info Panel */}
        {isAdminMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 bg-blue-900/30 border border-blue-500/30 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-blue-300">Admin Mode Active</h3>
            </div>
            <p className="text-blue-200 text-sm">
              Click the edit button on any stream card to add or update YouTube
              URLs for real-time streams. URLs are automatically saved to your
              browser's local storage.
            </p>
          </motion.div>
        )}

        {/* Real-time Status Bar */}
        <motion.div
          className="mb-6 bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 font-medium">
                  {filteredStreams.filter((s) => s.status === "live").length}{" "}
                  Live Now
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-medium">
                  {
                    filteredStreams.filter((s) => s.status === "upcoming")
                      .length
                  }{" "}
                  Upcoming
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 font-medium">
                  {filteredStreams.filter((s) => s.status === "ended").length}{" "}
                  Celebrated
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Last Updated</div>
              <div className="text-purple-400 font-mono text-sm">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Streams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStreams.map((stream) => (
            <motion.div
              key={stream.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`relative bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all cursor-pointer group ${
                stream.featured ? "ring-2 ring-yellow-500" : ""
              }`}
              onClick={() => setSelectedStream(stream)}
            >
              {/* Status Badge */}
              <div className="absolute top-3 left-3 z-10">
                <div
                  className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(
                    stream.status
                  )} text-white flex items-center gap-1`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      stream.status === "live"
                        ? "animate-pulse bg-white"
                        : "bg-white/70"
                    }`}
                  />
                  {getStatusText(stream.status)}
                </div>
              </div>
              {/* Featured Badge */}
              {stream.featured && (
                <div className="absolute top-3 right-3 z-10">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>
              )}
              {/* Admin Controls */}
              {isAdminMode && (
                <div className="absolute bottom-3 right-3 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingStream(stream);
                      setTempUrl(stream.streamUrl || "");
                    }}
                    className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    title="Edit Stream URL"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              )}
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={stream.thumbnail}
                  alt={stream.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Play Button */}
                {stream.youtubeId && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <Play className="w-8 h-8 text-white fill-current" />
                    </div>
                  </div>
                )}
              </div>
              {/* Content */}{" "}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Flag
                    code={stream.flagCode}
                    size="m"
                    className="rounded shadow-sm"
                  />
                  <h3 className="font-bold text-lg">{stream.name}</h3>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{stream.timezone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{stream.region}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-300">
                    <Eye className="w-4 h-4" />
                    <span>{formatViewers(stream.viewers)}</span>
                  </div>
                  <div
                    className={`font-bold ${
                      stream.status === "live"
                        ? "text-red-400"
                        : stream.status === "upcoming"
                        ? "text-yellow-400"
                        : "text-gray-400"
                    }`}
                  >
                    {stream.timeToNY}
                  </div>
                </div>

                {/* Stream URL Status */}
                {isAdminMode && (
                  <div className="mt-2 pt-2 border-t border-white/20">
                    <div className="flex items-center gap-2 text-xs">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          stream.youtubeId ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <span className="text-gray-400">
                        {stream.youtubeId
                          ? "Stream configured"
                          : "No stream URL"}
                      </span>
                      {stream.streamUrl && (
                        <ExternalLink className="w-3 h-3 text-blue-400" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredStreams.length === 0 && (
          <div className="text-center py-12">
            <Globe className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No streams found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Stream Modal */}
      <AnimatePresence>
        {selectedStream && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStream(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {" "}
              <div className="flex items-center justify-between p-6 border-b border-white/20">
                <div className="flex items-center gap-3">
                  <Flag
                    code={selectedStream.flagCode}
                    size="l"
                    className="rounded shadow-lg"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedStream.name}
                    </h2>
                    <p className="text-gray-400">
                      {selectedStream.timezone} • {selectedStream.timeToNY}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStream(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                {selectedStream.youtubeId ? (
                  <div className="aspect-video mb-4">
                    <iframe
                      src={getYouTubeEmbedUrl(selectedStream) || ""}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                      title={`${selectedStream.name} New Year Stream`}
                    />
                  </div>
                ) : (
                  <div className="aspect-video mb-4 bg-slate-800 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400 text-lg">
                        No stream available yet
                      </p>
                      <p className="text-gray-500 text-sm">Check back later!</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {formatViewers(selectedStream.viewers)}
                    </div>
                    <div className="text-gray-400 text-sm">Viewers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {selectedStream.region}
                    </div>
                    <div className="text-gray-400 text-sm">Region</div>
                  </div>
                  <div className="text-center">
                    <div
                      className={`text-2xl font-bold ${getStatusColor(
                        selectedStream.status
                      ).replace("bg-", "text-")}`}
                    >
                      {getStatusText(selectedStream.status)}
                    </div>
                    <div className="text-gray-400 text-sm">Status</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Stream Modal */}
      <AnimatePresence>
        {editingStream && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setEditingStream(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Edit Stream URL</h3>
                <button
                  onClick={() => setEditingStream(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>{" "}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Flag
                    code={editingStream.flagCode}
                    size="m"
                    className="rounded shadow-sm"
                  />
                  <span className="font-semibold">{editingStream.name}</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Enter a YouTube URL for the New Year celebration stream
                </p>
              </div>
              <div className="mb-6">
                <input
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setEditingStream(null)}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveUrl}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
