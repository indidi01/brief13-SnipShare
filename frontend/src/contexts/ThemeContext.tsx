// frontend/src/contexts/ThemeContext.tsx
import React, { createContext, useState, useEffect, useContext, type ReactNode } from 'react';

export type ThemeName = 'light' | 'dark' | 'nord' | 'cyber' | 'nature' | 'sunset';

export interface ThemeConfig {
  name: ThemeName;
  label: string;
  icon: string;
}

export const AVAILABLE_THEMES: ThemeConfig[] = [
  { name: 'light', label: 'Clair', icon: '☀️' },
  { name: 'dark', label: 'Sombre', icon: '🌙' },
  { name: 'nord', label: 'Nordique', icon: '❄️' },
  { name: 'cyber', label: 'Cyberpunk', icon: '🤖' },
  { name: 'nature', label: 'Nature', icon: '🌿' },
  { name: 'sunset', label: 'Sunset', icon: '🌅' },
];

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    const savedTheme = localStorage.getItem('snipshare-theme');
    return (savedTheme as ThemeName) || 'light';
  });

  useEffect(() => {
    // Supprimer toutes les classes de thème
    document.body.className = document.body.className
      .split(' ')
      .filter(c => !c.startsWith('theme-'))
      .join(' ');
    
    // Ajouter la nouvelle classe (sauf pour light qui est par défaut)
    if (theme !== 'light') {
      document.body.classList.add(`theme-${theme}`);
    }
    
    // Sauvegarder dans localStorage
    localStorage.setItem('snipshare-theme', theme);
  }, [theme]);

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: AVAILABLE_THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme doit être utilisé dans un ThemeProvider');
  }
  return context;
};