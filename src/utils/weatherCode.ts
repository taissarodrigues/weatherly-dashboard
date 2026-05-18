import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudLightning,
  CloudFog,
} from "lucide-react";

const sunnyImage = new URL("../assets/weather/sunny.svg", import.meta.url).href;
const partlyCloudyImage = new URL("../assets/weather/partly-cloudy.png", import.meta.url).href;
const cloudyImage = new URL("../assets/weather/cloudy.svg", import.meta.url).href;
const rainImage = new URL("../assets/weather/rain.svg", import.meta.url).href;
const stormImage = new URL("../assets/weather/storm.svg", import.meta.url).href;
const fogImage = new URL("../assets/weather/fog.svg", import.meta.url).href;

// códigos seguem a tabela WMO usada pela API Open-Meteo.
export const defaultWeatherImage = partlyCloudyImage;

const sunnyBg =
  "https://images.unsplash.com/photo-1541119638723-c51cbe2262aa?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const clearBg =
  "https://plus.unsplash.com/premium_photo-1727730047398-49766e915c1d?q=80&w=3012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const partlyCloudyBg =
  "https://images.unsplash.com/photo-1714674972847-030816cca987?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const cloudyBg =
  "https://images.unsplash.com/photo-1532178910-7815d6919875?auto=format&fit=crop&w=1400&q=70";

const fogBg =
  "https://images.unsplash.com/photo-1486707471592-8e7eb7e36f78?q=80&w=1094&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const drizzleBg =
  "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1400&q=70";

const lightRainBg =
  "https://images.pexels.com/photos/18932546/pexels-photo-18932546.jpeg";

const heavyRainBg =
  "https://images.unsplash.com/photo-1501691223387-dd0500403074?auto=format&fit=crop&w=1400&q=70";

const showerBg =
  "https://images.unsplash.com/photo-1498847559558-1e4b1a7f7a2f?auto=format&fit=crop&w=1400&q=70";

const stormBg =
  "https://images.unsplash.com/photo-1527572232473-494f1e9c7917?q=80&w=727&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const weatherBackgrounds = [
  sunnyBg,
  clearBg,
  partlyCloudyBg,
  cloudyBg,
  fogBg,
  drizzleBg,
  lightRainBg,
  heavyRainBg,
  showerBg,
  stormBg,
];

export const preloadWeatherBackgrounds = () => {
  weatherBackgrounds.forEach((background) => {
    const image = new Image();
    image.src = background;
  });
};


export const weatherCodeMap = {

  // Céu limpo

  0: {
    description: "Ensolarado",
    icon: Sun,
    image: sunnyImage,
    background: sunnyBg,
  },

  1: {
    description: "Principalmente limpo",
    icon: CloudSun,
    image: partlyCloudyImage,
    background: clearBg,
  },

  2: {
    description: "Parcialmente nublado",
    icon: CloudSun,
    image: partlyCloudyImage,
    background: partlyCloudyBg,
  },

  3: {
    description: "Nublado",
    icon: Cloud,
    image: cloudyImage,
    background: cloudyBg,
  },


  // Neblina

  45: {
    description: "Neblina",
    icon: CloudFog,
    image: fogImage,
    background: fogBg,
  },

  48: {
    description: "Neblina intensa",
    icon: CloudFog,
    image: fogImage,
    background: fogBg,
  },


  // Garoa

  51: {
    description: "Garoa leve",
    icon: CloudRain,
    image: rainImage,
    background: drizzleBg,
  },

  53: {
    description: "Garoa moderada",
    icon: CloudRain,
    image: rainImage,
    background: drizzleBg,
  },

  55: {
    description: "Garoa intensa",
    icon: CloudRain,
    image: rainImage,
    background: lightRainBg,
  },


  // Chuva

  61: {
    description: "Chuva leve",
    icon: CloudRain,
    image: rainImage,
    background: lightRainBg,
  },

  63: {
    description: "Chuva moderada",
    icon: CloudRain,
    image: rainImage,
    background: heavyRainBg,
  },

  65: {
    description: "Chuva forte",
    icon: CloudRain,
    image: rainImage,
    background: heavyRainBg,
  },


  // Pancadas

  80: {
    description: "Pancadas de chuva",
    icon: CloudRain,
    image: rainImage,
    background: showerBg,
  },

  81: {
    description: "Pancadas moderadas",
    icon: CloudRain,
    image: rainImage,
    background: showerBg,
  },

  82: {
    description: "Pancadas fortes",
    icon: CloudRain,
    image: stormImage,
    background: stormBg,
  },


  // tempestade

  95: {
    description: "Tempestade",
    icon: CloudLightning,
    image: stormImage,
    background: stormBg,
  },

  96: {
    description: "Tempestade com granizo",
    icon: CloudLightning,
    image: stormImage,
    background: stormBg,
  },

  99: {
    description: "Tempestade severa",
    icon: CloudLightning,
    image: stormImage,
    background: stormBg,
  },

};
