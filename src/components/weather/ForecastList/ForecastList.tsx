import React, { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { useWeather } from "../../../context/weather/useWeather";
import { Card } from "../../ui/Card/Card";
import { defaultWeatherImage, weatherCodeMap } from "../../../utils/weatherCode";
import { ForecastDayItem } from "./ForecastDayItem";
import styles from "./ForecastList.module.css";

export const ForecastList: React.FC = () => {
  const { dailyForecast, loading, city } = useWeather();

  const daysList = useMemo(() => {
    if (!dailyForecast?.time) return [];

    return dailyForecast.time.slice(0, 7).map((dateStr, index) => {
      const code = dailyForecast.weathercode?.[index];
      const weatherInfo = weatherCodeMap[code as keyof typeof weatherCodeMap];

      return {
        id: dateStr,
        date: dateStr,
        max: Math.round(dailyForecast.temperature_2m_max?.[index] ?? 0),
        min: Math.round(dailyForecast.temperature_2m_min?.[index] ?? 0),
        image: weatherInfo?.image || defaultWeatherImage,
        description: weatherInfo?.description || "Clima",
      };
    });
  }, [dailyForecast]);

  if (!city || loading) return null;

  return (
    <Card className={styles.forecastCard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Previsão 7 dias</h3>
        <button type="button" className={styles.headerLink}>
          Ver detalhes
        </button>
      </div>

      <ul className={styles.listContainer}>
        {daysList.map(({ id, date, max, min, image, description }, index) => (
          <ForecastDayItem
            key={id}
            date={date}
            description={description}
            max={max}
            min={min}
            image={image}
            featured={index === 0}
          />
        ))}
      </ul>

      <button type="button" className={styles.footerButton}>
        Ver previsão completa
        <ArrowRight size={16} className={styles.arrowFooter} />
      </button>
    </Card>
  );
};
