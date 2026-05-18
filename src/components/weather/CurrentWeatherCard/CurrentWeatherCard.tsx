import React from "react";
import { useWeather } from "../../../context/weather/useWeather";
import { Card } from "../../ui/Card/Card";
import { defaultWeatherImage, weatherCodeMap } from "../../../utils/weatherCode";
import { WeatherStateCard } from "../WeatherStateCard/WeatherStateCard";
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
    retryWeather,
  } = useWeather();
  const weatherCode =
  currentWeatherCode ?? dailyForecast?.weathercode?.[0];

const weather =
  weatherCodeMap[
    weatherCode as keyof typeof weatherCodeMap
  ];

const weatherImage =
  weather?.image || defaultWeatherImage;

const weatherDescription =
  weather?.description || "Clima indisponível";

      const backgroundImage = weather?.background;


  const hasWeatherData = temperature !== null || dailyForecast !== null;

  if (loading && !hasWeatherData) {
    return <WeatherStateCard variant="loading" />;
  }

  if (error && !hasWeatherData) {
    return (
      <WeatherStateCard
        variant="error"
        message={error}
        onAction={retryWeather}
      />
    );
  }

  if (!city) {
    return <WeatherStateCard variant="empty" />;
  }

  if (!hasWeatherData) {
    return <WeatherStateCard variant="loading" />;
  }

  return (
  <Card
  className={`${styles.mainCard} ${loading ? styles.updating : ""}`}
  style={{
    "--weather-background": backgroundImage
      ? `url(${backgroundImage})`
      : "none",
  } as React.CSSProperties}
>
    {loading && <span className={styles.updateBadge}>Atualizando...</span>}
    
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
  <img
    src={weatherImage}
    alt={weatherDescription}
    className={styles.weatherIcon}
  />
</div>

  </Card>
);
};
