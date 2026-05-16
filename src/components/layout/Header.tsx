import React, { useState } from 'react';
import styles from './Header.module.css';
import { useWeather } from '../../context/WeatherContext';
import { API_LINKS } from '../api_links';

const Header = () => {
  const { city, country, error, setCity } = useWeather();
  const [search, setSearch] = useState('');
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!search.trim()) return;

    try {
      const res = await fetch(`${API_LINKS.geocoding}?name=${search}`);
      const data = await res.json();
            console.log("Geocoding retornou:", data);


      if (data.results?.length > 0) {
        setCity(data.results[0].name); 
        setSearch('');
        setSearchError(null);
      } else {
        setSearchError('Cidade não encontrada.');
      }
    } catch {
      setSearchError('Erro ao buscar cidade.');
    }
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Lapisco Weather</h1>

      {/* input de busca */}
      <div className={styles.searchContainer}>
        <input
          className={styles.input}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Buscar cidade..."
        />
        <button className={styles.button} onClick={handleSearch}>
          Buscar
        </button>
      </div>

      {/* cidade atual */}
      {city && (
        <p className={styles.location}>
          {city}{country ? `, ${country}` : ''}
        </p>
      )}

      {/* Erros */}
      {error && <p className={styles.error}>{error}</p>}
      {searchError && <p className={styles.error}>{searchError}</p>}
    </header>
  );
};

export default Header;