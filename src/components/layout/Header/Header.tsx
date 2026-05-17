import React, { useState } from "react";
import { useWeather } from "../../../context/WeatherContext";
import { useTheme } from "../../../context/ThemeContext";
import { Input } from "../../ui/Input/Input";
import { Button } from "../../ui/Button/Button";
// 1. IMPORTAMOS OS ÍCONES DA BIBLIOTECA
import { Search, Navigation, Sun, Moon, ChevronDown } from "lucide-react";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  const { setCity } = useWeather();
  const { isDark, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim()) {
      setCity(search.trim());
      setSearch("");
    }
  };

  return (
    <header className={styles.headerContainer}>
      {/* BARRA DE BUSCA (Esquerda) */}
      <div className={styles.searchSection}>
        <label htmlFor="city-search" className={styles.srOnly}>Buscar cidade</label>
        <Input
          id="city-search"
          name="citySearch"
          placeholder="Buscar cidade..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          icon={<Search size={20} />}
        />
      </div>

      { /* icons de ação e perfil do user */ }
      <div className={styles.actionsSection}>
        
        {/* botao para atualizar localizacao */}
        <Button variant="icon" title="Minha Localização">
          <Navigation size={20}  />
        </Button>

        {/* botao p alterar tema*/}
        <Button variant="icon" onClick={toggleTheme} title="Alternar Tema">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </Button>

    

        <div className={styles.divider} />

        {/* bloco de Perfil da Taissa */}
        <div className={styles.profileBlock}>
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80" 
            alt="Foto de Perfil do user" 
            className={styles.avatar} 
          />
          <div className={styles.profileInfo}>
            <span className={styles.profileName}>Taissa</span>
            <span className={styles.profileRole}>Premium</span>
          </div>
          <ChevronDown size={16} className={styles.arrowIcon} />
        </div>

      </div>
    </header>
  );
};