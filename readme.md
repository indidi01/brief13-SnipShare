# SnipShare 🚀

<div align="center">

```
███████╗███╗   ██╗██╗██████╗ ███████╗██╗  ██╗ █████╗ ██████╗ ███████╗
██╔════╝████╗  ██║██║██╔══██╗██╔════╝██║  ██║██╔══██╗██╔══██╗██╔════╝
███████╗██╔██╗ ██║██║██████╔╝███████╗███████║███████║██████╔╝█████╗  
╚════██║██║╚██╗██║██║██╔═══╝ ╚════██║██╔══██║██╔══██║██╔══██╗██╔══╝  
███████║██║ ╚████║██║██║     ███████║██║  ██║██║  ██║██║  ██║███████╗
╚══════╝╚═╝  ╚═══╝╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
```

### 📝 Plateforme de partage de snippets de code

**Partagez, découvrez et organisez vos extraits de code favoris**

[![Made with React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-24-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

[✨ Fonctionnalités](#-fonctionnalités) •
[🚀 Démarrage rapide](#-démarrage-rapide) •
[📚 Documentation](#-documentation) •
[🛠️ Technologies](#%EF%B8%8F-stack-technique) •
[👥 Contribution](#-contribution)

</div>

---

## 📖 À propos

**SnipShare** est une plateforme moderne de partage de snippets de code développée dans le cadre d'un exercice de formation chez **Simplon**. Elle permet aux développeurs de sauvegarder, organiser et partager leurs extraits de code avec la communauté.

### 🎯 Objectifs du projet

- Créer une application full-stack avec **React** et **Node.js**
- Implémenter une architecture **Atomic Design**
- Utiliser **TypeScript** pour un code type-safe
- Déployer avec **Docker** pour faciliter l'environnement de développement
- Appliquer les bonnes pratiques de développement web moderne

---

## ✨ Fonctionnalités

### 🔥 Actuellement disponibles

- ✅ **Création de snippets** - Publiez vos extraits de code avec coloration syntaxique
- ✅ **Exploration** - Découvrez les snippets de la communauté
- ✅ **Recherche avancée** - Filtrez par langage, tags, popularité
- ✅ **Système de tags** - Organisez vos snippets avec des étiquettes
- ✅ **Likes et commentaires** - Interagissez avec la communauté
- ✅ **Gestion de la visibilité** - Snippets publics, privés ou non listés
- ✅ **6 thèmes UI** - Light, Dark, Nord, Cyber, Nature, Sunset
- ✅ **Design responsive** - Interface adaptée mobile, tablette et desktop
- ✅ **Copie rapide** - Copiez le code en un clic

### 🔜 Prochainement

- 🔜 Authentification complète (JWT)
- 🔜 Profils utilisateurs
- 🔜 Système de favoris
- 🔜 Modification et suppression de snippets
- 🔜 Notifications en temps réel
- 🔜 Export de snippets
- 🔜 API publique

---

## 🚀 Démarrage rapide

### Prérequis

Assurez-vous d'avoir installé :

- [Docker](https://www.docker.com/get-started) (v20+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2+)
- [Node.js](https://nodejs.org/) (v24+) *(optionnel, pour dev local)*
- [Git](https://git-scm.com/)

### Installation

#### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-username/snipshare.git
cd snipshare
```

#### 2. Configuration de l'environnement

Créez un fichier `.env` à la racine du projet :

```bash
cp .env.example .env
```

Éditez le fichier `.env` avec vos valeurs :

```env
# Database
POSTGRES_USER=snipshare_user
POSTGRES_PASSWORD=votre_mot_de_passe_sécurisé
POSTGRES_DB=snipshare_db
POSTGRES_HOST=database
DB_PORT=5432

# Backend
BACKEND_PORT=3002
JWT_SECRET=votre_secret_jwt_ultra_sécurisé
JWT_RT_TTL=7d
CORS_ORIGIN=http://localhost:3000

# Frontend
FRONTEND_PORT=3000:3000
REACT_APP_API_URL=http://localhost:3002

# Adminer
ADMINER_PORT=8080:8080
```

#### 3. Lancer l'application avec Docker

```bash
# Construire et démarrer tous les services
docker-compose -f docker-compose.dev.yml up --build

# Ou en arrière-plan
docker-compose -f docker-compose.dev.yml up -d
```

#### 4. Accéder à l'application

- **Frontend** : [http://localhost:3000](http://localhost:3000)
- **Backend API** : [http://localhost:3002](http://localhost:3002)
- **Adminer (BDD)** : [http://localhost:8080](http://localhost:8080)

### Installation locale (sans Docker)

<details>
<summary>Cliquez pour voir les instructions</summary>

#### Backend

```bash
cd backend
npm install
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

#### Base de données

```bash
# Installer PostgreSQL localement
# Créer la base de données
psql -U postgres
CREATE DATABASE snipshare_db;
```

</details>

---

## 🛠️ Stack technique

### Frontend

| Technologie | Version | Description |
|-------------|---------|-------------|
| [React](https://reactjs.org/) | 19.1.1 | Framework UI |
| [TypeScript](https://www.typescriptlang.org/) | 5.9 | Typage statique |
| [Vite](https://vitejs.dev/) | 7.1.7 | Build tool ultra-rapide |
| [React Router](https://reactrouter.com/) | 7.9.5 | Routing côté client |
| [Lucide React](https://lucide.dev/) | 0.552.0 | Icônes modernes |
| CSS Modules | - | Styles scopés |

### Backend

| Technologie | Version | Description |
|-------------|---------|-------------|
| [Node.js](https://nodejs.org/) | 24 | Runtime JavaScript |
| [Express](https://expressjs.com/) | 5.1.0 | Framework web |
| [TypeScript](https://www.typescriptlang.org/) | 5.8 | Typage statique |
| [PostgreSQL](https://www.postgresql.org/) | 18 | Base de données |
| [JSON Web Token](https://jwt.io/) | 9.0.2 | Authentification |
| [Zod](https://zod.dev/) | 4.1.12 | Validation des données |

### DevOps & Outils

- 🐳 **Docker** - Conteneurisation
- 🐳 **Docker Compose** - Orchestration des services
- 🔧 **ESLint** - Linting du code
- 📦 **npm** - Gestion des dépendances
- 🗄️ **Adminer** - Administration PostgreSQL

---

## 📁 Structure du projet

```
snipshare/
├── backend/                    # API Node.js + Express
│   ├── src/
│   │   ├── index.ts           # Point d'entrée
│   │   ├── routes/            # Routes API
│   │   ├── controllers/       # Logique métier
│   │   ├── models/            # Modèles de données
│   │   ├── middleware/        # Middlewares Express
│   │   └── config/            # Configuration
│   ├── Dockerfile
│   └── package.json
│
├── frontend/                   # Application React
│   ├── src/
│   │   ├── components/
│   │   │   ├── atoms/         # Composants de base
│   │   │   ├── molecules/     # Composants composés
│   │   │   ├── organisms/     # Sections complexes
│   │   │   ├── templates/     # Layouts
│   │   │   └── pages/         # Pages complètes
│   │   ├── contexts/          # Contexts React
│   │   ├── services/          # Services API
│   │   ├── styles/            # Variables CSS
│   │   └── types/             # Types TypeScript
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.dev.yml      # Configuration Docker
├── .env                        # Variables d'environnement
├── .gitignore
└── README.md
```

### Architecture Atomic Design

Le frontend suit la méthodologie **Atomic Design** de Brad Frost :

```
Atoms → Molecules → Organisms → Templates → Pages
  ↓         ↓           ↓            ↓         ↓
Button   SearchBar    Header      Layout   HomePage
Input    CodeBlock    Sidebar   Dashboard  CreatePage
Tag      SnippetCard  Nav
```

---

## 📚 Documentation

### API Endpoints

#### Snippets

```http
GET    /api/snippets              # Liste tous les snippets
GET    /api/snippets/:id          # Détail d'un snippet
POST   /api/snippets              # Créer un snippet
PUT    /api/snippets/:id          # Modifier un snippet
DELETE /api/snippets/:id          # Supprimer un snippet
```

#### Authentification

```http
POST   /api/auth/register         # Inscription
POST   /api/auth/login            # Connexion
POST   /api/auth/logout           # Déconnexion
GET    /api/auth/me               # Profil utilisateur
```

#### Interactions

```http
POST   /api/snippets/:id/like     # Liker un snippet
POST   /api/snippets/:id/comment  # Commenter un snippet
GET    /api/snippets/:id/comments # Liste des commentaires
```

### Scripts disponibles

#### Frontend

```bash
npm run dev       # Lancer le serveur de développement
npm run build     # Build de production
npm run preview   # Prévisualiser le build
npm run lint      # Linter le code
```

#### Backend

```bash
npm run dev       # Lancer avec hot-reload
npm run build     # Compiler TypeScript
npm run start     # Lancer en production
```

---

## 🎨 Thèmes disponibles

SnipShare propose 6 thèmes personnalisables :

| Thème | Description | Aperçu |
|-------|-------------|--------|
| ☀️ **Light** | Thème clair classique | Blanc, bleu, tons clairs |
| 🌙 **Dark** | Thème sombre moderne | Gris foncé, bleu pâle |
| ❄️ **Nord** | Palette nordique | Tons bleu-gris pastel |
| 🤖 **Cyber** | Style cyberpunk | Néon cyan et magenta |
| 🌿 **Nature** | Tons naturels | Vert et beige |
| 🌅 **Sunset** | Couleurs chaudes | Orange et jaune |

---

## 🧪 Tests

```bash
# Frontend
cd frontend
npm run test

# Backend
cd backend
npm run test
```

---

## 🚀 Déploiement

### Production avec Docker

```bash
# Build des images de production
docker-compose -f docker-compose.prod.yml build

# Démarrer en production
docker-compose -f docker-compose.prod.yml up -d
```

### Variables d'environnement de production

Pensez à modifier ces valeurs en production :

- `JWT_SECRET` - Générez un secret fort et unique
- `POSTGRES_PASSWORD` - Utilisez un mot de passe sécurisé
- `CORS_ORIGIN` - Limitez aux domaines autorisés
- `NODE_ENV=production`

---

## 👥 Contribution

Les contributions sont les bienvenues ! Voici comment participer :

### 1. Fork le projet

```bash
git clone https://github.com/votre-username/snipshare.git
```

### 2. Créer une branche

```bash
git checkout -b feature/ma-nouvelle-feature
```

### 3. Commiter vos changements

```bash
git commit -m "✨ Ajout d'une nouvelle fonctionnalité"
```

### 4. Pousser vers la branche

```bash
git push origin feature/ma-nouvelle-feature
```

### 5. Ouvrir une Pull Request

### Conventions de commit

Nous utilisons les [Conventional Commits](https://www.conventionalcommits.org/) :

- `feat:` - Nouvelle fonctionnalité
- `fix:` - Correction de bug
- `docs:` - Documentation
- `style:` - Formatage du code
- `refactor:` - Refactorisation
- `test:` - Ajout de tests
- `chore:` - Tâches de maintenance

---

## 🐛 Problèmes connus

- [ ] La coloration syntaxique est basique (à améliorer avec Prism.js)
- [ ] Pas de pagination sur la liste des snippets
- [ ] Les commentaires ne sont pas modifiables

Consultez les [issues](https://github.com/votre-username/snipshare/issues) pour plus de détails.

---

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👨‍💻 Auteur

Développé avec ❤️ par **[Votre Nom]** dans le cadre de la formation Simplon.

### Contact

- 🌐 Portfolio : [votre-site.com](https://votre-site.com)
- 💼 LinkedIn : [Votre profil](https://linkedin.com/in/votre-profil)
- 📧 Email : votre.email@exemple.com
- 🐙 GitHub : [@votre-username](https://github.com/votre-username)

---

## 🙏 Remerciements

- **Simplon** - Pour la formation et l'accompagnement
- **Brad Frost** - Pour la méthodologie Atomic Design
- La communauté **React** et **TypeScript**
- Tous les contributeurs open-source

---

## 📊 Statistiques du projet

![GitHub last commit](https://img.shields.io/github/last-commit/votre-username/snipshare)
![GitHub issues](https://img.shields.io/github/issues/votre-username/snipshare)
![GitHub pull requests](https://img.shields.io/github/issues-pr/votre-username/snipshare)
![GitHub stars](https://img.shields.io/github/stars/votre-username/snipshare?style=social)

---

<div align="center">

**⭐ Si ce projet vous plaît, n'hésitez pas à lui donner une étoile ! ⭐**

Fait avec 💙 et ☕ en France 🇫🇷

[⬆ Retour en haut](#snipshare-)

</div>

