// frontend/src/components/pages/Register/RegisterPage.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { Header } from '../../organisms/Header/Header';
import { Input } from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Button';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import styles from './RegisterPage.module.css';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
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

    if (!formData.pseudo.trim()) {
      newErrors.pseudo = 'Le pseudo est requis';
    } else if (formData.pseudo.length < 3) {
      newErrors.pseudo = 'Le pseudo doit contenir au moins 3 caractères';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
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
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      navigate('/'); // Redirection vers l'accueil après inscription
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      setGeneralError(errorMessage);
      console.error('Erreur d\'inscription:', error);
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
              <UserPlus size={32} className={styles.icon} />
            </div>
            <h1 className={styles.title}>Créer un compte</h1>
            <p className={styles.subtitle}>
              Rejoignez la communauté SnipShare
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {generalError && (
              <div className={styles.errorAlert}>
                {generalError}
              </div>
            )}

            <Input
              label="Pseudo"
              type="text"
              name="pseudo"
              value={formData.pseudo}
              onChange={handleInputChange}
              placeholder="VotrePseudo"
              icon={<User size={20} />}
              error={errors.pseudo}
              fullWidth
              required
            />

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

            <div className={styles.terms}>
              <p className={styles.termsText}>
                En créant un compte, vous acceptez nos{' '}
                <a href="#" className={styles.link}>
                  Conditions d'utilisation
                </a>{' '}
                et notre{' '}
                <a href="#" className={styles.link}>
                  Politique de confidentialité
                </a>
                .
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
            >
              Créer mon compte
            </Button>
          </form>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              Vous avez déjà un compte ?{' '}
              <Link to="/login" className={styles.link}>
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};