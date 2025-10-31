# 🐳 Docker Configuration - SnipShare

Configuration Docker complète pour le projet SnipShare avec 3 services :
- **PostgreSQL** (Base de données)
- **Backend** (Node.js + Express + TypeScript)
- **Frontend** (React + TypeScript)

---

## 📦 Structure du projet

```
snipshare/
├── docker-compose.yml          # Configuration des 3 services
├── .env                        # Variables d'environnement
├── .env.example               # Template des variables
├── .gitignore                 # Fichiers à ignorer (dont .env)
├── README.md                  # Ce fichier
│
├── backend/
│   ├── Dockerfile             # Configuration Docker backend
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── server.ts
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middlewares/
│   └── database/
│       └── init.sql           # Script d'initialisation BDD
│
└── frontend/
    ├── Dockerfile             # Configuration Docker frontend
    ├── nginx.conf            # Config Nginx (production)
    ├── package.json
    ├── tsconfig.json
    ├── public/
    └── src/
        ├── components/
        ├── pages/
        ├── services/
        └── App.tsx
```

---

## 🚀 Démarrage rapide

### 1️⃣ Prérequis

- Docker installé (version 20.10+)
- Docker Compose installé (version 2.0+)

Vérifier l'installation :
```bash
docker --version
docker-compose --version
```

### 2️⃣ Configuration

1. **Copier le fichier d'environnement :**
```bash
cp .env.example .env
```

2. **Modifier les variables dans `.env`** (optionnel)
   - Changer les mots de passe
   - Modifier les ports si besoin
   - Personnaliser JWT_SECRET

### 3️⃣ Démarrer l'application

**Lancer tous les services :**
```bash
docker-compose up -d
```

**Voir les logs :**
```bash
docker-compose logs -f
```

**Voir les logs d'un service spécifique :**
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f database
```

### 4️⃣ Accéder à l'application

- **Frontend :** http://localhost:3000
- **Backend API :** http://localhost:3001/api
- **PostgreSQL :** localhost:5432

---

## 🛠️ Commandes utiles

### Gestion des conteneurs

```bash
# Démarrer les services
docker-compose up -d

# Arrêter les services
docker-compose down

# Redémarrer un service spécifique
docker-compose restart backend

# Reconstruire les images
docker-compose build

# Reconstruire et démarrer
docker-compose up -d --build

# Voir l'état des conteneurs
docker-compose ps

# Arrêter et supprimer volumes (⚠️ supprime la BDD)
docker-compose down -v
```

### Logs et débogage

```bash
# Logs de tous les services
docker-compose logs -f

# Logs d'un service spécifique
docker-compose logs -f backend

# Entrer dans un conteneur
docker exec -it snipshare-backend sh
docker exec -it snipshare-frontend sh
docker exec -it snipshare-db sh
```

### Base de données

```bash
# Se connecter à PostgreSQL
docker exec -it snipshare-db psql -U snipshare_user -d snipshare

# Exécuter le script SQL d'initialisation manuellement
docker exec -i snipshare-db psql -U snipshare_user -d snipshare < backend/database/init.sql

# Backup de la base de données
docker exec snipshare-db pg_dump -U snipshare_user snipshare > backup.sql

# Restaurer une sauvegarde
docker exec -i snipshare-db psql -U snipshare_user -d snipshare < backup.sql
```

### Nettoyage

```bash
# Supprimer tous les conteneurs arrêtés
docker container prune

# Supprimer toutes les images non utilisées
docker image prune -a

# Supprimer tous les volumes non utilisés
docker volume prune

# Nettoyage complet (⚠️ attention)
docker system prune -a --volumes
```

---

## 📝 Commandes npm dans les conteneurs

### Backend

```bash
# Installer une dépendance
docker-compose exec backend npm install nom-du-package

# Lancer les tests
docker-compose exec backend npm test

# Générer un build de production
docker-compose exec backend npm run build
```

### Frontend

```bash
# Installer une dépendance
docker-compose exec frontend npm install nom-du-package

# Lancer les tests
docker-compose exec frontend npm test

