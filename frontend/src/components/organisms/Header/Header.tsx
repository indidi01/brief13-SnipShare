// frontend/src/components/organisms/Header/Header.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '../../atoms/Button/Button';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { LogIn, UserPlus, User, LogOut, Settings } from 'lucide-react';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { theme, setTheme, themes } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

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
          {isAuthenticated && (
            <Link to="/create" className={styles.navLink}>
              Créer
            </Link>
          )}
        </nav>

        {/* Right Section */}
        <div className={styles.rightSection}>
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

          {/* User Section */}
          {isAuthenticated && user ? (
            <div className={styles.userSection}>
              <button
                className={styles.userButton}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <Avatar name={user.pseudo} size="sm" />
                <span className={styles.userName}>{user.pseudo}</span>
              </button>

              {userMenuOpen && (
                <div className={styles.userMenu}>
                  <div className={styles.userMenuHeader}>
                    <Avatar name={user.pseudo} size="md" />
                    <div className={styles.userMenuInfo}>
                      <span className={styles.userMenuName}>{user.pseudo}</span>
                      <span className={styles.userMenuEmail}>{user.email}</span>
                    </div>
                  </div>

                  <div className={styles.userMenuDivider} />

                  <button
                    className={styles.userMenuItem}
                    onClick={() => {
                      navigate('/profile');
                      setUserMenuOpen(false);
                    }}
                  >
                    <User size={18} />
                    <span>Mon profil</span>
                  </button>

                  <button
                    className={styles.userMenuItem}
                    onClick={() => {
                      navigate('/settings');
                      setUserMenuOpen(false);
                    }}
                  >
                    <Settings size={18} />
                    <span>Paramètres</span>
                  </button>

                  <div className={styles.userMenuDivider} />

                  <button
                    className={`${styles.userMenuItem} ${styles.logout}`}
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    <span>Déconnexion</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
                icon={<LogIn size={18} />}
              >
                Connexion
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate('/register')}
                icon={<UserPlus size={18} />}
              >
                Inscription
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};