import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { WeatherProvider } from "./context/WeatherContext";
import { ForecastProvider } from "./context/ForecastContext";
import Header from "./components/layout/Header"; 

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <ForecastProvider>
          <div className="app">
            <Header />
          </div>
        </ForecastProvider>
      </WeatherProvider>
    </ThemeProvider>
  );
};

export default App;