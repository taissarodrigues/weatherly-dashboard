import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WeatherProvider } from './context/WeatherContext.tsx'
import { ForecastProvider } from './context/ForecastContext.tsx' // ← adiciona isso

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WeatherProvider>
      <ForecastProvider>
        <App />
      </ForecastProvider>
    </WeatherProvider>
  </React.StrictMode>,
)