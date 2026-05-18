import React from "react";
import styles from "./ForecastList.module.css";

interface ForecastDayItemProps {
  date: string;
  description: string;
  max: number;
  min: number;
  image: string;
  featured?: boolean;
}

const formatForecastDate = (date: string) => {
  const formatted = new Date(date).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });

  return formatted
    .replace(".", "")
    .replace(/^\w/, (letter) => letter.toUpperCase());
};

export const ForecastDayItem: React.FC<ForecastDayItemProps> = ({
  date,
  description,
  max,
  min,
  image,
  featured = false,
}) => {
  return (
    <li className={`${styles.dayRow} ${featured ? styles.featuredRow : ""}`}>
      <div className={styles.iconWrapper} title={description}>
        <img src={image} alt={description} className={styles.weatherIcon} />
      </div>

      <div className={styles.infoBlock}>
        <span className={styles.dayName}>{formatForecastDate(date)}</span>
        <span className={styles.weatherDescription}>{description}</span>
      </div>

      <div className={styles.tempRange}>
        <span className={styles.maxTemp}>{max}°</span>
        <span className={styles.tempDivider}>/</span>
        <span className={styles.minTemp}>{min}°</span>
      </div>
    </li>
  );
};
