import { API_LINKS } from "../components/api_links";
import type { DailyForecastData, HourlyForecastData } from "../context/weather/WeatherContextValue";

export interface WeatherForecast {
  current?: {
    temperature_2m?: number;
    weather_code?: number;
    relative_humidity_2m?: number;
    wind_speed_10m?: number;
    uv_index?: number;
  };
  daily?: DailyForecastData;
  hourly?: HourlyForecastData;
}

export const getWeatherForecast = async (
  latitude: number,
  longitude: number
): Promise<WeatherForecast> => {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: [
      "temperature_2m",
      "weather_code",
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

  const response = await fetch(`${API_LINKS.weatherForecast}?${params}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar o clima");
  }

  return response.json() as Promise<WeatherForecast>;
};
