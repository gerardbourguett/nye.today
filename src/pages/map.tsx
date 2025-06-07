import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Flag from "@/components/flag";
import {
  Clock,
  Globe,
  MapPin,
  Compass,
  Anchor,
  Star,
  Calendar,
  Timer,
  Eye,
  Play,
  ChevronLeft,
  ChevronRight,
  Info,
  Zap,
  Sun,
  Moon,
  Sunrise,
  Sunset,
} from "lucide-react";

// Interface for time zones
interface TimeZone {
  id: string;
  name: string;
  utcOffset: number;
  countries: string[];
  majorCities: string[];
  currentTime: string;
  status: "night" | "dawn" | "day" | "dusk";
  celebrationTime: string;
  isNewYear: boolean;
  population: number;
  color: string;
}

// Interface for countries on the map
interface CountryMarker {
  id: string;
  name: string;
  flag: string;
  coordinates: { x: number; y: number }; // Map percentage
  timezone: string;
  utcOffset: number;
  isActive: boolean;
  celebrationStatus: "completed" | "live" | "upcoming";
}

export default function Map() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimezone, setSelectedTimezone] = useState<TimeZone | null>(
    null
  );
  const [selectedCountry, setSelectedCountry] = useState<CountryMarker | null>(
    null
  );
  const [mapMode, setMapMode] = useState<
    "timezones" | "countries" | "celebration"
  >("timezones");
  const [currentHour, setCurrentHour] = useState(0);
  // Main time zones
  const timeZones: TimeZone[] = [
    {
      id: "utc+12",
      name: "UTC+12",
      utcOffset: 12,
      countries: ["Fiji", "Kiribati", "Nauru"],
      majorCities: ["Suva", "Tarawa"],
      currentTime: "",
      status: "day",
      celebrationTime: "12:00 PM UTC (Dec 31)",
      isNewYear: false,
      population: 1200000,
      color: "#FFD700",
    },
    {
      id: "utc+13",
      name: "UTC+13",
      utcOffset: 13,
      countries: ["New Zealand", "Samoa"],
      majorCities: ["Auckland", "Wellington", "Apia"],
      currentTime: "",
      status: "day",
      celebrationTime: "11:00 AM UTC (Dec 31)",
      isNewYear: false,
      population: 5200000,
      color: "#FF6B35",
    },
    {
      id: "utc+11",
      name: "UTC+11",
      utcOffset: 11,
      countries: ["Australia (East)", "Solomon Islands"],
      majorCities: ["Sydney", "Melbourne", "Honiara"],
      currentTime: "",
      status: "day",
      celebrationTime: "1:00 PM UTC (Dec 31)",
      isNewYear: false,
      population: 26000000,
      color: "#FF8E53",
    },
    {
      id: "utc+9",
      name: "UTC+9",
      utcOffset: 9,
      countries: ["Japan", "South Korea"],
      majorCities: ["Tokyo", "Osaka", "Seoul"],
      currentTime: "",
      status: "day",
      celebrationTime: "3:00 PM UTC (Dec 31)",
      isNewYear: false,
      population: 177000000,
      color: "#F7931E",
    },
    {
      id: "utc+8",
      name: "UTC+8",
      utcOffset: 8,
      countries: ["China", "Singapore", "Philippines"],
      majorCities: ["Beijing", "Shanghai", "Singapore", "Manila"],
      currentTime: "",
      status: "day",
      celebrationTime: "4:00 PM UTC (Dec 31)",
      isNewYear: false,
      population: 1650000000,
      color: "#FFB300",
    },
    {
      id: "utc+7",
      name: "UTC+7",
      utcOffset: 7,
      countries: ["Thailand", "Vietnam", "Indonesia"],
      majorCities: ["Bangkok", "Ho Chi Minh", "Jakarta"],
      currentTime: "",
      status: "day",
      celebrationTime: "5:00 PM UTC (Dec 31)",
      isNewYear: false,
      population: 380000000,
      color: "#4CAF50",
    },
    {
      id: "utc+5:30",
      name: "UTC+5:30",
      utcOffset: 5.5,
      countries: ["India", "Sri Lanka"],
      majorCities: ["New Delhi", "Mumbai", "Colombo"],
      currentTime: "",
      status: "day",
      celebrationTime: "6:30 PM UTC (Dec 31)",
      isNewYear: false,
      population: 1420000000,
      color: "#2196F3",
    },
    {
      id: "utc+4",
      name: "UTC+4",
      utcOffset: 4,
      countries: ["UAE", "Georgia"],
      majorCities: ["Dubai", "Abu Dhabi", "Tbilisi"],
      currentTime: "",
      status: "day",
      celebrationTime: "8:00 PM UTC (Dec 31)",
      isNewYear: false,
      population: 15000000,
      color: "#9C27B0",
    },
    {
      id: "utc+1",
      name: "UTC+1",
      utcOffset: 1,
      countries: ["Germany", "France", "Spain", "Italy"],
      majorCities: ["Berlin", "Paris", "Madrid", "Rome"],
      currentTime: "",
      status: "day",
      celebrationTime: "11:00 PM UTC (Dec 31)",
      isNewYear: false,
      population: 320000000,
      color: "#3F51B5",
    },
    {
      id: "utc+0",
      name: "UTC+0",
      utcOffset: 0,
      countries: ["United Kingdom", "Portugal"],
      majorCities: ["London", "Lisbon"],
      currentTime: "",
      status: "day",
      celebrationTime: "12:00 AM UTC (Jan 1)",
      isNewYear: false,
      population: 78000000,
      color: "#607D8B",
    },
    {
      id: "utc-3",
      name: "UTC-3",
      utcOffset: -3,
      countries: ["Brazil", "Argentina"],
      majorCities: ["São Paulo", "Rio de Janeiro", "Buenos Aires"],
      currentTime: "",
      status: "day",
      celebrationTime: "3:00 AM UTC (Jan 1)",
      isNewYear: false,
      population: 260000000,
      color: "#795548",
    },
    {
      id: "utc-5",
      name: "UTC-5",
      utcOffset: -5,
      countries: ["United States (East)", "Colombia"],
      majorCities: ["New York", "Miami", "Bogotá"],
      currentTime: "",
      status: "day",
      celebrationTime: "5:00 AM UTC (Jan 1)",
      isNewYear: false,
      population: 180000000,
      color: "#E91E63",
    },
    {
      id: "utc-6",
      name: "UTC-6",
      utcOffset: -6,
      countries: ["Mexico", "United States (Central)"],
      majorCities: ["Mexico City", "Chicago"],
      currentTime: "",
      status: "day",
      celebrationTime: "6:00 AM UTC (Jan 1)",
      isNewYear: false,
      population: 200000000,
      color: "#FF5722",
    },
  ];
  // Country markers on the map
  const countryMarkers: CountryMarker[] = [
    {
      id: "nz",
      name: "New Zealand",
      flag: "🇳🇿",
      coordinates: { x: 85, y: 75 },
      timezone: "UTC+13",
      utcOffset: 13,
      isActive: false,
      celebrationStatus: "upcoming",
    },
    {
      id: "fj",
      name: "Fiji",
      flag: "🇫🇯",
      coordinates: { x: 82, y: 70 },
      timezone: "UTC+12",
      utcOffset: 12,
      isActive: false,
      celebrationStatus: "upcoming",
    },
    {
      id: "au",
      name: "Australia",
      flag: "🇦🇺",
      coordinates: { x: 78, y: 75 },
      timezone: "UTC+11",
      utcOffset: 11,
      isActive: false,
      celebrationStatus: "upcoming",
    },
    {
      id: "jp",
      name: "Japan",
      flag: "🇯🇵",
      coordinates: { x: 75, y: 45 },
      timezone: "UTC+9",
      utcOffset: 9,
      isActive: false,
      celebrationStatus: "upcoming",
    },
    {
      id: "cn",
      name: "China",
      flag: "🇨🇳",
      coordinates: { x: 70, y: 45 },
      timezone: "UTC+8",
      utcOffset: 8,
      isActive: false,
      celebrationStatus: "upcoming",
    },
    {
      id: "th",
      name: "Thailand",
      flag: "🇹🇭",
      coordinates: { x: 65, y: 55 },
      timezone: "UTC+7",
      utcOffset: 7,
      isActive: false,
      celebrationStatus: "upcoming",
    },
    {
      id: "in",
      name: "India",
      flag: "🇮🇳",
      coordinates: { x: 62, y: 50 },
      timezone: "UTC+5:30",
      utcOffset: 5.5,
      isActive: false,
      celebrationStatus: "upcoming",
    },
    {
      id: "ae",
      name: "UAE",
      flag: "🇦🇪",
      coordinates: { x: 58, y: 48 },
      timezone: "UTC+4",
      utcOffset: 4,
      isActive: false,
      celebrationStatus: "upcoming",
    },
    {
      id: "de",
      name: "Germany",
      flag: "🇩🇪",
      coordinates: { x: 48, y: 35 },
      timezone: "UTC+1",
      utcOffset: 1,
      isActive: false,
      celebrationStatus: "upcoming",
    },
    {
      id: "gb",
      name: "United Kingdom",
      flag: "🇬🇧",
      coordinates: { x: 45, y: 30 },
      timezone: "UTC+0",
      utcOffset: 0,
      isActive: false,
      celebrationStatus: "upcoming",
    },
    {
      id: "br",
      name: "Brazil",
      flag: "🇧🇷",
      coordinates: { x: 30, y: 65 },
      timezone: "UTC-3",
      utcOffset: -3,
      isActive: false,
      celebrationStatus: "upcoming",
    },
    {
      id: "us",
      name: "United States",
      flag: "🇺🇸",
      coordinates: { x: 20, y: 40 },
      timezone: "UTC-5",
      utcOffset: -5,
      isActive: false,
      celebrationStatus: "upcoming",
    },
    {
      id: "mx",
      name: "Mexico",
      flag: "🇲🇽",
      coordinates: { x: 15, y: 50 },
      timezone: "UTC-6",
      utcOffset: -6,
      isActive: false,
      celebrationStatus: "upcoming",
    },
  ];
  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setCurrentHour(now.getUTCHours());

      // Update times for each time zone
      timeZones.forEach((tz) => {
        const tzTime = new Date(now.getTime() + tz.utcOffset * 60 * 60 * 1000);
        tz.currentTime = tzTime.toLocaleTimeString();

        // Determine day status
        const hour = tzTime.getHours();
        if (hour >= 6 && hour < 12) tz.status = "dawn";
        else if (hour >= 12 && hour < 18) tz.status = "day";
        else if (hour >= 18 && hour < 21) tz.status = "dusk";
        else tz.status = "night";

        // Check if it's New Year
        tz.isNewYear = tzTime.getDate() === 1 && tzTime.getMonth() === 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatusIcon = (status: TimeZone["status"]) => {
    switch (status) {
      case "dawn":
        return <Sunrise className="w-4 h-4 text-orange-400" />;
      case "day":
        return <Sun className="w-4 h-4 text-yellow-400" />;
      case "dusk":
        return <Sunset className="w-4 h-4 text-orange-600" />;
      case "night":
        return <Moon className="w-4 h-4 text-blue-400" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getCelebrationStatusColor = (
    status: CountryMarker["celebrationStatus"]
  ) => {
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
            🏴‍☠️ MAPA MUNDIAL NYE 🏴‍☠️
          </h1>
          <p className="text-xl md:text-2xl text-blue-300 mb-4">
            Time Zones and New Year 2026 Celebrations
          </p>

          {/* Current time information */}
          <div className="flex items-center justify-center gap-6 text-lg mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span>UTC: {currentTime.toUTCString().slice(17, 25)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-400" />
              <span>Hora Local: {currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Controles del mapa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4 mb-8"
        >
          <button
            onClick={() => setMapMode("timezones")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              mapMode === "timezones"
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-gray-300 hover:bg-slate-600"
            }`}
          >
            <Clock className="w-4 h-4 inline mr-2" />
            Husos Horarios
          </button>
          <button
            onClick={() => setMapMode("countries")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              mapMode === "countries"
                ? "bg-green-600 text-white"
                : "bg-slate-700 text-gray-300 hover:bg-slate-600"
            }`}
          >
            <MapPin className="w-4 h-4 inline mr-2" />
            Countries
          </button>
          <button
            onClick={() => setMapMode("celebration")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              mapMode === "celebration"
                ? "bg-red-600 text-white"
                : "bg-slate-700 text-gray-300 hover:bg-slate-600"
            }`}
          >
            <Star className="w-4 h-4 inline mr-2" />
            Celebraciones
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Mapa principal */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Compass className="w-6 h-6 text-yellow-400" />
                Mapamundi Interactivo
              </h2>

              {/* SVG Mapa del mundo simplificado */}
              <div className="relative bg-slate-900/50 rounded-lg p-4 overflow-hidden">
                <svg
                  viewBox="0 0 100 60"
                  className="w-full h-96 border border-slate-600 rounded-lg"
                  style={{ backgroundColor: "#1e293b" }}
                >
                  {/* Latitude lines */}
                  <g stroke="#475569" strokeWidth="0.1" opacity="0.5">
                    <line x1="0" y1="15" x2="100" y2="15" />
                    <line x1="0" y1="30" x2="100" y2="30" />
                    <line x1="0" y1="45" x2="100" y2="45" />
                  </g>

                  {/* Longitude lines (time zones) */}
                  <g stroke="#475569" strokeWidth="0.1" opacity="0.5">
                    {Array.from({ length: 25 }, (_, i) => (
                      <line key={i} x1={i * 4} y1="0" x2={i * 4} y2="60" />
                    ))}
                  </g>

                  {/* Continentes simplificados */}
                  <g fill="#64748b" opacity="0.6">
                    {/* North America */}
                    <path d="M5,15 L25,15 L25,35 L15,40 L5,35 Z" />
                    {/* South America */}
                    <path d="M20,40 L35,40 L30,55 L25,55 Z" />
                    {/* Europa */}
                    <path d="M45,15 L55,15 L55,25 L45,25 Z" />
                    {/* Africa */}
                    <path d="M45,25 L55,25 L55,50 L45,50 Z" />
                    {/* Asia */}
                    <path d="M55,10 L80,10 L80,40 L55,40 Z" />
                    {/* Oceania */}
                    <path d="M75,45 L85,45 L85,55 L75,55 Z" />
                  </g>

                  {/* Country markers */}
                  {mapMode === "countries" &&
                    countryMarkers.map((country) => (
                      <g key={country.id}>
                        <circle
                          cx={country.coordinates.x}
                          cy={country.coordinates.y}
                          r="1.5"
                          fill={country.isActive ? "#ef4444" : "#3b82f6"}
                          className="cursor-pointer hover:r-2 transition-all"
                          onClick={() =>
                            setSelectedCountry(
                              selectedCountry?.id === country.id
                                ? null
                                : country
                            )
                          }
                        />
                        <text
                          x={country.coordinates.x}
                          y={country.coordinates.y - 2.5}
                          fontSize="1.5"
                          fill="white"
                          textAnchor="middle"
                          className="cursor-pointer"
                          onClick={() =>
                            setSelectedCountry(
                              selectedCountry?.id === country.id
                                ? null
                                : country
                            )
                          }
                        >
                          {country.flag}
                        </text>
                      </g>
                    ))}

                  {/* Highlighted time zones */}
                  {mapMode === "timezones" &&
                    timeZones.map((tz, index) => {
                      const x = (tz.utcOffset + 12) * 4; // Convert offset to X position
                      return (
                        <g key={tz.id}>
                          <rect
                            x={x - 2}
                            y="0"
                            width="4"
                            height="60"
                            fill={tz.color}
                            opacity="0.3"
                            className="cursor-pointer hover:opacity-50 transition-opacity"
                            onClick={() =>
                              setSelectedTimezone(
                                selectedTimezone?.id === tz.id ? null : tz
                              )
                            }
                          />
                          <text
                            x={x}
                            y="8"
                            fontSize="1"
                            fill="white"
                            textAnchor="middle"
                            className="font-semibold"
                          >
                            {tz.name}
                          </text>
                        </g>
                      );
                    })}

                  {/* Indicador de celebraciones en vivo */}
                  {mapMode === "celebration" &&
                    countryMarkers
                      .filter((c) => c.celebrationStatus === "live")
                      .map((country) => (
                        <g key={`celebration-${country.id}`}>
                          <circle
                            cx={country.coordinates.x}
                            cy={country.coordinates.y}
                            r="3"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="0.3"
                            opacity="0.8"
                          >
                            <animate
                              attributeName="r"
                              values="3;5;3"
                              dur="2s"
                              repeatCount="indefinite"
                            />
                          </circle>
                          <text
                            x={country.coordinates.x}
                            y={country.coordinates.y - 4}
                            fontSize="2"
                            fill="#ef4444"
                            textAnchor="middle"
                          >
                            🎆
                          </text>
                        </g>
                      ))}
                </svg>

                {/* Leyenda del mapa */}
                <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur-sm rounded-lg p-3">
                  <h4 className="font-semibold mb-2 text-sm">Leyenda</h4>
                  <div className="space-y-1 text-xs">
                    {mapMode === "timezones" && (
                      <div>Cada banda vertical = 1 hora UTC</div>
                    )}
                    {mapMode === "countries" && (
                      <>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Next Country</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>Celebrando ahora</span>
                        </div>
                      </>
                    )}
                    {mapMode === "celebration" && (
                      <div className="flex items-center gap-2">
                        <span>🎆</span>
                        <span>Live Celebration</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Panel lateral */}
          <div className="space-y-6">
            {/* Selected information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-400" />
                Detailed Information
              </h3>

              {selectedTimezone && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: selectedTimezone.color }}
                    ></div>
                    <h4 className="font-semibold">{selectedTimezone.name}</h4>
                    {getStatusIcon(selectedTimezone.status)}
                  </div>
                  <div className="text-sm space-y-1">
                    <div>Hora actual: {selectedTimezone.currentTime}</div>
                    <div>
                      Offset UTC: {selectedTimezone.utcOffset > 0 ? "+" : ""}
                      {selectedTimezone.utcOffset}
                    </div>
                    <div>
                      Population: {selectedTimezone.population.toLocaleString()}
                    </div>
                    <div>Celebration: {selectedTimezone.celebrationTime}</div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm mb-1">Countries:</h5>
                    <div className="text-sm text-gray-300">
                      {selectedTimezone.countries.join(", ")}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm mb-1">
                      Ciudades principales:
                    </h5>
                    <div className="text-sm text-gray-300">
                      {selectedTimezone.majorCities.join(", ")}
                    </div>
                  </div>
                  {selectedTimezone.isNewYear && (
                    <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-2 text-center">
                      <span className="text-yellow-400 font-semibold">
                        🎉 ¡Ya es 2026! 🎉
                      </span>
                    </div>
                  )}
                </div>
              )}

              {selectedCountry && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedCountry.flag}</span>
                    <h4 className="font-semibold">{selectedCountry.name}</h4>
                  </div>
                  <div className="text-sm space-y-1">
                    <div>Zona horaria: {selectedCountry.timezone}</div>
                    <div>
                      UTC Offset: {selectedCountry.utcOffset > 0 ? "+" : ""}
                      {selectedCountry.utcOffset}
                    </div>
                    <div
                      className={`font-semibold ${getCelebrationStatusColor(
                        selectedCountry.celebrationStatus
                      )}`}
                    >
                      Estado:{" "}
                      {selectedCountry.celebrationStatus === "completed"
                        ? "Completado"
                        : selectedCountry.celebrationStatus === "live"
                        ? "EN VIVO"
                        : "Next"}
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                    <Play className="w-4 h-4" />
                    Watch Celebration
                  </button>
                </div>
              )}

              {!selectedTimezone && !selectedCountry && (
                <div className="text-center text-gray-400">
                  <Globe className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>
                    Select a time zone or country on the map to see more
                    information
                  </p>
                </div>
              )}
            </motion.div>

            {/* Lista de zonas horarias */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Timer className="w-5 h-5 text-green-400" />
                Celebration Order
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {timeZones
                  .sort((a, b) => b.utcOffset - a.utcOffset)
                  .map((tz, index) => (
                    <div
                      key={tz.id}
                      className={`flex items-center gap-3 p-2 rounded-lg transition-colors cursor-pointer ${
                        selectedTimezone?.id === tz.id
                          ? "bg-blue-600/30 border border-blue-500/50"
                          : "bg-slate-700/50 hover:bg-slate-700"
                      }`}
                      onClick={() =>
                        setSelectedTimezone(
                          selectedTimezone?.id === tz.id ? null : tz
                        )
                      }
                    >
                      <div className="text-lg font-bold text-gray-400">
                        #{index + 1}
                      </div>
                      <div
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: tz.color }}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{tz.name}</div>
                        <div className="text-xs text-gray-400">
                          {tz.currentTime}
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusIcon(tz.status)}
                        {tz.isNewYear && (
                          <span className="text-xs text-yellow-400 block">
                            2026!
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Additional information */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center bg-gradient-to-r from-blue-800/50 to-purple-800/50 backdrop-blur-sm rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold mb-4">How to read the map?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <h3 className="font-semibold mb-2">Husos Horarios</h3>
              <p className="text-sm text-gray-300">
                Cada banda vertical representa una hora UTC. Los colores indican
                diferentes zonas horarias.
              </p>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <h3 className="font-semibold mb-2">Countries</h3>
              <p className="text-sm text-gray-300">
                Markers show main countries. Blue = next, Red = celebrando
                ahora.
              </p>
            </div>
            <div className="text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <h3 className="font-semibold mb-2">Celebraciones</h3>
              <p className="text-sm text-gray-300">
                Los fuegos artificiales indican celebraciones en curso en tiempo
                real.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
