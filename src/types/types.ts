export interface TimeZoneReduced {
  id: number;
  countryCode: string;
  countryName: string;
  zoneName: string;
  gmtOffset: number;
  timestamp: number;
  live?: string;
  streamUrl?: string;
  celebrationStatus?: 'not_started' | 'live' | 'completed';
  lastUpdated?: string;
}

export interface TimeZoneWithCalculations extends TimeZoneReduced {
  localTime: Date;
  timeToMidnight: string;
  hoursToMidnight: number;
  minutesToMidnight: number;
  progress: number;
  status: 'celebrating' | 'upcoming' | 'waiting';
}

export interface TimeZoneGroup {
  gmtOffset: number;
  gmtOffsetDisplay: string;
  zoneName: string;
  status: 'celebrating' | 'upcoming' | 'waiting';
  timeToMidnight: string;
  progress: number;
  countries: TimeZoneWithCalculations[];
  totalPopulation: number;
  nextMidnight: Date;
}