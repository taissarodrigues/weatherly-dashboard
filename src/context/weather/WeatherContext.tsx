import React, {
  useState,
  useEffect,
  useMemo,
} from "react";
import { getIpLocation } from "../../services/locationService";
import { getWeatherForecast } from "../../services/weatherService";
import { WeatherContext } from "./WeatherContextValue";
import type { DailyForecastData, HourlyForecastData } from "./WeatherContextValue";

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
  const [currentWeatherCode, setCurrentWeatherCode] = useState<number | null>(null);
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
        const data = await getIpLocation();
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
        const data = await getWeatherForecast(latitude, longitude);

        if (isMounted) {
          setTemperature(data.current?.temperature_2m ?? null);
          setCurrentWeatherCode(data.current?.weather_code ?? null);
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
      temperature, currentWeatherCode, humidity, windSpeed, uvIndex,
      dailyForecast, hourlyForecast,
      setCity, setCountry, setLatitude, setLongitude,
    }),
    [
      city, country, error, latitude, longitude, loading,
      temperature, currentWeatherCode, humidity, windSpeed, uvIndex,
      dailyForecast, hourlyForecast,
    ]
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};
