const express = require('express');
const User = require('../models/user');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Middleware pour vérifier si l'utilisateur est manager
const isManager = (req, res, next) => {
  if (req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Accès refusé. Seuls les managers peuvent accéder à cette ressource.' });
  }
  next();
};

// GET /users - Récupérer tous les utilisateurs (managers seulement)
router.get('/', [auth, isManager], async (req, res) => {
  try {
    const users = await User.find({}, '-password')
      .sort({ createdAt: -1 });

    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur serveur', 
      error: error.message 
    });
  }
});

module.exports = router;