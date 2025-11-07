// frontend/src/components/organisms/LoginModal/LoginModal.tsx
import React, { useState } from 'react';
import { X, Mail, Lock } from 'lucide-react';
import { Input } from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Button';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './LoginModal.module.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleClose = () => {
    setFormData({ email: '', password: '' });
    setError('');
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(formData);
      handleClose();
      // Optionnel: redirection après connexion
      // navigate('/profile');
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = () => {
    handleClose();
    navigate('/register'); // Redirige vers la page d'inscription
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={handleClose} />

      {/* Modal */}
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            🔐 Connexion
          </h2>
          <button className={styles.closeButton} onClick={handleClose}>
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className={styles.modalContent}>
          {error && (
            <div className={styles.errorAlert}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="votre@email.com"
              icon={<Mail size={20} />}
              fullWidth
              required
            />

            <Input
              label="Mot de passe"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              icon={<Lock size={20} />}
              fullWidth
              required
            />

            <div className={styles.forgotPassword}>
              <a href="#" className={styles.forgotLink}>
                Mot de passe oublié ?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
            >
              Se connecter
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <p className={styles.footerText}>
            Pas encore de compte ?{' '}
            <button 
              onClick={handleRegisterClick}
              className={styles.registerLink}
            >
              Créer un compte
            </button>
          </p>
        </div>
      </div>
    </>
  );
};