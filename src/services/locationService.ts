import { API_LINKS } from "../config/apiLinks";

export interface CitySearchResult {
  id: number;
  name: string;
  country?: string;
  country_code?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

interface GeocodingResponse {
  results?: CitySearchResult[];
}

export interface IpLocation {
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

export const searchCities = async (
  cityName: string,
  count = 5,
  signal?: AbortSignal
): Promise<CitySearchResult[]> => {
  const params = new URLSearchParams({
    name: cityName,
    count: String(count),
    language: "pt",
    format: "json",
  });

  const response = await fetch(`${API_LINKS.geocoding}?${params}`, { signal });

  if (!response.ok) {
    throw new Error("Erro ao buscar cidades");
  }

  const data = (await response.json()) as GeocodingResponse;
  return data.results ?? [];
};

export const getIpLocation = async (): Promise<IpLocation> => {
  const response = await fetch(API_LINKS.ipLocation);

  if (!response.ok) {
    throw new Error("Erro ao buscar localização");
  }

  return response.json() as Promise<IpLocation>;
};
