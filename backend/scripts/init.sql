-- Script de peuplement de la base de données SnipShare
-- Suppression des données existantes (optionnel)
TRUNCATE TABLE tagging, users_creating_snippets, comments, Snippets, Tags, Users RESTART IDENTITY CASCADE;

-- Insertion des utilisateurs
INSERT INTO Users (pseudo, email, password, creation_date, modification_date) VALUES
('JeanDev', 'jean.dev@email.com', '$argon2id$v=19$m=65536,t=3,p=4$c2FsdHNhbHQ$uWDP6aRWsQdGr0oN7DpYqg', '2024-01-15 10:00:00', '2024-01-15 10:00:00'),
('MarieCode', 'marie.code@email.com', '$argon2id$v=19$m=65536,t=3,p=4$c2FsdHNhbHQ$uWDP6aRWsQdGr0oN7DpYqg', '2024-01-20 14:30:00', '2024-01-20 14:30:00'),
('DevMaster', 'dev.master@email.com', '$argon2id$v=19$m=65536,t=3,p=4$c2FsdHNhbHQ$uWDP6aRWsQdGr0oN7DpYqg', '2024-02-01 09:15:00', '2024-02-01 09:15:00'),
('CodeNinja', 'ninja.code@email.com', '$argon2id$v=19$m=65536,t=3,p=4$c2FsdHNhbHQ$uWDP6aRWsQdGr0oN7DpYqg', '2024-02-10 16:45:00', '2024-02-10 16:45:00'),
('WebWizard', 'web.wizard@email.com', '$argon2id$v=19$m=65536,t=3,p=4$c2FsdHNhbHQ$uWDP6aRWsQdGr0oN7DpYqg', '2024-02-15 11:20:00', '2024-02-15 11:20:00');

-- Insertion des tags
INSERT INTO Tags (name) VALUES
('javascript'),
('typescript'),
('react'),
('nodejs'),
('python'),
('sql'),
('html'),
('css'),
('docker'),
('git'),
('algorithm'),
('database'),
('api'),
('express'),
('mongodb'),
('vue'),
('angular'),
('sass'),
('bootstrap'),
('regex');

-- Insertion des snippets
INSERT INTO Snippets (snippets_id, langage, title, description, code, visibility, creation_date, modification_date, users_id) VALUES
('snippet_1', 'javascript', 'Validation d''email avec Regex', 'Fonction utilitaire pour valider les adresses email avec une expression régulière robuste', 'function validateEmail(email) {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
}

// Exemple d''utilisation
console.log(validateEmail("test@example.com")); // true
console.log(validateEmail("invalid-email"));    // false', 'public', '2024-03-01 09:00:00', '2024-03-01 09:00:00', 1),

