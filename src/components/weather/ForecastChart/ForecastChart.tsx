import React, { useMemo } from "react";
import { useWeather } from "../../../context/weather/useWeather";
import { Card } from "../../ui/Card/Card";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import styles from "./ForecastChart.module.css";

interface ChartPoint {
  name: string;
  max: number;
  min: number;
}

interface ForecastTooltipProps {
  active?: boolean;
  label?: string;
  payload?: Array<{
    dataKey?: string | number;
    name?: string;
    value?: number;
  }>;
}

const ForecastTooltip = ({ active, payload, label }: ForecastTooltipProps) => {
  if (!active || !payload?.length) return null;

  return (
    <div className={styles.tooltip}>
      <strong className={styles.tooltipTitle}>{label}</strong>
      {payload.map((item) => (
        <span key={item.dataKey} className={styles.tooltipItem}>
          {item.name}: {item.value}°C
        </span>
      ))}
    </div>
  );
};

export const ForecastChart: React.FC = () => {
  const { dailyForecast, loading, city, country } = useWeather();

  const chartData = useMemo(() => {
    if (!dailyForecast?.time) return [];

    return dailyForecast.time
      .slice(0, 7)
      .map((dateStr, index) => {

        const formattedDate =
          new Date(dateStr).toLocaleDateString(
            "pt-BR",
            {
              weekday: "short",
              day: "numeric",
              timeZone: "UTC",
            }
          );

        return {
          name: formattedDate,
          max: Math.round(
            dailyForecast.temperature_2m_max?.[index] ?? 0
          ),
          min: Math.round(
            dailyForecast.temperature_2m_min?.[index] ?? 0
          ),
        };
      });

  }, [dailyForecast]) satisfies ChartPoint[];

  if (!city || loading) return null;

  return (
    <Card className={styles.chartCard}>

      <div className={styles.chartHeader}>
        <div>
          <h3 className={styles.chartTitle}>
            Previsão máxima e mínima
          </h3>

          <p className={styles.chartSub}>
            Variação dos próximos 7 dias
          </p>
        </div>

        <p className={styles.displaying}>
          Exibindo: <span>{city}{country ? `, ${country}` : ""}</span>
        </p>
      </div>

      <div className={styles.chartContainer}>

        <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 16, right: 12, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="maxTemperature" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.24} />
              <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.02} />
            </linearGradient>

            <linearGradient id="minTemperature" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary-light)" stopOpacity={0.18} />
              <stop offset="95%" stopColor="var(--color-primary-light)" stopOpacity={0.01} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="var(--color-border)"
            strokeDasharray="0"
            vertical
          />

          <XAxis
            dataKey="name"
            stroke="var(--color-text-muted)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={10}
          />

          <YAxis
            width={44}
            stroke="var(--color-text-muted)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}°`}
          />

          <Tooltip content={<ForecastTooltip />} />

          <Legend
            wrapperStyle={{
              fontSize: "12px",
              paddingTop: "16px",
            }}
          />

          <Area
            type="monotone"
            dataKey="max"
            name="Máxima"
            stroke="var(--color-primary)"
            fill="url(#maxTemperature)"
            strokeWidth={3}
            dot={{
              fill: "var(--color-surface)",
              stroke: "var(--color-primary)",
              strokeWidth: 2,
              r: 5,
            }}
            activeDot={{
              fill: "var(--color-primary)",
              stroke: "var(--color-surface)",
              strokeWidth: 2,
              r: 7,
            }}
          />

          <Area
            type="monotone"
            dataKey="min"
            name="Mínima"
            stroke="var(--color-primary-light)"
            fill="url(#minTemperature)"
            strokeWidth={3}
            dot={{
              fill: "var(--color-surface)",
              stroke:
                "var(--color-primary-light)",
              strokeWidth: 2,
              r: 5,
            }}
            activeDot={{
              fill: "var(--color-primary-light)",
              stroke: "var(--color-surface)",
              strokeWidth: 2,
              r: 7,
            }}
          />

        </AreaChart>
        </ResponsiveContainer>

      </div>

    </Card>
  );
};
