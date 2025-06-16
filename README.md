# 🚀 TeamTask - Application de Gestion des Tâches

<div align="center">

![TeamTask Logo](https://img.shields.io/badge/TeamTask-Task%20Management-blue?style=for-the-badge&logo=task&logoColor=white)

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-1.9.7-764ABC?style=flat-square&logo=redux)](https://redux-toolkit.js.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)

**Une application MERN complète pour la gestion collaborative des tâches avec authentification JWT et gestion des rôles.**

[🔗 Demo Live](#) • [📖 Documentation](#) • [🐛 Report Bug](../../issues) • [✨ Request Feature](../../issues)

</div>

---

## 📋 Table des Matières

- [✨ Fonctionnalités](#-fonctionnalités)
- [🛠️ Technologies](#️-technologies)
- [🚀 Installation](#-installation)
- [📱 Utilisation](#-utilisation)
- [🏗️ Architecture](#️-architecture)
- [👥 Rôles et Permissions](#-rôles-et-permissions)
- [🎨 Interface](#-interface)
- [📡 API](#-api)
- [🚀 Déploiement](#-déploiement)
- [🤝 Contribution](#-contribution)
- [📊 Statistiques du Projet](#-statistiques-du-projet)
- [📄 License](#-license)

## ✨ Fonctionnalités

### 🔐 Authentification Sécurisée
- ✅ Inscription et connexion avec validation
- ✅ Authentification JWT avec stockage localStorage
- ✅ Gestion des rôles (Utilisateur/Manager)
- ✅ Routes protégées et middleware de sécurité
- ✅ Gestion automatique de l'expiration des tokens

### 📊 Gestion des Tâches Avancée
- ✅ CRUD complet avec permissions granulaires
- ✅ Filtrage par statut (À faire, En cours, Terminée)
- ✅ Assignation des tâches (Managers uniquement)
- ✅ Statistiques en temps réel
- ✅ Interface intuitive avec modales

### 👥 Gestion des Rôles
- **👤 Utilisateurs** : Consultation de leurs propres tâches
- **👨‍💼 Managers** : Accès complet + panneau d'administration
- ✅ Permissions vérifiées côté frontend et backend

### 🎨 Interface Utilisateur Moderne
- ✅ Design responsive (mobile-first)
- ✅ Animations et transitions fluides
- ✅ Feedback visuel pour toutes les actions
- ✅ Thème cohérent sans framework CSS externe

## 🛠️ Technologies

### Frontend
- **⚛️ React 18** - Interface utilisateur moderne
- **🔄 Redux Toolkit** - Gestion d'état prévisible
- **🧭 React Router** - Navigation côté client
- **📡 Axios** - Client HTTP avec intercepteurs
- **🎨 CSS3** - Styling personnalisé et responsive

### Backend
- **🟢 Node.js** - Runtime JavaScript
- **🚀 Express.js** - Framework web minimaliste
- **🍃 MongoDB** - Base de données NoSQL
- **📦 Mongoose** - ODM pour MongoDB
- **🔐 JWT** - Authentification stateless
- **🔒 bcryptjs** - Hachage sécurisé des mots de passe

## 🚀 Installation

### Prérequis
- **Node.js** (v14 ou supérieur)
- **MongoDB** (local ou cloud)
- **npm** ou **yarn**

### 📦 Installation Frontend

\`\`\`bash
# 1. Cloner le repository
git clone https://github.com/votre-username/teamtask-frontend.git
cd teamtask-frontend

# 2. Installer les dépendances
npm install

# 3. Configuration environnement
cp .env.example .env
# Éditer .env avec vos paramètres

# 4. Démarrer l'application
npm start
\`\`\`

### ⚙️ Configuration

Créer un fichier \`.env\` à la racine :

\`\`\`env
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_APP_NAME=TeamTask
\`\`\`

### 🖥️ Installation Backend

\`\`\`bash
# 1. Cloner le backend
git clone https://github.com/votre-username/teamtask-backend.git
cd teamtask-backend

# 2. Installer les dépendances
npm install

# 3. Configuration
cp .env.example .env
# Configurer MongoDB et JWT

# 4. Démarrer le serveur
npm start
\`\`\`

## 📱 Utilisation

### 🔑 Première Connexion

1. **Inscription** : Créez un compte avec votre email
2. **Rôle** : Choisissez "Manager" pour accès complet
3. **Connexion** : Utilisez vos identifiants
4. **Dashboard** : Accédez à votre tableau de bord

### 📋 Gestion des Tâches

\`\`\`javascript
// Exemple d'utilisation de l'API
const createTask = async (taskData) => {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${token}\`
    },
    body: JSON.stringify(taskData)
  });
  return response.json();
};
\`\`\`

## 🏗️ Architecture

### 📁 Structure Frontend

\`\`\`
src/
├── 📁 components/          # Composants React réutilisables
│   ├── 🔐 Login.js        # Authentification
│   ├── 📊 Dashboard.js    # Tableau de bord
│   ├── 📝 TaskList.js     # Liste des tâches
│   └── 👨‍💼 AdminPanel.js   # Panneau d'administration
├── 📁 services/           # Services API
│   ├── 🔐 authService.js  # Service d'authentification
│   └── 📋 taskService.js  # Service des tâches
├── 📁 store/              # Configuration Redux
│   ├── 📁 slices/         # Slices Redux Toolkit
│   └── 🏪 store.js        # Configuration du store
└── 📁 config/             # Configuration
    └── ⚙️ api.js           # Configuration API
\`\`\`

### 🔄 Flux de Données

\`\`\`mermaid
graph TD
    A[👤 Utilisateur] --> B[⚛️ Composant React]
    B --> C[🔄 Action Redux]
    C --> D[📡 Service API]
    D --> E[🖥️ Backend]
    E --> F[🍃 MongoDB]
    F --> E
    E --> D
    D --> G[📦 Reducer]
    G --> H[🏪 Store]
    H --> B
\`\`\`

## 👥 Rôles et Permissions

### 👤 Utilisateur Standard
| Action | Permission |
|--------|------------|
| 👀 Voir ses tâches | ✅ |
| ✏️ Modifier ses tâches | ✅ |
| 🗑️ Supprimer ses tâches | ✅ |
| 👥 Voir autres tâches | ❌ |
| 📊 Panneau admin | ❌ |

### 👨‍💼 Manager
| Action | Permission |
|--------|------------|
| 👀 Voir toutes les tâches | ✅ |
| ➕ Créer des tâches | ✅ |
| 👥 Assigner des tâches | ✅ |
| 🗑️ Supprimer toutes tâches | ✅ |
| 📊 Panneau admin | ✅ |

## 🎨 Interface

### 📱 Pages Principales

1. **🔐 Authentification** - Connexion/Inscription sécurisée
2. **📊 Dashboard** - Vue d'ensemble avec statistiques
3. **📋 Tâches** - Gestion complète des tâches
4. **👨‍💼 Administration** - Gestion des utilisateurs (Managers)

### 🎯 Fonctionnalités UI

- 📱 **Responsive Design** - Adaptatif mobile/desktop
- ✨ **Animations Fluides** - Transitions CSS optimisées
- 🔄 **Feedback Visuel** - Indicateurs de chargement
- 🎨 **Design Cohérent** - Palette de couleurs harmonieuse

## 📡 API

### 🔐 Authentification

\`\`\`http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
\`\`\`

### 📋 Tâches

\`\`\`http
GET    /api/tasks          # Récupérer les tâches
POST   /api/tasks          # Créer une tâche
PUT    /api/tasks/:id      # Modifier une tâche
DELETE /api/tasks/:id      # Supprimer une tâche
\`\`\`

### 👥 Utilisateurs

\`\`\`http
GET /api/users             # Liste des utilisateurs (Managers)
\`\`\`

## 🚀 Déploiement

### 🌐 Frontend (Vercel/Netlify)

\`\`\`bash
# Build de production
npm run build

# Variables d'environnement
REACT_APP_API_URL=https://votre-api.com/api
\`\`\`

### 🖥️ Backend (Railway/Render)

\`\`\`bash
# Variables d'environnement
PORT=3000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=votre_secret_securise
JWT_EXPIRE=7d
\`\`\`

## 🤝 Contribution

Les contributions sont les bienvenues ! 🎉

### 📝 Comment Contribuer

1. **🍴 Fork** le projet
2. **🌿 Créer** une branche feature (\`git checkout -b feature/AmazingFeature\`)
3. **💾 Commit** vos changements (\`git commit -m 'Add AmazingFeature'\`)
4. **📤 Push** vers la branche (\`git push origin feature/AmazingFeature\`)
5. **🔄 Ouvrir** une Pull Request

### 🐛 Signaler un Bug

Utilisez les [Issues GitHub](../../issues) avec le template :

- **🏷️ Titre** : Description courte du problème
- **📝 Description** : Étapes pour reproduire
- **🖼️ Screenshots** : Si applicable
- **💻 Environnement** : OS, navigateur, version

## 📊 Statistiques du Projet

![GitHub stars](https://img.shields.io/github/stars/votre-username/teamtask-frontend?style=social)
![GitHub forks](https://img.shields.io/github/forks/votre-username/teamtask-frontend?style=social)
![GitHub issues](https://img.shields.io/github/issues/votre-username/teamtask-frontend)
![GitHub pull requests](https://img.shields.io/github/issues-pr/votre-username/teamtask-frontend)

## 📄 License

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

<div align="center">

**Fait avec ❤️ par [Votre Nom](https://github.com/votre-username)**

[⬆️ Retour en haut](#-teamtask---application-de-gestion-des-tâches)

</div>
