// frontend/src/components/organisms/Header/Header.tsx
import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { Button } from '../../atoms/Button/Button';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { theme, setTheme, themes } = useTheme();
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <span className={styles.logoIcon}>{'</>'}</span>
          <h1 className={styles.logoText}>SnipShare</h1>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          <a href="/" className={styles.navLink}>
            Accueil
          </a>
          <a href="/explore" className={styles.navLink}>
            Explorer
          </a>
          <a href="/create" className={styles.navLink}>
            Créer
          </a>
        </nav>

        {/* Theme Selector */}
        <div className={styles.themeSelector}>
          <Button
            variant="outline"
            onClick={() => setThemeMenuOpen(!themeMenuOpen)}
            className={styles.themeButton}
          >
            🎨 Thème
          </Button>
          
          {themeMenuOpen && (
            <div className={styles.themeMenu}>
              {themes.map((t) => (
                <button
                  key={t.name}
                  className={`${styles.themeOption} ${theme === t.name ? styles.active : ''}`}
                  onClick={() => {
                    setTheme(t.name);
                    setThemeMenuOpen(false);
                  }}
                >
                  <span className={styles.themeIcon}>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};