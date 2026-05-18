import { useContext } from "react";
import { ForecastContext } from "./ForecastContextValue";
import type { ForecastContextType } from "./ForecastContextValue";

export const useForecast = (): ForecastContextType => {
  const context = useContext(ForecastContext);
  if (!context) {
    throw new Error("useForecast deve ser usado dentro de um ForecastProvider");
  }
  return context;
};
