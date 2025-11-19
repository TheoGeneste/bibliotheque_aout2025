import express from 'express';
import typesController from '../controllers/typesController.js';
// Toutes les toutes commencent par /api/types
// par ce que dans index.js on a fait app.use('/api/types', typesRoutes);

// Créer un routeur Express
const router = express.Router();

// Route pour récupérer tous les types de livres
router.get('/', typesController.getAllTypes);
// Route pour récupérer un type de livre par son ID
router.get('/:id', typesController.getTypeById);
// Route pour créer un nouveau type de livre
router.post('/', typesController.createType);
// Route pour mettre à jour un type de livre existant
router.put('/:id', typesController.updateType);
// Route pour supprimer un type de livre par son ID
router.delete('/:id', typesController.deleteType);

export default router;