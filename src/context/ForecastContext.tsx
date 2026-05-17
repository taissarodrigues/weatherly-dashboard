// ForecastContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { API_LINKS } from "../components/api_links";
import { useWeather } from "./WeatherContext";

interface DailyForecast {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
  precipitation_sum: number[];
}

interface HourlyForecast {
  time: string[];
  temperature_2m: number[];
  windspeed_10m: number[];
  relativehumidity_2m: number[];
  uv_index: number[];
}

interface ForecastData {
  daily: DailyForecast;
  hourly: HourlyForecast;
  latitude: number;
  longitude: number;
  timezone: string;
}

interface ForecastContextType {
  forecast: ForecastData | null;
  loading: boolean;
  error: string | null;
}

const ForecastContext = createContext<ForecastContextType>({} as ForecastContextType);

export const ForecastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { city } = useWeather();
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) return;

    let isMounted = true;

    const fetchForecast = async () => {
      setLoading(true);
      try {
        const geoRes = await fetch(`${API_LINKS.geocoding}?name=${city}`);
        const geoData = await geoRes.json();
        const { latitude, longitude } = geoData.results[0];

        const forecastRes = await fetch(
          `${API_LINKS.weatherForecast}?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum&hourly=temperature_2m,windspeed_10m,relativehumidity_2m,uv_index&timezone=auto`
        );
        const forecastData = await forecastRes.json();

        if (isMounted) {
          setForecast(forecastData);
          setError(null);
          console.log("Forecast data:", forecastData);
        }
      } catch {
        if (isMounted) setError("Não foi possível carregar a previsão.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchForecast();
    return () => { isMounted = false; };

  }, [city]);

  return (
    <ForecastContext.Provider value={{ forecast, loading, error }}>
      {children}
    </ForecastContext.Provider>
  );
};

export const useForecast = (): ForecastContextType => {
  const context = useContext(ForecastContext);
  if (!context) throw new Error("useForecast deve ser usado dentro de um ForecastProvider");
  return context;
};