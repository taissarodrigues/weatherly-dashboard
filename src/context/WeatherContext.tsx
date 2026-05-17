import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { API_LINKS } from "../components/api_links";


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

interface WeatherContextType {
  city: string | null;
  country: string | null;
  error: string | null;
  latitude: number | null;
  longitude: number | null;
  temperature: number | null;
  humidity: number | null;
  windSpeed: number | null;
  uvIndex: number | null;
  dailyForecast: DailyForecastData | null;
  hourlyForecast: HourlyForecastData | null;
  loading: boolean;
  setCity: (city: string | null) => void;
  setCountry: (country: string | null) => void;
  setLatitude: (latitude: number | null) => void;
  setLongitude: (longitude: number | null) => void;
}

const WeatherContext = createContext<WeatherContextType | null>(null);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [city, setCity] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [windSpeed, setWindSpeed] = useState<number | null>(null);
  const [uvIndex, setUvIndex] = useState<number | null>(null);
  const [dailyForecast, setDailyForecast] = useState<DailyForecastData | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastData | null>(null);

  // geolocalização inicial por IP
  useEffect(() => {
    let isMounted = true;
    const fetchLocation = async () => {
      try {
        const res = await fetch(API_LINKS.ipLocation);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        if (isMounted) {
          setCity(data.city ?? null);
          setCountry(data.country ?? null);
          setLatitude(data.latitude ?? null);
          setLongitude(data.longitude ?? null);
        }
      } catch {
        if (isMounted) setError("Não foi possível detectar sua localização.");
      }
    };
    fetchLocation();
    return () => { isMounted = false; };
  }, []);
  useEffect(() => {
    if (latitude === null || longitude === null) return;
    let isMounted = true;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          latitude: String(latitude),
          longitude: String(longitude),
         
          current: [
            "temperature_2m",
            "relative_humidity_2m",
            "wind_speed_10m",
            "uv_index",
          ].join(","),
          daily: [
            "temperature_2m_max",
            "temperature_2m_min",
            "weathercode",
            "precipitation_sum",
          ].join(","),
          hourly: [
            "temperature_2m",
            "windspeed_10m",
            "relativehumidity_2m",
          ].join(","),
          timezone: "auto",
        });

        const res = await fetch(`${API_LINKS.weatherForecast}?${params}`);
        if (!res.ok) throw new Error("Erro ao buscar o clima");
        const data = await res.json();

        if (isMounted) {
          setTemperature(data.current?.temperature_2m ?? null);
          setHumidity(data.current?.relative_humidity_2m ?? null);
          setWindSpeed(data.current?.wind_speed_10m ?? null);
          setUvIndex(data.current?.uv_index ?? null);
          setDailyForecast(data.daily ?? null);
          setHourlyForecast(data.hourly ?? null);
        }
      } catch {
        if (isMounted) setError("Não foi possível carregar as informações do clima.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchWeather();
    return () => { isMounted = false; };
  }, [latitude, longitude]);

  const value = useMemo(
    () => ({
      city, country, error, latitude, longitude, loading,
      temperature, humidity, windSpeed, uvIndex,
      dailyForecast, hourlyForecast,
      setCity, setCountry, setLatitude, setLongitude,
    }),
    [
      city, country, error, latitude, longitude, loading,
      temperature, humidity, windSpeed, uvIndex,
      dailyForecast, hourlyForecast,
    ]
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (!context)
    throw new Error("useWeather deve ser usado dentro de um WeatherProvider");
  return context;
};