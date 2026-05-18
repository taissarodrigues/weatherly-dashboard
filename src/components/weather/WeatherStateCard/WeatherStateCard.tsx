import React from "react";
import { AlertTriangle, LoaderCircle, RefreshCw, Search } from "lucide-react";
import { Button } from "../../ui/Button/Button";
import { Card } from "../../ui/Card/Card";
import styles from "./WeatherStateCard.module.css";

type WeatherStateVariant = "loading" | "error" | "empty";

interface WeatherStateCardProps {
  variant: WeatherStateVariant;
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const stateContent = {
  loading: {
    icon: LoaderCircle,
    title: "Carregando clima...",
    message: "Estamos buscando os dados climáticos mais recentes. Isso pode levar alguns segundos.",
  },
  error: {
    icon: AlertTriangle,
    title: "Ops! Algo deu errado.",
    message: "Não foi possível carregar os dados climáticos. Verifique sua conexão e tente novamente.",
  },
  empty: {
    icon: Search,
    title: "Pesquise uma cidade para ver o clima",
    message: "Digite o nome de uma cidade na busca ou use sua localização atual.",
  },
};

export const WeatherStateCard: React.FC<WeatherStateCardProps> = ({
  variant,
  title,
  message,
  actionLabel,
  onAction,
}) => {
  const content = stateContent[variant];
  const Icon = content.icon;

  return (
    <Card className={`${styles.stateCard} ${styles[variant]}`}>
      <div className={styles.iconShell}>
        <Icon className={styles.icon} size={34} />
      </div>

      <div className={styles.copy}>
        <h2 className={styles.title}>{title ?? content.title}</h2>
        <p className={styles.message}>{message ?? content.message}</p>
      </div>

      {onAction && (
        <Button className={styles.actionButton} onClick={onAction}>
          <RefreshCw size={16} />
          {actionLabel ?? "Tentar novamente"}
        </Button>
      )}
    </Card>
  );
};
