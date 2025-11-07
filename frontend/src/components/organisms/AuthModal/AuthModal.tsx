// frontend/src/components/organisms/AuthModal/AuthModal.tsx
import React, { useState } from 'react';
import { X, Mail, Lock, User, LogIn, UserPlus } from 'lucide-react';
import { Input } from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Button';
import { useAuth } from '../../../contexts/AuthContext';

import styles from './AuthModal.module.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    pseudo: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleClose = () => {
    setFormData({ pseudo: '', email: '', password: '', confirmPassword: '' });
    setError('');
    setErrors({});
    setIsLoginMode(true);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear errors
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (error) {
      setError('');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validation commune
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    // Validation spécifique à l'inscription
    if (!isLoginMode) {
      if (!formData.pseudo.trim()) {
        newErrors.pseudo = 'Le pseudo est requis';
      } else if (formData.pseudo.length < 3) {
        newErrors.pseudo = 'Le pseudo doit contenir au moins 3 caractères';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Veuillez confirmer le mot de passe';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      if (isLoginMode) {
        await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        await register({
          pseudo: formData.pseudo,
          email: formData.email,
          password: formData.password,
        });
      }
      handleClose();
      // Optionnel: redirection après authentification
      // navigate('/profile');
    } catch (err) {
      setError(
        isLoginMode 
          ? 'Email ou mot de passe incorrect'
          : 'Erreur lors de l\'inscription. L\'email ou le pseudo est peut-être déjà utilisé.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({
      pseudo: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
    setError('');
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
          <div className={styles.titleSection}>
            <div className={styles.modalIcon}>
              {isLoginMode ? <LogIn size={24} /> : <UserPlus size={24} />}
            </div>
            <h2 className={styles.modalTitle}>
              {isLoginMode ? 'Connexion' : 'Inscription'}
            </h2>
          </div>
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
            {/* Champ pseudo uniquement en mode inscription */}
            {!isLoginMode && (
              <Input
                label="Pseudo"
                type="text"
                name="pseudo"
                value={formData.pseudo}
                onChange={handleInputChange}
                placeholder="Votre pseudo"
                icon={<User size={20} />}
                error={errors.pseudo}
                fullWidth
                required
              />
            )}

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="votre@email.com"
              icon={<Mail size={20} />}
              error={errors.email}
              fullWidth
              required
            />

            <Input
              label="Mot de passe"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              icon={<Lock size={20} />}
              error={errors.password}
              fullWidth
              required
            />

            {/* Champ confirmation mot de passe uniquement en mode inscription */}
            {!isLoginMode && (
              <Input
                label="Confirmer le mot de passe"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                icon={<Lock size={20} />}
                error={errors.confirmPassword}
                fullWidth
                required
              />
            )}

            {/* Lien mot de passe oublié uniquement en mode connexion */}
            {isLoginMode && (
              <div className={styles.forgotPassword}>
                <a href="#" className={styles.forgotLink}>
                  Mot de passe oublié ?
                </a>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoginMode ? 'Se connecter' : 'Créer un compte'}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <p className={styles.footerText}>
            {isLoginMode ? 'Pas encore de compte ?' : 'Déjà un compte ?'}{' '}
            <button 
              type="button"
              onClick={switchMode}
              className={styles.switchLink}
            >
              {isLoginMode ? 'Créer un compte' : 'Se connecter'}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};