import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Flag from "@/components/flag";
import {
  Clock,
  Globe,
  Star,
  MapPin,
  Calendar,
  Trophy,
  Timer,
  Compass,
  Anchor,
  Crown,
  Award,
  Users,
  Eye,
  Play,
  ChevronRight,
  Zap,
} from "lucide-react";

// Interface for countries in the draft
interface CountryDraft {
  id: string;
  position: number; // Position in the draft (1-15+)
  name: string;
  flagCode: string; // 2-letter ISO code for flags
  timezone: string;
  utcOffset: number;
  region: string;
  celebrationTime: string; // Local celebration time
  utcCelebrationTime: string; // UTC celebration time
  status: "completed" | "live" | "upcoming" | "draft";
  timeRemaining?: string;
  population: number;
  capitalCity: string;
  famousLandmark: string;
  previousRanking?: number; // Previous year ranking
  isRising: boolean; // If it rose in popularity
  streamUrl?: string;
  highlights: string[];
}

export default function RoadTo2026() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCountry, setSelectedCountry] = useState<CountryDraft | null>(
    null
  );
  const [draftPhase, setDraftPhase] = useState<
    "upcoming" | "active" | "completed"
  >("upcoming");
  const [currentPick, setCurrentPick] = useState(1);

  // Example draft data (ordered by UTC timezone)
  const draftOrder: CountryDraft[] = [
    {
      id: "nz",
      position: 1,
      name: "New Zealand",
      flagCode: "NZ",
      timezone: "NZDT",
      utcOffset: 13,
      region: "Oceania",
      celebrationTime: "00:00 NZDT",
      utcCelebrationTime: "11:00 UTC (Dec 31)",
      status: "draft",
      population: 5000000,
      capitalCity: "Auckland",
      famousLandmark: "Sky Tower",
      previousRanking: 1,
      isRising: false,
      highlights: [
        "First to celebrate",
        "Iconic Sky Tower",
        "Spectacular fireworks",
      ],
    },
    {
      id: "fj",
      position: 2,
      name: "Fiji",
      flagCode: "FJ",
      timezone: "FJT",
      utcOffset: 12,
      region: "Oceania",
      celebrationTime: "00:00 FJT",
      utcCelebrationTime: "12:00 UTC (Dec 31)",
      status: "draft",
      population: 900000,
      capitalCity: "Suva",
      famousLandmark: "Coral Coast",
      previousRanking: 3,
      isRising: true,
      highlights: [
        "Paradise beach celebration",
        "Pacific traditions",
        "Fireworks over coral",
      ],
    },
    {
      id: "au",
      position: 3,
      name: "Australia",
      flagCode: "AU",
      timezone: "AEDT",
      utcOffset: 11,
      region: "Oceania",
      celebrationTime: "00:00 AEDT",
      utcCelebrationTime: "13:00 UTC (Dec 31)",
      status: "draft",
      population: 25700000,
      capitalCity: "Sydney",
      famousLandmark: "Harbour Bridge",
      previousRanking: 2,
      isRising: false,
      highlights: [
        "Iconic Harbour Bridge",
        "Opera House",
        "Massive celebration",
      ],
    },
    {
      id: "jp",
      position: 4,
      name: "Japan",
      flagCode: "JP",
      timezone: "JST",
      utcOffset: 9,
      region: "Asia",
      celebrationTime: "00:00 JST",
      utcCelebrationTime: "15:00 UTC (Dec 31)",
      status: "draft",
      population: 125800000,
      capitalCity: "Tokyo",
      famousLandmark: "Tokyo Skytree",
      previousRanking: 4,
      isRising: false,
      highlights: [
        "Traditional temples",
        "Tokyo Skytree",
        "Ancient ceremonies",
      ],
    },
    {
      id: "cn",
      position: 5,
      name: "China",
      flagCode: "CN",
      timezone: "CST",
      utcOffset: 8,
      region: "Asia",
      celebrationTime: "00:00 CST",
      utcCelebrationTime: "16:00 UTC (Dec 31)",
      status: "draft",
      population: 1440000000,
      capitalCity: "Beijing",
      famousLandmark: "Forbidden City",
      previousRanking: 5,
      isRising: false,
      highlights: [
        "World's largest population",
        "Forbidden City",
        "Millenary traditions",
      ],
    },
    {
      id: "th",
      position: 6,
      name: "Thailand",
      flagCode: "TH",
      timezone: "ICT",
      utcOffset: 7,
      region: "Asia",
      celebrationTime: "00:00 ICT",
      utcCelebrationTime: "17:00 UTC (Dec 31)",
      status: "draft",
      population: 69800000,
      capitalCity: "Bangkok",
      famousLandmark: "Wat Pho",
      previousRanking: 8,
      isRising: true,
      highlights: ["Golden temples", "Bangkok celebration", "Vibrant culture"],
    },
    {
      id: "in",
      position: 7,
      name: "India",
      flagCode: "IN",
      timezone: "IST",
      utcOffset: 5.5,
      region: "Asia",
      celebrationTime: "00:00 IST",
      utcCelebrationTime: "18:30 UTC (Dec 31)",
      status: "draft",
      population: 1380000000,
      capitalCity: "New Delhi",
      famousLandmark: "Taj Mahal",
      previousRanking: 6,
      isRising: false,
      highlights: [
        "Second largest population",
        "Taj Mahal",
        "Cultural diversity",
      ],
    },
    {
      id: "ae",
      position: 8,
      name: "United Arab Emirates",
      flagCode: "AE",
      timezone: "GST",
      utcOffset: 4,
      region: "Middle East",
      celebrationTime: "00:00 GST",
      utcCelebrationTime: "20:00 UTC (Dec 31)",
      status: "draft",
      population: 9900000,
      capitalCity: "Dubai",
      famousLandmark: "Burj Khalifa",
      previousRanking: 7,
      isRising: false,
      highlights: ["Burj Khalifa", "Light spectacle", "Luxury and modernity"],
    },
    {
      id: "de",
      position: 9,
      name: "Germany",
      flagCode: "DE",
      timezone: "CET",
      utcOffset: 1,
      region: "Europe",
      celebrationTime: "00:00 CET",
      utcCelebrationTime: "23:00 UTC (Dec 31)",
      status: "draft",
      population: 83200000,
      capitalCity: "Berlin",
      famousLandmark: "Brandenburg Gate",
      previousRanking: 9,
      isRising: false,
      highlights: [
        "Brandenburg Gate",
        "European tradition",
        "History and culture",
      ],
    },
    {
      id: "gb",
      position: 10,
      name: "United Kingdom",
      flagCode: "GB",
      timezone: "GMT",
      utcOffset: 0,
      region: "Europe",
      celebrationTime: "00:00 GMT",
      utcCelebrationTime: "00:00 UTC (Jan 1)",
      status: "draft",
      population: 67500000,
      capitalCity: "London",
      famousLandmark: "Big Ben",
      previousRanking: 10,
      isRising: false,
      highlights: ["Iconic Big Ben", "London Eye", "British tradition"],
    },
    {
      id: "br",
      position: 11,
      name: "Brazil",
      flagCode: "BR",
      timezone: "BRT",
      utcOffset: -3,
      region: "South America",
      celebrationTime: "00:00 BRT",
      utcCelebrationTime: "03:00 UTC (Jan 1)",
      status: "draft",
      population: 215300000,
      capitalCity: "Rio de Janeiro",
      famousLandmark: "Christ the Redeemer",
      previousRanking: 11,
      isRising: false,
      highlights: ["Copacabana Beach", "Christ the Redeemer", "Carnival vibes"],
    },
    {
      id: "us",
      position: 12,
      name: "United States (East)",
      flagCode: "US",
      timezone: "EST",
      utcOffset: -5,
      region: "North America",
      celebrationTime: "00:00 EST",
      utcCelebrationTime: "05:00 UTC (Jan 1)",
      status: "draft",
      population: 331900000,
      capitalCity: "New York",
      famousLandmark: "Times Square",
      previousRanking: 12,
      isRising: false,
      highlights: [
        "Times Square Ball Drop",
        "World icon",
        "Greatest spectacle",
      ],
    },
    {
      id: "mx",
      position: 13,
      name: "Mexico",
      flagCode: "MX",
      timezone: "CST",
      utcOffset: -6,
      region: "North America",
      celebrationTime: "00:00 CST",
      utcCelebrationTime: "06:00 UTC (Jan 1)",
      status: "draft",
      population: 128900000,
      capitalCity: "Mexico City",
      famousLandmark: "Zócalo",
      previousRanking: 13,
      isRising: false,
      highlights: ["Historic Zócalo", "Mexican traditions", "Epic finale"],
    },
  ];
  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  // Simulate draft progress
  useEffect(() => {
    const draftTimer = setInterval(() => {
      if (draftPhase === "active" && currentPick < draftOrder.length) {
        setCurrentPick((prev) => prev + 1);
      }
    }, 3000); // Change every 3 seconds for demo

    return () => clearInterval(draftTimer);
  }, [draftPhase, currentPick, draftOrder.length]);

  const getStatusColor = (status: CountryDraft["status"]) => {
    switch (status) {
      case "completed":
        return "text-gray-500";
      case "live":
        return "text-red-500";
      case "upcoming":
        return "text-blue-500";
      case "draft":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  const getPositionColor = (position: number) => {
    if (position <= 3) return "from-yellow-400 to-orange-500"; // Top 3
    if (position <= 6) return "from-blue-400 to-purple-500"; // Top 6
    if (position <= 9) return "from-green-400 to-teal-500"; // Top 9
    return "from-gray-400 to-slate-500"; // Rest
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
        {/* Draft Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            🏴‍☠️ ROAD TO 2026 🏴‍☠️
          </h1>{" "}
          <p className="text-xl md:text-2xl text-blue-300 mb-4">
            Official Draft: New Year's Celebration Order
          </p>{" "}
          {/* Draft Statistics */}
          <div className="flex items-center justify-center gap-6 text-lg mb-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span>13 Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              <span>18 Hours of Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-400" />
              <span>4.8B+ Viewers</span>
            </div>
          </div>
          {/* Draft Status */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto">
            {" "}
            <div className="flex items-center justify-center gap-2 mb-2">
              <Timer className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold">Draft Status</span>
            </div>
            <div className="text-2xl font-bold text-yellow-400">
              {draftPhase === "upcoming" && "Upcoming"}
              {draftPhase === "active" && `Pick #${currentPick} - LIVE`}
              {draftPhase === "completed" && "Completed"}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {currentTime.toLocaleString()}
            </div>
          </div>
        </motion.div>{" "}
        {/* Draft Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4 mb-8"
        >
          <button
            onClick={() => setDraftPhase("upcoming")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              draftPhase === "upcoming"
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-gray-300 hover:bg-slate-600"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setDraftPhase("active")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              draftPhase === "active"
                ? "bg-red-600 text-white"
                : "bg-slate-700 text-gray-300 hover:bg-slate-600"
            }`}
          >
            Live
          </button>
          <button
            onClick={() => setDraftPhase("completed")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              draftPhase === "completed"
                ? "bg-green-600 text-white"
                : "bg-slate-700 text-gray-300 hover:bg-slate-600"
            }`}
          >
            Completed
          </button>
        </motion.div>
        {/* Draft List */}
        <div className="grid gap-4 max-w-4xl mx-auto">
          {draftOrder.map((country, index) => {
            const isCurrentPick =
              draftPhase === "active" && country.position === currentPick;
            const isPicked =
              draftPhase === "active" && country.position < currentPick;
            const isUpcoming =
              draftPhase === "active" && country.position > currentPick;

            return (
              <motion.div
                key={country.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  isCurrentPick
                    ? "transform scale-105 z-10"
                    : isPicked
                    ? "opacity-60"
                    : ""
                }`}
                onClick={() =>
                  setSelectedCountry(
                    selectedCountry?.id === country.id ? null : country
                  )
                }
              >
                {/* Current pick indicator */}
                {isCurrentPick && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center z-20"
                  >
                    <Zap className="w-4 h-4 text-white" />
                  </motion.div>
                )}

                <div
                  className={`
                  bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border-2 transition-all duration-300
                  ${
                    isCurrentPick
                      ? "border-red-500 shadow-lg shadow-red-500/25"
                      : isPicked
                      ? "border-green-500/50"
                      : isUpcoming
                      ? "border-gray-600"
                      : "border-slate-600 hover:border-blue-500"
                  }
                `}
                >
                  {" "}
                  <div className="flex items-center gap-4">
                    {/* Draft Position */}
                    <div
                      className={`
                      w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold
                      bg-gradient-to-br ${getPositionColor(country.position)}
                    `}
                    >
                      {country.position}
                    </div>{" "}
                    {/* Flag and name */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {" "}
                        <Flag
                          code={country.flagCode}
                          size="l"
                          className="rounded shadow-lg"
                        />
                        <div>
                          <h3 className="text-xl font-bold">{country.name}</h3>
                          <p className="text-gray-400">
                            {country.capitalCity} • {country.region}
                          </p>
                        </div>
                        {country.isRising && (
                          <div className="flex items-center gap-1 text-green-400">
                            <ChevronRight className="w-4 h-4 rotate-[-90deg]" />
                            <span className="text-xs font-semibold">
                              RISING
                            </span>
                          </div>
                        )}
                      </div>{" "}
                    </div>
                    {/* Time information */}
                    <div className="text-right">
                      <div className="text-lg font-semibold">
                        {country.celebrationTime}
                      </div>
                      <div className="text-sm text-gray-400">
                        {country.utcCelebrationTime}
                      </div>
                      <div className="text-xs text-blue-400">
                        {country.timezone}
                      </div>{" "}
                    </div>
                    {/* Status */}
                    <div className="flex flex-col items-center gap-2">
                      {isPicked && <Award className="w-6 h-6 text-green-400" />}
                      {isCurrentPick && (
                        <Star className="w-6 h-6 text-red-400 animate-pulse" />
                      )}
                      {isUpcoming && (
                        <Clock className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </div>
                  {/* Expandable details */}
                  <AnimatePresence>
                    {selectedCountry?.id === country.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-slate-600"
                      >
                        {" "}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Statistics */}
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              Statistics
                            </h4>
                            <div className="space-y-1 text-sm">
                              <div>
                                Population:{" "}
                                {country.population.toLocaleString()}
                              </div>
                              <div>
                                2025 Ranking: #{country.previousRanking}
                              </div>
                              <div>
                                UTC Offset: {country.utcOffset > 0 ? "+" : ""}
                                {country.utcOffset}
                              </div>
                            </div>
                          </div>

                          {/* Landmark */}
                          <div>
                            {" "}
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              Main Icon
                            </h4>
                            <div className="text-sm text-blue-400">
                              {country.famousLandmark}
                            </div>
                          </div>

                          {/* Highlights */}
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Star className="w-4 h-4" />
                              Highlights
                            </h4>
                            <ul className="text-sm space-y-1">
                              {country.highlights.map((highlight, i) => (
                                <li key={i} className="text-gray-300">
                                  • {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>{" "}
                        {/* Action button */}
                        <div className="mt-4 flex justify-end">
                          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                            <Play className="w-4 h-4" />
                            Watch Stream
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>{" "}
        {/* Additional information */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center bg-gradient-to-r from-blue-800/50 to-purple-800/50 backdrop-blur-sm rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold mb-4">How does the Draft work?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="text-center">
              <Globe className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <h3 className="font-semibold mb-2">Order by Time Zone</h3>
              <p className="text-sm text-gray-300">
                Countries are ordered by their celebration time, from UTC+13 to
                UTC-6
              </p>
            </div>
            <div className="text-center">
              <Eye className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <h3 className="font-semibold mb-2">Live Coverage</h3>
              <p className="text-sm text-gray-300">
                Real-time tracking of each celebration with official streams
              </p>
            </div>
            <div className="text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <h3 className="font-semibold mb-2">Official Rankings</h3>
              <p className="text-sm text-gray-300">
                Based on popularity, spectacle and tradition of each celebration
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
