import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudLightning,
  CloudFog,
} from "lucide-react";

const sunnyImage = new URL("../assets/weather/sunny.svg", import.meta.url).href;
const partlyCloudyImage = new URL("../assets/weather/partly-cloudy.svg", import.meta.url).href;
const cloudyImage = new URL("../assets/weather/cloudy.svg", import.meta.url).href;
const rainImage = new URL("../assets/weather/rain.svg", import.meta.url).href;
const stormImage = new URL("../assets/weather/storm.svg", import.meta.url).href;
const fogImage = new URL("../assets/weather/fog.svg", import.meta.url).href;

export const defaultWeatherImage = partlyCloudyImage;

const sunnyBg =
  "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const clearBg =
  "https://plus.unsplash.com/premium_photo-1727730047398-49766e915c1d?q=80&w=3012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const partlyCloudyBg =
  "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1400&q=70";

const cloudyBg =
  "https://images.unsplash.com/photo-1532178910-7815d6919875?auto=format&fit=crop&w=1400&q=70";

const fogBg =
  "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?auto=format&fit=crop&w=1400&q=70";

const drizzleBg =
  "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1400&q=70";

const lightRainBg =
  "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1400&q=70";

const heavyRainBg =
  "https://images.unsplash.com/photo-1501691223387-dd0500403074?auto=format&fit=crop&w=1400&q=70";

const showerBg =
  "https://images.unsplash.com/photo-1498847559558-1e4b1a7f7a2f?auto=format&fit=crop&w=1400&q=70";

const stormBg =
  "https://images.unsplash.com/photo-1500674425229-f692875b0ab7?auto=format&fit=crop&w=1400&q=70";

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
