// frontend/src/components/pages/Home/HomePage.tsx
import React from 'react';
import { Header } from '../../organisms/Header/Header';
import { Button } from '../../atoms/Button/Button';
import styles from './HomePage.module.css';

export const Home: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Partagez vos <span className={styles.highlight}>snippets</span> de code
          </h1>
          
          <p className={styles.heroDescription}>
            Découvrez, créez et partagez des extraits de code avec la communauté.
            SnipShare est la plateforme idéale pour les développeurs qui veulent
            partager leurs connaissances.
          </p>

          <div className={styles.heroActions}>
            <Button variant="primary" onClick={() => alert('Commencer !')}>
              🚀 Commencer
            </Button>
            
            <Button variant="secondary" onClick={() => alert('Explorer')}>
              🔍 Explorer
            </Button>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>1,234</span>
              <span className={styles.statLabel}>Snippets</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>567</span>
              <span className={styles.statLabel}>Utilisateurs</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>89</span>
              <span className={styles.statLabel}>Langages</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Fonctionnalités principales</h2>
          
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>🚀</span>
              <h3>Partage rapide</h3>
              <p>Partagez vos snippets en quelques clics avec la communauté</p>
            </div>

            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>🎨</span>
              <h3>Coloration syntaxique</h3>
              <p>Code mis en forme automatiquement pour une lecture optimale</p>
            </div>

            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>🏷️</span>
              <h3>Organisation</h3>
              <p>Organisez vos snippets avec des tags et des catégories</p>
            </div>

            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>💾</span>
              <h3>Sauvegarde</h3>
              <p>Conservez vos snippets favoris pour un accès rapide</p>
            </div>

            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>🔍</span>
              <h3>Recherche puissante</h3>
              <p>Trouvez rapidement le snippet dont vous avez besoin</p>
            </div>

            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>👥</span>
              <h3>Communauté</h3>
              <p>Collaborez avec d'autres développeurs du monde entier</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Prêt à commencer ?</h2>
          <p className={styles.ctaDescription}>
            Rejoignez des milliers de développeurs qui partagent leurs connaissances
          </p>
          <div className={styles.ctaActions}>
            <Button variant="primary">Créer un compte</Button>
            <Button variant="outline">En savoir plus</Button>
          </div>
        </div>
      </section>
    </div>
  );
};