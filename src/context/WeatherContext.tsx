import React, { createContext, useContext, useState, useEffect } from "react";
import { API_LINKS } from "../components/api_links";

interface WeatherContextType {
  city: string | null;
  country: string | null;
  error: string | null;
  latitude: number | null;
  longitude: number | null;
  temperature: number | null; 
  setCity: (city: string | null) => void;
  setLatitude: (latitude: number | null) => void;
  setLongitude: (longitude: number | null) => void;
}

const WeatherContext = createContext<WeatherContextType>({} as WeatherContextType);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [city, setCity] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchLocationData = async () => {
      try {
        const response = await fetch(API_LINKS.ipLocation);
        if (!response.ok) {
          throw new Error(`API respondeu com status ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) {
          setCity(data.city || null);
          setCountry(data.country || null);
          setLatitude(data.latitude || null);
          setLongitude(data.longitude || null);
          setError(null);
        }
      } catch {
        if (isMounted) {
          setError('Nao foi possivel carregar sua localizacao agora.');
        }
      }
    };
    fetchLocationData();
    return () => { isMounted = false; };
  }, []);
  useEffect(() => {
  // Só faz a busca se tivermos números válidos de lat e lon
  if (latitude === null || longitude === null) return;

  let isMounted = true;

  const fetchWeatherData = async () => {
    try {
      // Montando a URL com a lat e lon reais da cidade atual
      const url = `${API_LINKS.weatherForecast}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&timezone=auto`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error("Erro ao buscar o clima");
      
      const data = await response.json();

      if (isMounted) {
        // A Open-Meteo joga a temperatura atual dentro de data.current.temperature_2m
        setTemperature(data.current?.temperature_2m || null);
      }
    } catch {
      if (isMounted) {
        setError("Não foi possível carregar a temperatura desta cidade.");
      }
    }
  };

  fetchWeatherData();

  return () => {
    isMounted = false;
  };
}, [latitude, longitude]); // <-- Olho vivo aqui! Essa é a dependência.

  return (
    <WeatherContext.Provider value={{ city, country, error, latitude, longitude, temperature, setCity, setLatitude, setLongitude }}>
      {children}
    </WeatherContext.Provider>
  );
};


export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather deve ser usado dentro de um WeatherProvider');
  }
  return context;
};
