import React from "react";
import { DashboardLayout } from "./components/layout/DashboardLayout/DashboardLayout";
import { Header } from "./components/layout/Header/Header";
import { CurrentWeatherCard } from "./components/weather/CurrentWeatherCard/CurrentWeatherCard";
import { ForecastChart } from "./components/weather/ForecastChart/ForecastChart";
import { ForecastList } from "./components/weather/ForecastList/ForecastList";

const App: React.FC = () => {
  return (
    <DashboardLayout
      header={<Header />}
      mainContent={
        <>
          <CurrentWeatherCard />
          <ForecastChart />
        </>
      }
      sidebarContent={
        <>
          <ForecastList />
        </>
      }
    />
  );
};

export default App;
