import React from 'react';
import { Button } from './../../atoms/Button/Button'; // Adaptez le chemin d'import
import './HomePage.css';

export const Home: React.FC = () => {
  const handleClick = () => {
    alert('Bouton cliqué !');
  };

  return (
    <div>
      <h1>Ma Page d'Accueil</h1>
      
      {/* Utilisation avec différentes variantes */}
      <Button variant="primary" onClick={handleClick}>
        Bouton Primaire
      </Button>
      
      <Button variant="secondary" className="ma-classe-personnalisee">
        Bouton Secondaire
      </Button>
      
      <Button variant="outline" type="submit">
        Bouton Outline
      </Button>
      
      {/* Variante par défaut */}
      <Button onClick={handleClick}>
        Bouton par défaut
      </Button>
    </div>
  );
};