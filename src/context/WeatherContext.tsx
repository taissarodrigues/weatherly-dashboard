// WeatherContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { API_LINKS } from "../components/api_links";

interface WeatherContextType {
  city: string | null;
  country: string | null;
  error: string | null;
  setCity: (city: string | null) => void;
}

const WeatherContext = createContext<WeatherContextType>({} as WeatherContextType);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [city, setCity] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          setError('Nao foi possivel carregar sua localizacao agora.');
        }
      }
    };
    fetchLocationData();
    return () => { isMounted = false; };
  }, []);

  return (
    <WeatherContext.Provider value={{ city, country, error, setCity }}>
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