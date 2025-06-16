# 🚀 TeamTask - Application de Gestion des Tâches Collaborative

<div align="center">

![TeamTask Banner](https://img.shields.io/badge/TeamTask-Task%20Management%20App-blue?style=for-the-badge&logo=task&logoColor=white)

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-1.9.7-764ABC?style=flat-square&logo=redux)](https://redux-toolkit.js.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=flat-square&logo=jsonwebtokens)](https://jwt.io/)

**Application MERN complète pour la gestion collaborative des tâches avec authentification JWT et gestion des rôles**

• [📖 Documentation](#installation) • [🐛 Report Bug](../../issues) • [✨ Request Feature](../../issues)

</div>

---

## 📋 Table des Matières

- [✨ Fonctionnalités](#-fonctionnalités)
- [🛠️ Technologies](#️-technologies)
- [🚀 Installation](#-installation)



## ✨ Fonctionnalités

### 🔐 **Authentification Sécurisée**
- ✅ Inscription et connexion avec validation complète
- ✅ Authentification JWT avec stockage localStorage
- ✅ Gestion des rôles (Utilisateur/Manager)
- ✅ Routes protégées et middleware de sécurité
- ✅ Gestion automatique de l'expiration des tokens

### 📊 **Gestion des Tâches Avancée**
- ✅ CRUD complet avec permissions granulaires
- ✅ Filtrage par statut (À faire, En cours, Terminée)
- ✅ Assignation des tâches (Managers uniquement)
- ✅ Statistiques en temps réel
- ✅ Interface intuitive avec modales

### 👥 **Système de Rôles**
- **👤 Utilisateurs** : Gestion de leurs propres tâches
- **👨‍💼 Managers** : Accès complet + panneau d'administration
- ✅ Permissions vérifiées côté frontend et backend

### 🎨 **Interface Moderne**
- ✅ Design responsive (mobile-first)
- ✅ Animations et transitions fluides
- ✅ Feedback visuel pour toutes les actions
- ✅ Thème cohérent sans framework CSS externe

## 🛠️ Technologies

<table>
<tr>
<td>

### 🎨 **Frontend**
- **⚛️ React 18** - Interface utilisateur
- **🔄 Redux Toolkit** - Gestion d'état
- **🧭 React Router** - Navigation
- **📡 Axios** - Client HTTP
- **🎨 CSS3** - Styling personnalisé

</td>
<td>

### 🖥️ **Backend**
- **🟢 Node.js** - Runtime JavaScript
- **🚀 Express.js** - Framework web
- **🍃 MongoDB** - Base de données
- **📦 Mongoose** - ODM MongoDB
- **🔐 JWT** - Authentification
- **🔒 bcryptjs** - Hachage sécurisé

</td>
</tr>
</table>

## 🚀 Installation

### 📋 **Prérequis**
- **Node.js** (v14 ou supérieur)
- **MongoDB** (local ou MongoDB Atlas)
- **npm** ou **yarn**
- **Git**

### 🔧 **Installation Complète**

#### 1. **Cloner le Repository**
```bash
git clone https://github.com/tesnimSatouri/TaskManager.git
cd teamtask-frontend  , npm i , npm run dev
cd TaskManagerBack  , npm i , npm start
