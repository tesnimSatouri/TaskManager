const express = require('express');
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const User = require('../models/user');
const { auth, isManager } = require('../middleware/auth');

const router = express.Router();

// GET /tasks - Récupérer les tâches
router.get('/', auth, async (req, res) => {
  try {
    let query = {};
    
    // Si utilisateur normal, ne voir que ses tâches
    if (req.user.role === 'user') {
      query.assignedTo = req.user._id;
    }
    
    // Filtrage par statut si spécifié
    if (req.query.status) {
      query.status = req.query.status;
    }

    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// POST /tasks - Créer une tâche
router.post('/', [auth, 
  body('title').trim().isLength({ min: 1 }).withMessage('Le titre est requis'),
  body('description').optional().trim(),
  body('status').optional().isIn(['à faire', 'en cours', 'terminée']),
  body('assignedTo').optional().isMongoId().withMessage('ID utilisateur invalide')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, status, assignedTo } = req.body;

    // Vérifier les permissions d'assignation
    let taskAssignedTo = req.user._id; // Par défaut, assigner à soi-même
    
    if (assignedTo && assignedTo !== req.user._id.toString()) {
      // Seul un manager peut assigner à quelqu'un d'autre
      if (req.user.role !== 'manager') {
        return res.status(403).json({ message: 'Seul un manager peut assigner une tâche à un autre utilisateur' });
      }
      
      // Vérifier que l'utilisateur assigné existe
      const assignedUser = await User.findById(assignedTo);
      if (!assignedUser) {
        return res.status(404).json({ message: 'Utilisateur assigné introuvable' });
      }
      
      taskAssignedTo = assignedTo;
    }

    const task = new Task({
      title,
      description,
      status: status || 'à faire',
      assignedTo: taskAssignedTo,
      createdBy: req.user._id
    });

    await task.save();
    await task.populate('assignedTo', 'name email');
    await task.populate('createdBy', 'name email');

    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// PUT /tasks/:id - Modifier une tâche
router.put('/:id', [auth,
  body('title').optional().trim().isLength({ min: 1 }),
  body('description').optional().trim(),
  body('status').optional().isIn(['à faire', 'en cours', 'terminée'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tâche introuvable' });
    }

    // Vérifier les permissions
    if (req.user.role === 'user' && task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    // Mettre à jour les champs autorisés
    const allowedUpdates = ['title', 'description', 'status'];
    const updates = {};
    
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email').populate('createdBy', 'name email');

    res.json({ success: true, task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// DELETE /tasks/:id - Supprimer une tâche
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tâche introuvable' });
    }

    // Seul un manager ou le créateur peut supprimer
    if (req.user.role !== 'manager' && task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Tâche supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

module.exports = router;