import React, { createContext, useContext, useMemo } from "react";
import { useWeather } from "./WeatherContext";
import type { DailyForecastData, HourlyForecastData } from "./WeatherContext";

interface ForecastContextType {
  daily: DailyForecastData | null;
  hourly: HourlyForecastData | null;
  loading: boolean;
  error: string | null;
}


const ForecastContext = createContext<ForecastContextType | null>(null);


export const ForecastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { dailyForecast, hourlyForecast, loading, error } = useWeather();

  const value = useMemo(
    () => ({
      daily: dailyForecast,
      hourly: hourlyForecast,
      loading,
      error,
    }),
    [dailyForecast, hourlyForecast, loading, error]
  );

  return (
    <ForecastContext.Provider value={value}>{children}</ForecastContext.Provider>
  );
};


export const useForecast = (): ForecastContextType => {
  const context = useContext(ForecastContext);
  if (!context)
    throw new Error("useForecast deve ser usado dentro de um ForecastProvider");
  return context;
};