import React from "react";
import { DashboardLayout } from "./components/layout/DashboardLayout/DashboardLayout";
import { Header } from "./components/layout/Header/Header";
import { CurrentWeatherCard } from "./components/weather/CurrentWeatherCard/CurrentWeatherCard";

const App: React.FC = () => {
  return (
    <DashboardLayout
      header={<Header />}
      
      mainContent={
        <>
          {<CurrentWeatherCard />}
          {/* <WeatherStats /> */}
          {/* <ForecastChart /> */}
          <div style={{ padding: "20px", background: "var(--color-surface-soft)", borderRadius: "var(--radius-lg)" }}>
            Área Principal (Clima Atual e Gráficos)
          </div>
        </>
      }
      
      // 3. O conteúdo da direita (Previsão de 7 dias)
      sidebarContent={
        <>
          {/* <ForecastList /> */}
          <div style={{ padding: "20px", background: "var(--color-surface-soft)", borderRadius: "var(--radius-lg)" }}>
            Barra Lateral (Previsão 7 Dias)
          </div>
        </>
      }
    />
  );
};

export default App;
