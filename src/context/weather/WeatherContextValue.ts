import { createContext } from "react";

export interface DailyForecastData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
  precipitation_sum: number[];
}

export interface HourlyForecastData {
  time: string[];
  temperature_2m: number[];
  windspeed_10m: number[];
  relativehumidity_2m: number[];
}

export interface WeatherContextType {
  city: string | null;
  country: string | null;
  error: string | null;
  latitude: number | null;
  longitude: number | null;
  temperature: number | null;
  currentWeatherCode: number | null;
  humidity: number | null;
  windSpeed: number | null;
  uvIndex: number | null;
  dailyForecast: DailyForecastData | null;
  hourlyForecast: HourlyForecastData | null;
  loading: boolean;
  retryWeather: () => void;
  setCity: (city: string | null) => void;
  setCountry: (country: string | null) => void;
  setLatitude: (latitude: number | null) => void;
  setLongitude: (longitude: number | null) => void;
}

export const WeatherContext = createContext<WeatherContextType | null>(null);
