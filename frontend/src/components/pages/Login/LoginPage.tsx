// frontend/src/components/pages/Login/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { Header } from '../../organisms/Header/Header';
import { Input } from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Button';
import { LogIn, UserPlus, Mail, Lock, User } from 'lucide-react';
import styles from './LoginPage.module.css';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    pseudo: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear errors
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (generalError) {
      setGeneralError('');
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
    setGeneralError('');

    try {
      if (isLoginMode) {
        // Connexion
        await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        // Inscription
        await register({
          pseudo: formData.pseudo,
          email: formData.email,
          password: formData.password,
        });
      }
      navigate('/'); // Redirection vers l'accueil après succès
    } catch (error) {
      setGeneralError(
        isLoginMode 
          ? 'Email ou mot de passe incorrect'
          : 'Erreur lors de l\'inscription. L\'email ou le pseudo est peut-être déjà utilisé.'
      );
      console.error('Erreur d\'authentification:', error);
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
    setGeneralError('');
  };

  return (
    <div className={styles.page}>
      <Header />
      
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.iconWrapper}>
              {isLoginMode ? <LogIn size={32} className={styles.icon} /> : <UserPlus size={32} className={styles.icon} />}
            </div>
            <h1 className={styles.title}>
              {isLoginMode ? 'Connexion' : 'Inscription'}
            </h1>
            <p className={styles.subtitle}>
              {isLoginMode 
                ? 'Connectez-vous pour accéder à votre compte'
                : 'Créez votre compte pour commencer à partager'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {generalError && (
              <div className={styles.errorAlert}>
                {generalError}
              </div>
            )}

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

          <div className={styles.footer}>
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
      </div>
    </div>
  );
};