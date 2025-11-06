// frontend/src/components/pages/NotFound/NotFoundPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../organisms/Header/Header';
import { Button } from '../../atoms/Button/Button';
import { Home, Search, ArrowLeft } from 'lucide-react';
import styles from './NotFoundPage.module.css';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <Header />
      
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.errorCode}>404</div>
          
          <h1 className={styles.title}>Page introuvable</h1>
          
          <p className={styles.description}>
            Oups ! La page que vous recherchez n'existe pas ou a été déplacée.
          </p>

          <div className={styles.illustration}>
            <div className={styles.code}>
              <pre>
{`function findPage() {
  const page = search();
  if (!page) {
    throw new Error("404");
  }
  return page;
}`}
              </pre>
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              variant="primary"
              onClick={() => navigate('/')}
              icon={<Home size={20} />}
            >
              Retour à l'accueil
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/explore')}
              icon={<Search size={20} />}
            >
              Explorer les snippets
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              icon={<ArrowLeft size={20} />}
            >
              Page précédente
            </Button>
          </div>

          <div className={styles.suggestions}>
            <p className={styles.suggestionsTitle}>Vous cherchez peut-être :</p>
            <div className={styles.links}>
              <a href="/" className={styles.link}>Accueil</a>
              <a href="/explore" className={styles.link}>Explorer</a>
              <a href="/create" className={styles.link}>Créer un snippet</a>
              <a href="/login" className={styles.link}>Se connecter</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};