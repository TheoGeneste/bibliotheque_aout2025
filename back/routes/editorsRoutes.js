import express from 'express';
import editorsController from '../controllers/editorsController.js';
// Toutes les routes commencent par /api/editors
// par ce que dans index.js on a fait app.use('/api/editors', editorsRoutes);

// Créer un routeur Express
const router = express.Router();

// Route pour récupérer tous les éditeurs
router.get('/', editorsController.getAllEditors);
// Route pour récupérer un éditeur par son ID
router.get('/:id', editorsController.getEditorById);
// Route pour créer un nouvel éditeur
router.post('/', editorsController.createEditor);
// Route pour mettre à jour un éditeur existant
router.put('/:id', editorsController.updateEditor);
// Route pour supprimer un éditeur par son ID
router.delete('/:id', editorsController.deleteEditor);

export default router;

