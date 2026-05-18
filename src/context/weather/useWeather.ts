import { useContext } from "react";
import { WeatherContext } from "./WeatherContextValue";
import type { WeatherContextType } from "./WeatherContextValue";

export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather deve ser usado dentro de um WeatherProvider");
  }
  return context;
};
