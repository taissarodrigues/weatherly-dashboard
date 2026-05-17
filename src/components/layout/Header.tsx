import { useState, useCallback } from "react";
import styles from "./Header.module.css";
import { useWeather } from "../../context/WeatherContext";
import { API_LINKS } from "../api_links";

const Header = () => {
  const {
    city,
    country,
    error,
    temperature,
    setCity,
    setCountry, 
    setLatitude,
    setLongitude,
  } = useWeather();

  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState<string | null>(null);


  const handleSearch = useCallback(async () => {
    if (!search.trim()) return;

    try {
      const res = await fetch(
        `${API_LINKS.geocoding}?name=${encodeURIComponent(search)}`
      );
      const data = await res.json();

      if (data.results?.length > 0) {
        const result = data.results[0];
        setCity(result.name);
        setCountry(result.country_code ?? null); 
        setLatitude(result.latitude);
        setLongitude(result.longitude);
        setSearch("");
        setSearchError(null);
      } else {
        setSearchError("Cidade não encontrada.");
      }
    } catch {
      setSearchError("Erro ao buscar cidade.");
    }
  }, [search, setCity, setCountry, setLatitude, setLongitude]);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Lapisco Weather</h1>

      <div className={styles.searchContainer}>
        <label htmlFor="city-search" className={styles.srOnly}>
          Buscar cidade
        </label>

        <input
          id="city-search"
          name="citySearch"
          className={styles.input}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Buscar cidade..."
        />
        <button className={styles.button} onClick={handleSearch}>
          Buscar
        </button>
      </div>

      {city && (
        <p className={styles.location}>
          {city}
          {country ? `, ${country}` : ""}
        </p>
      )}

      {temperature !== null && (
        <p className={styles.temperature}>{Math.round(temperature)}°C</p>
      )}

      {error && <p className={styles.error}>{error}</p>}
      {searchError && <p className={styles.error}>{searchError}</p>}
    </header>
  );
};

export default Header;
