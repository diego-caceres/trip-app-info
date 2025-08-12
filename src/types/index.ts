export interface TripInfo {
  title: string;
  subtitle: string;
  departure: {
    city: string;
    date: string;
    time: string;
  };
  return: {
    city: string;
    date: string;
    time: string;
  };
  duration: string;
  countries: number;
  cities: number;
}

export interface Transport {
  type: string;
  time?: string;
  distance?: string;
}

export interface Suggestion {
  type: 'transport' | 'warning' | 'tip';
  title: string;
  content: string;
  status?: 'pending' | 'completed';
}

export interface ItineraryDay {
  day: number;
  date: string;
  dateISO?: string;
  route: string;
  country: 'portugal' | 'spain';
  flag?: string;
  transport?: Transport | null;
  activities: string;
  accommodation: string | null;
  suggestions: Suggestion[];
}

export interface ItineraryData {
  tripInfo: TripInfo;
  days: ItineraryDay[];
  generalRecommendations: string[];
}