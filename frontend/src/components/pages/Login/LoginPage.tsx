// frontend/src/components/pages/Login/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { Header } from '../../organisms/Header/Header';
import { Input } from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Button';
import { LogIn, Mail, Lock } from 'lucide-react';
import styles from './LoginPage.module.css';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      await login(formData);
      navigate('/'); // Redirection vers l'accueil après connexion
    } catch (error) {
      setGeneralError('Email ou mot de passe incorrect');
      console.error('Erreur de connexion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.iconWrapper}>
              <LogIn size={32} className={styles.icon} />
            </div>
            <h1 className={styles.title}>Connexion</h1>
            <p className={styles.subtitle}>
              Connectez-vous pour accéder à votre compte
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {generalError && (
              <div className={styles.errorAlert}>
                {generalError}
              </div>
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

          <div className={styles.footer}>
            <p className={styles.footerText}>
              Vous n'avez pas de compte ?{' '}
              <Link to="/register" className={styles.link}>
                S'inscrire
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};