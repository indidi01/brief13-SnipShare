// src/pages/HomePage.tsx
import React from 'react';
import { Header } from '../components/organisms/Header';
import { Button } from '../components/atoms/Button';
import './HomePage.css'; // Nous créerons ce fichier de styles

// Un composant SnippetCard simplifié pour la page d'accueil
const HomePageSnippetCard: React.FC = () => (
    <div className="snippet-card">
        <div className="snippet-header">
            <div className="snippet-info">
                <div className="snippet-title">Validation d'email en JavaScript</div>
                <div className="snippet-meta">Par @philippe_lambert • Il y a 2 heures</div>
            </div>
            <span className="badge badge-public">Public</span>
        </div>
        <div className="snippet-code">const validateEmail = (email) => {'{...}'}</div>
        <div className="snippet-tags">
            <span className="tag tag-language">JavaScript</span>
            <span className="tag tag-category">Validation</span>
        </div>
        <div className="snippet-footer">
            <span>❤️ 24 likes</span>
            <span>💬 5 commentaires</span>
        </div>
    </div>
);

export const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
            <div className="hero-content">
                <h1>Partagez vos snippets de code</h1>
                <p>
                    SnipShare est la plateforme collaborative pour stocker, partager et découvrir des morceaux de code réutilisables au sein de votre collectivité.
                </p>
                <div className="hero-buttons">
                    <Button as="a" href="/register" variant="white" size="large">Commencer gratuitement</Button>
                    <Button as="a" href="/explorer" variant="outline-white" size="large">Explorer les snippets</Button>
                </div>
            </div>
        </section>
        
        <section className="section section-light">
            <div className="section-content">
                <h2 className="section-title">Snippets populaires</h2>
                <div className="snippets-grid">
                    <HomePageSnippetCard />
                    <HomePageSnippetCard />
                    <HomePageSnippetCard />
                </div>
            </div>
        </section>
        
        <section className="cta">
          <div className="cta-content">
              <h2>Prêt à partager vos snippets ?</h2>
              <a href="/register" className="btn btn-large btn-white">Créer un compte gratuitement</a>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;