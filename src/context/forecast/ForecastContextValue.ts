import { createContext } from "react";
import type { DailyForecastData, HourlyForecastData } from "../weather/WeatherContextValue";

export interface ForecastContextType {
  daily: DailyForecastData | null;
  hourly: HourlyForecastData | null;
  loading: boolean;
  error: string | null;
}

export const ForecastContext = createContext<ForecastContextType | null>(null);
