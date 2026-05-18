import React, { useMemo } from "react";
import { useWeather } from "../weather/useWeather";
import { ForecastContext } from "./ForecastContextValue";

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
