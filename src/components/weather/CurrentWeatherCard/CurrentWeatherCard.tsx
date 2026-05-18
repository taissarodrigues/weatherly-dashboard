import React from "react";
import { CloudSun } from "lucide-react";
import { useWeather } from "../../../context/weather/useWeather";
import { Card } from "../../ui/Card/Card";
import { weatherCodeMap } from "../../../utils/weatherCode";
import styles from "./CurrentWeatherCard.module.css";

export const CurrentWeatherCard: React.FC = () => {
  const {
    city,
    country,
    temperature,
    currentWeatherCode,
    humidity,
    windSpeed,
    uvIndex,
    dailyForecast,
    loading,
    error,
  } = useWeather();
  const weatherCode =
  currentWeatherCode ?? dailyForecast?.weathercode?.[0];

const weather =
  weatherCodeMap[
    weatherCode as keyof typeof weatherCodeMap
  ];

const WeatherIcon =
  weather?.icon || CloudSun;

const weatherDescription =
  weather?.description || "Clima indisponível";

  const backgroundImage = weather?.background;


  if (loading && !city) {
    return <Card className={styles.center}><span className={styles.infoText}>Carregando clima atual...</span></Card>;
  }

  if (error && !city) {
    return <Card className={styles.center}><span className={styles.errorText}>{error}</span></Card>;
  }

  if (!city) return null;

  return (
  <Card
  className={styles.mainCard}
  style={{
    "--weather-background": backgroundImage
      ? `url(${backgroundImage})`
      : "none",
  } as React.CSSProperties}
>
    
    <div className={styles.infoSection}>
      
      <div className={styles.locationContainer}>
        <h1 className={styles.cityName}>
          {city}
          {country ? `, ${country}` : ""}
        </h1>

        <p className={styles.dateText}>
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
      </div>

      <div className={styles.temperatureContainer}>
        <span className={styles.tempNumber}>
          {temperature !== null
            ? `${Math.round(temperature)}°C`
            : "--°C"}
        </span>
      </div>
      <div className={styles.weatherDescription}>
   {weatherDescription}
</div>

      {/* métricas */}

      <div className={styles.metricsGrid}>

  <div className={styles.metricItem}>
    <span className={styles.metricLabel}>Vento</span>
    <span className={styles.metricValue}>
      {windSpeed !== null
        ? `${windSpeed} km/h`
        : "-- km/h"}
    </span>
  </div>

  <span className={styles.separator}>•</span>

  <div className={styles.metricItem}>
    <span className={styles.metricLabel}>Umidade</span>
    <span className={styles.metricValue}>
      {humidity !== null
        ? `${humidity}%`
        : "--%"}
    </span>
  </div>

  <span className={styles.separator}>•</span>

  <div className={styles.metricItem}>
    <span className={styles.metricLabel}>Índice UV</span>
    <span className={styles.metricValue}>
      {uvIndex !== null
        ? uvIndex
        : "--"}
    </span>
  </div>

</div>

    </div>

  <div className={styles.visualSection}>
  <WeatherIcon
    size={120}
    className={styles.weatherIcon}
  />
</div>

  </Card>
);
};