('snippet_2', 'python', 'Connexion PostgreSQL avec psycopg2', 'Configuration sécurisée d''une connexion à PostgreSQL avec gestion des erreurs', 'import psycopg2
from psycopg2 import sql

def get_db_connection():
    try:
        conn = psycopg2.connect(
            host="localhost",
            database="mydatabase",
            user="myuser",
            password="mypassword",
            port=5432
        )
        return conn
    except psycopg2.Error as e:
        print(f"Erreur de connexion: {e}")
        return None

# Utilisation
connection = get_db_connection()
if connection:
    print("Connexion réussie !")', 'public', '2024-03-02 14:30:00', '2024-03-02 14:30:00', 2),

('snippet_3', 'typescript', 'Composant React Button réutilisable', 'Composant Button typé avec TypeScript supportant plusieurs variants', 'interface ButtonProps {
  children: React.ReactNode;
  variant?: ''primary'' | ''secondary'' | ''danger'';
  size?: ''sm'' | ''md'' | ''lg'';
  disabled?: boolean;
  onClick?: () => void;
  type?: ''button'' | ''submit'' | ''reset'';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = ''primary'',
  size = ''md'',
  disabled = false,
  onClick,
  type = ''button'',
}) => {
  const baseClasses = ''inline-flex items-center justify-center font-medium rounded-md transition-colors'';
  const variantClasses = {
    primary: ''bg-blue-600 text-white hover:bg-blue-700'',
    secondary: ''bg-gray-600 text-white hover:bg-gray-700'',
    danger: ''bg-red-600 text-white hover:bg-red-700'',
  };
  const sizeClasses = {
    sm: ''px-3 py-1.5 text-sm'',
    md: ''px-4 py-2 text-base'',
    lg: ''px-6 py-3 text-lg'',
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        disabled ? ''opacity-50 cursor-not-allowed'' : ''''
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};', 'public', '2024-03-03 11:15:00', '2024-03-03 11:15:00', 3),

('snippet_4', 'sql', 'Requête de jointure complexe', 'Exemple de requête SQL avec multiple jointures et agrégations', 'SELECT 
  u.pseudo,
  u.email,
  COUNT(s.snippets_id) as total_snippets,
  COUNT(DISTINCT c.comment_id) as total_comments,
  AVG(LENGTH(s.code)) as avg_code_length
FROM Users u
LEFT JOIN Snippets s ON u.users_id = s.users_id
LEFT JOIN Comments c ON u.users_id = c.users_id
WHERE u.creation_date >= CURRENT_DATE - INTERVAL ''30 days''
GROUP BY u.users_id, u.pseudo, u.email
HAVING COUNT(s.snippets_id) > 0
ORDER BY total_snippets DESC
LIMIT 10;', 'public', '2024-03-04 16:45:00', '2024-03-04 16:45:00', 1),

('snippet_5', 'javascript', 'Débounce function pour les recherches', 'Implémentation d''une fonction debounce pour optimiser les appels API', 'function debounce(func, wait, immediate = false) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
}

// Exemple d''utilisation avec un champ de recherche
const searchInput = document.getElementById(''search'');
const performSearch = (query) => {
  console.log(''Recherche:'', query);
  // Appel API ici
};

const debouncedSearch = debounce(performSearch, 300);
searchInput.addEventListener(''input'', (e) => debouncedSearch(e.target.value));', 'public', '2024-03-05 10:20:00', '2024-03-05 10:20:00', 4),

('snippet_6', 'python', 'Générateur de mots de passe sécurisé', 'Génération de mots de passe forts avec la bibliothèque secrets', 'import secrets
import string

def generate_password(length=16, use_uppercase=True, use_numbers=True, use_special=True):
    """Génère un mot de passe sécurisé."""
    characters = string.ascii_lowercase
    
    if use_uppercase:
        characters += string.ascii_uppercase
    if use_numbers:
        characters += string.digits
    if use_special:
        characters += string.punctuation
    
    if len(characters) == 0:
        raise ValueError("Au moins un type de caractère doit être sélectionné")
    
    password = ''.join(secrets.choice(characters) for _ in range(length))
    return password

# Exemples d''utilisation
print("Mot de passe simple:", generate_password(12, False, True, False))
print("Mot de passe fort:", generate_password(16, True, True, True))', 'public', '2024-03-06 13:10:00', '2024-03-06 13:10:00', 2),

('snippet_7', 'html', 'Structure HTML5 sémantique', 'Template de base avec les balises sémantiques HTML5', '<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Description de la page">
  <title>Titre de la page</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header role="banner">
    <nav role="navigation" aria-label="Navigation principale">
      <ul>
        <li><a href="/">Accueil</a></li>
        <li><a href="/about">À propos</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main role="main">
    <article>
      <header>
        <h1>Titre de l''article</h1>
        <time datetime="2024-03-07">7 Mars 2024</time>
      </header>
      
      <section>
        <h2>Introduction</h2>
        <p>Contenu de l''introduction...</p>
      </section>
      
      <section>
        <h2>Contenu principal</h2>
        <p>Contenu principal...</p>
      </section>
    </article>
  </main>

  <aside role="complementary">
    <h3>Articles similaires</h3>
    <ul>
      <li><a href="/article1">Article 1</a></li>
      <li><a href="/article2">Article 2</a></li>
    </ul>
  </aside>

  <footer role="contentinfo">
    <p>&copy; 2024 Mon Site. Tous droits réservés.</p>
  </footer>
</body>
</html>', 'public', '2024-03-07 15:30:00', '2024-03-07 15:30:00', 5),

('snippet_8', 'css', 'Grid Layout responsive', 'Système de grille CSS moderne et responsive', '/* Container de grille */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

/* Cartes */
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Responsive */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0.5rem;
  }
  
  .card {
    padding: 1rem;
  }
}

@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
  }
}

/* Animation d''apparition */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeInUp 0.5s ease-out;
}', 'public', '2024-03-08 09:45:00', '2024-03-08 09:45:00', 3),

('snippet_9', 'nodejs', 'Middleware d''authentification JWT', 'Middleware Express pour vérifier les tokens JWT', 'const jwt = require(''jsonwebtoken'');
const { promisify } = require(''util'');

const JWT_SECRET = process.env.JWT_SECRET || ''votre-secret-super-securise'';

const authMiddleware = async (req, res, next) => {
  try {
    // Récupérer le token du header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith(''Bearer '')) {
      return res.status(401).json({
        error: ''Accès refusé. Token manquant.''
      });
    }

    const token = authHeader.substring(7); // Enlever "Bearer "

    // Vérifier le token
    const decoded = await promisify(jwt.verify)(token, JWT_SECRET);
    
    // Ajouter les infos utilisateur à la requête
    req.user = {
      userId: decoded.userId,
      email: decoded.email
    };
    
    next();
  } catch (error) {
    console.error(''Erreur d''authentification:'', error);
    
    if (error.name === ''JsonWebTokenError'') {
      return res.status(401).json({
        error: ''Token invalide.''
      });
    }
    
    if (error.name === ''TokenExpiredError'') {
      return res.status(401).json({
        error: ''Token expiré.''
      });
    }
    
    res.status(500).json({
      error: ''Erreur serveur lors de l''authentification.''
    });
  }
};

module.exports = authMiddleware;', 'public', '2024-03-09 14:20:00', '2024-03-09 14:20:00', 4),

('snippet_10', 'docker', 'Dockerfile pour application Node.js', 'Configuration Docker optimisée pour une application Node.js', '# Étape de build
FROM node:18-alpine AS builder

WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./
COPY tsconfig.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le code source
COPY src/ ./src/

# Build de l''application
RUN npm run build

# Étape finale
FROM node:18-alpine

WORKDIR /app

# Installer les dépendances système nécessaires
RUN apk add --no-cache tzdata

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copier les dépendances et le build depuis l''étape builder
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./

# Changer vers l''utilisateur non-root
USER nextjs

# Exposer le port
EXPOSE 3000

# Variables d''environnement
ENV NODE_ENV=production
ENV PORT=3000

# Commande de démarrage
CMD [ "node", "dist/index.js" ]', 'public', '2024-03-10 11:00:00', '2024-03-10 11:00:00', 5);

-- Insertion des commentaires
INSERT INTO comments (content, creation_date, snippets_id, users_id) VALUES
('Super fonction ! Je l''utilise dans tous mes projets maintenant.', '2024-03-01 10:30:00', 'snippet_1', 2),
('Petite amélioration : tu pourrais ajouter la validation des domaines de premier niveau.', '2024-03-01 11:15:00', 'snippet_1', 3),
('Très utile pour mon projet actuel, merci du partage !', '2024-03-02 15:45:00', 'snippet_2', 1),
('Attention à ne pas exposer les mots de passe en clair dans le code. Utilise plutôt des variables d''environnement.', '2024-03-02 16:20:00', 'snippet_2', 4),
('Excellent composant ! J''ai ajouté une prop "loading" pour gérer les états de chargement.', '2024-03-03 12:00:00', 'snippet_3', 5),
('La requête est très bien structurée. J''ai appris quelques optimisations grâce à toi.', '2024-03-04 17:30:00', 'snippet_4', 2),
('Le debounce est essentiel pour les performances. Merci pour ce rappel !', '2024-03-05 11:45:00', 'snippet_5', 3),
('Générateur très pratique. J''ai créé une interface web autour de cette fonction.', '2024-03-06 14:20:00', 'snippet_6', 1),
('HTML5 sémantique 👍. L''accessibilité est souvent négligée.', '2024-03-07 16:10:00', 'snippet_7', 4),
('Les animations CSS sont très fluides. Belle réalisation !', '2024-03-08 10:30:00', 'snippet_8', 5);

-- Insertion des likes (users_creating_snippets)
INSERT INTO users_creating_snippets (users_id, snippets_id, creation_date) VALUES
(2, 'snippet_1', '2024-03-01 10:25:00'),
(3, 'snippet_1', '2024-03-01 11:00:00'),
(4, 'snippet_1', '2024-03-01 12:30:00'),
(1, 'snippet_2', '2024-03-02 15:30:00'),
(3, 'snippet_2', '2024-03-02 16:00:00'),
(5, 'snippet_3', '2024-03-03 11:45:00'),
(1, 'snippet_3', '2024-03-03 13:20:00'),
(2, 'snippet_4', '2024-03-04 17:00:00'),
(4, 'snippet_5', '2024-03-05 11:20:00'),
(5, 'snippet_6', '2024-03-06 13:45:00'),
(1, 'snippet_7', '2024-03-07 16:00:00'),
(2, 'snippet_8', '2024-03-08 10:00:00'),
(3, 'snippet_9', '2024-03-09 14:45:00'),
(4, 'snippet_10', '2024-03-10 11:30:00');

-- Insertion des associations tags-snippets (tagging)
INSERT INTO tagging (snippets_id, tags_id) VALUES
-- Snippet 1: Validation email
('snippet_1', 1),  -- javascript
('snippet_1', 20), -- regex

-- Snippet 2: Connexion PostgreSQL
('snippet_2', 5),  -- python
('snippet_2', 12), -- database
('snippet_2', 6),  -- sql

-- Snippet 3: Composant React Button
('snippet_3', 2),  -- typescript
('snippet_3', 3),  -- react

-- Snippet 4: Requête SQL
('snippet_4', 6),  -- sql
('snippet_4', 12), -- database
('snippet_4', 11), -- algorithm

-- Snippet 5: Debounce function
('snippet_5', 1),  -- javascript
('snippet_5', 11), -- algorithm
('snippet_5', 13), -- api

-- Snippet 6: Générateur mot de passe
('snippet_6', 5),  -- python
('snippet_6', 11), -- algorithm

-- Snippet 7: HTML sémantique
('snippet_7', 7),  -- html
('snippet_7', 8),  -- css

-- Snippet 8: CSS Grid
('snippet_8', 8),  -- css
('snippet_8', 18), -- sass

-- Snippet 9: Middleware JWT
('snippet_9', 4),  -- nodejs
('snippet_9', 14), -- express
('snippet_9', 13), -- api

-- Snippet 10: Dockerfile
('snippet_10', 9), -- docker
('snippet_10', 10); -- git

-- Affichage des statistiques
SELECT 
  'Utilisateurs créés: ' || COUNT(*) as stats
FROM Users
UNION ALL
SELECT 
  'Snippets créés: ' || COUNT(*) 
FROM Snippets
UNION ALL
SELECT 
  'Tags créés: ' || COUNT(*) 
FROM Tags
UNION ALL
SELECT 
  'Commentaires créés: ' || COUNT(*) 
FROM Comments
UNION ALL
SELECT 
  'Likes attribués: ' || COUNT(*) 
FROM users_creating_snippets
UNION ALL
SELECT 
  'Associations tags: ' || COUNT(*) 
FROM tagging;