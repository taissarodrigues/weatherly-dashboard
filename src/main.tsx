import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/theme/ThemeContext";
import { WeatherProvider } from "./context/weather/WeatherContext";
import { preloadWeatherBackgrounds } from "./utils/weatherCode";
import "./styles/globals.css";

preloadWeatherBackgrounds();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </ThemeProvider>
  </React.StrictMode>
);
