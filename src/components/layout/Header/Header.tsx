import React, { useCallback, useEffect, useState } from "react";
import { useWeather } from "../../../context/weather/useWeather";
import { useTheme } from "../../../context/theme/useTheme";
import { Input } from "../../ui/Input/Input";
import { Button } from "../../ui/Button/Button";
import { getIpLocation, searchCities } from "../../../services/locationService";
import type { CitySearchResult } from "../../../services/locationService";
import { Search, Navigation, Sun, Moon } from "lucide-react";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  const { setCity, setCountry, setLatitude, setLongitude } = useWeather();
  const { isDark, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");
  const [cityOptions, setCityOptions] = useState<CitySearchResult[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const cityName = search.trim();

    if (cityName.length < 2) {
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      try {
        const results = await searchCities(cityName, 5, controller.signal);
        setCityOptions(results);
        setSearchError(null);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setCityOptions([]);
        setSearchError("Erro ao buscar opções.");
      }
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [search]);

  const selectCity = useCallback((cityOption: CitySearchResult) => {
    setCity(cityOption.name);
    setCountry(cityOption.country_code ?? null);
    setLatitude(cityOption.latitude);
    setLongitude(cityOption.longitude);
    setSearch("");
    setCityOptions([]);
    setSearchError(null);
  }, [setCity, setCountry, setLatitude, setLongitude]);

  const handleUseCurrentLocation = useCallback(async () => {
    setLocationLoading(true);
    setSearchError(null);

    try {
      const data = await getIpLocation();

      setCity(data.city ?? "Minha localização");
      setCountry(data.country ?? null);
      setLatitude(data.latitude ?? null);
      setLongitude(data.longitude ?? null);
      setSearch("");
      setCityOptions([]);
    } catch {
      setSearchError("Não foi possível detectar sua localização.");
    } finally {
      setLocationLoading(false);
    }
  }, [setCity, setCountry, setLatitude, setLongitude]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearch(value);

    if (value.trim().length < 2) {
      setCityOptions([]);
      setSearchError(null);
    }
  };

  const handleSearch = async () => {
    const cityName = search.trim();

    if (!cityName || isSearching) return;

    setIsSearching(true);
    try {
      if (cityOptions.length > 0) {
        selectCity(cityOptions[0]);
        return;
      }

      const result = (await searchCities(cityName, 1))[0];

      if (!result) {
        setSearchError("Cidade não encontrada.");
        return;
      }

      selectCity(result);
    } catch {
      setSearchError("Erro ao buscar cidade.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <header className={styles.headerContainer}>
      {/* campo de busca de cidade */}
      <div className={styles.searchSection}>
        <label htmlFor="city-search" className={styles.srOnly}>Buscar cidade</label>
        <div className={styles.searchRow}>
          <div className={styles.searchBox}>
            <Input
              id="city-search"
              name="citySearch"
              placeholder="Buscar cidade..."
              value={search}
              onChange={handleSearchChange}
              onKeyDown={(e) => e.key === "Enter" && !isSearching && handleSearch()}
              autoComplete="off"
              icon={<Search size={20} />}
            />

            {cityOptions.length > 0 && (
              <ul className={styles.optionsList}>
                {cityOptions.map((cityOption) => (
                  <li key={`${cityOption.id}-${cityOption.latitude}-${cityOption.longitude}`}>
                    <button
                      type="button"
                      className={styles.optionButton}
                      onClick={() => selectCity(cityOption)}
                      disabled={isSearching}
                    >
                      <span className={styles.optionName}>{cityOption.name}</span>
                      <span className={styles.optionMeta}>
                        {[cityOption.admin1, cityOption.country].filter(Boolean).join(", ")}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {searchError && <span className={styles.searchError}>{searchError}</span>}
      </div>

      <div className={styles.actionsSection}>
        <Button
          variant="icon"
          title="Minha Localização"
          onClick={handleUseCurrentLocation}
          disabled={locationLoading}
        >
          <Navigation size={20} />
        </Button>

        <Button variant="icon" onClick={toggleTheme} title="Alternar Tema">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </Button>

        <div className={styles.divider} />
      </div>
    </header>
  );
};
