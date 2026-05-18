import React, { useMemo } from "react";
import { useWeather } from "../../../context/weather/useWeather";
import { Card } from "../../ui/Card/Card";
import { defaultWeatherImage, weatherCodeMap } from "../../../utils/weatherCode";
import { ForecastDayItem } from "./ForecastDayItem";
import styles from "./ForecastList.module.css";

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

const formatForecastDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const weekday = date
    .toLocaleDateString("pt-BR", {
      weekday: "long",
      timeZone: "UTC",
    })
    .split("-")[0];
  const day = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    timeZone: "UTC",
  });
  const month = date
    .toLocaleDateString("pt-BR", {
      month: "short",
      timeZone: "UTC",
    })
    .replace(".", "");

  return `${capitalize(weekday)}, ${day} de ${month}`;
};

export const ForecastList: React.FC = () => {
  const { dailyForecast, city } = useWeather();

  const daysList = useMemo(() => {
    if (!dailyForecast?.time) return [];

    return dailyForecast.time.slice(0, 7).map((dateStr, index) => {
      const code = dailyForecast.weathercode?.[index];
      const weatherInfo = weatherCodeMap[code as keyof typeof weatherCodeMap];

      return {
        id: dateStr,
        date: formatForecastDate(dateStr),
        max: Math.round(dailyForecast.temperature_2m_max?.[index] ?? 0),
        min: Math.round(dailyForecast.temperature_2m_min?.[index] ?? 0),
        image: weatherInfo?.image || defaultWeatherImage,
        description: weatherInfo?.description || "Clima",
      };
    });
  }, [dailyForecast]);

  if (!city || !dailyForecast) return null;

  return (
    <Card className={styles.forecastCard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Previsão 7 dias</h3>
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
    </Card>
  );
};