# Générer un build de production
docker-compose exec frontend npm run build
```

---

## 🔧 Configuration avancée

### Variables d'environnement importantes

| Variable | Description | Valeur par défaut |
|----------|-------------|-------------------|
| `DB_USER` | Utilisateur PostgreSQL | `snipshare_user` |
| `DB_PASSWORD` | Mot de passe PostgreSQL | `snipshare_password` |
| `DB_NAME` | Nom de la base | `snipshare` |
| `BACKEND_PORT` | Port du backend | `3001` |
| `FRONTEND_PORT` | Port du frontend | `3000` |
| `JWT_SECRET` | Clé secrète JWT | À changer ! |
| `NODE_ENV` | Environnement Node | `development` |

### Ports utilisés

- **3000** : Frontend (React)
- **3001** : Backend (API)
- **5432** : PostgreSQL

⚠️ Si ces ports sont déjà utilisés, modifiez-les dans `.env`

---

## 🐛 Résolution de problèmes

### Le conteneur database ne démarre pas

```bash
# Vérifier les logs
docker-compose logs database

# Solution : supprimer le volume et recréer
docker-compose down -v
docker-compose up -d
```

### Le backend ne se connecte pas à la BDD

```bash
# Vérifier que la BDD est prête
docker-compose exec database pg_isready -U snipshare_user

# Vérifier les variables d'environnement
docker-compose exec backend env | grep DB
```

### Le frontend ne se connecte pas au backend

1. Vérifier `REACT_APP_API_URL` dans `.env`
2. Vérifier que le backend est accessible : http://localhost:3001/api
3. Vérifier les logs CORS dans le backend

### Port déjà utilisé

```bash
# Trouver quel processus utilise le port
lsof -i :3000  # ou 3001, 5432

# Modifier le port dans .env
FRONTEND_PORT=3002
```

---

## 🔒 Sécurité

### ⚠️ IMPORTANT pour la production

1. **Changer tous les mots de passe par défaut**
   - `DB_PASSWORD`
   - `JWT_SECRET`

2. **Ne JAMAIS commiter le fichier `.env`**
   - Vérifier qu'il est dans `.gitignore`

3. **Utiliser des secrets forts**
```bash
# Générer un secret aléatoire
openssl rand -base64 32
```

4. **Activer HTTPS en production**
   - Utiliser un reverse proxy (nginx)
   - Certificat SSL/TLS

---

## 📊 Healthchecks

Le `docker-compose.yml` inclut des healthchecks pour garantir que les services sont prêts :

- **Database** : Vérifie que PostgreSQL accepte les connexions
- **Backend** : Attend que la database soit prête avant de démarrer
- **Frontend** : Attend que le backend soit prêt

---

## 🚀 Déploiement en production

### Build des images de production

```bash
# Backend
cd backend
docker build -t snipshare-backend:prod --target production .

# Frontend
cd frontend
docker build -t snipshare-frontend:prod --target production .
```

### Utiliser docker-compose en production

1. Créer un fichier `docker-compose.prod.yml`
2. Modifier les variables d'environnement
3. Activer HTTPS
4. Utiliser des volumes pour la persistance

```bash
docker-compose -f docker-compose.prod.yml up -d
```

---

## 📚 Ressources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [PostgreSQL Docker Hub](https://hub.docker.com/_/postgres)
- [Node.js Docker Hub](https://hub.docker.com/_/node)

---

## ✅ Checklist de validation

- [ ] Les 3 conteneurs démarrent sans erreur
- [ ] Frontend accessible sur http://localhost:3000
- [ ] Backend API accessible sur http://localhost:3001/api
- [ ] PostgreSQL accepte les connexions
- [ ] Les tables de la BDD sont créées (script init.sql)
- [ ] Les logs ne montrent pas d'erreurs critiques
- [ ] Les variables d'environnement sont correctement chargées

---

## 🎯 Prochaines étapes

1. ✅ Configuration Docker terminée
2. ⏭️ Développement du Frontend React
3. ⏭️ Développement du Backend API
4. ⏭️ Tests et validation

---

**Projet réalisé dans le cadre du cahier des charges SnipShare**  
_Phase 2 : Développement • Octobre-Novembre 2025_