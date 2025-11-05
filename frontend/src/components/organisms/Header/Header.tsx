// frontend/src/components/organisms/Header/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>{'</>'}</span>
          <h1 className={styles.logoText}>SnipShare</h1>
        </Link>

        {/* Navigation */}
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Accueil
          </Link>
          <Link to="/explore" className={styles.navLink}>
            Explorer
          </Link>
          <Link to="/create" className={styles.navLink}>
            Créer
          </Link>
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