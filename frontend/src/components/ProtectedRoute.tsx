// frontend/src/components/ProtectedRoute.tsx - VERSION CORRIGÉE
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, setAuthModalOpen } = useAuth();

  useEffect(() => {
    // Si l'utilisateur n'est pas authentifié et n'est pas en train de charger, ouvrir la modal
    if (!isLoading && !isAuthenticated) {
      setAuthModalOpen(true);
    }
  }, [isAuthenticated, isLoading, setAuthModalOpen]);

  // Afficher un loader pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontSize: '1.5rem',
        color: 'var(--text-secondary)'
      }}>
        Chargement...
      </div>
    );
  }

  // Afficher le contenu de la route si authentifié
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Si non authentifié, afficher un message en attendant que la modal s'ouvre
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      fontSize: '1.125rem',
      color: 'var(--text-secondary)'
    }}>
      Veuillez vous connecter pour accéder à cette page...
    </div>
  );
};