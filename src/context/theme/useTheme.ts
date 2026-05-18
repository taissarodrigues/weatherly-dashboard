import { useContext } from "react";
import { ThemeContext } from "./ThemeContextValue";
import type { ThemeContextType } from "./ThemeContextValue";

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  return context;
};
