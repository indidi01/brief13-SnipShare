// frontend/src/components/organisms/Header/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '../../atoms/Button/Button';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { LoginModal } from '../AuthModal/AuthModal';
import { LogIn, LogOut } from 'lucide-react';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  
  const { user, isAuthenticated, logout } = useAuth();

  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
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



            {/* Auth Actions */}
            {isAuthenticated && user ? (
              <div className={styles.userMenu}>
                <Link to="/profile" className={styles.userProfile}>
                  <Avatar name={user.pseudo} size="sm" />
                  <span className={styles.userName}>{user.pseudo}</span>
                </Link>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  icon={<LogOut size={18} />}
                  className={styles.logoutButton}
                >
                  Déconnexion
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                onClick={() => setLoginModalOpen(true)}
                icon={<LogIn size={18} />}
              >
                Connexion
              </Button>
            )}
          </div>
      </header>

      {/* Modal de connexion */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  );
};