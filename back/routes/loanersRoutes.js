import express from 'express';
import loanersController from '../controllers/loanersController.js';
// Toutes les routes commencent par /api/loaners
// par ce que dans index.js on a fait app.use('/api/loaners', loanersRoutes);

// Créer un routeur Express
const router = express.Router();

// Route pour récupérer tous les emprunteurs
router.get('/', loanersController.getAllLoaners);
// Route pour récupérer un emprunteur par son ID
router.get('/:id', loanersController.getLoanerById);
// Route pour créer un nouvel emprunteur
router.post('/', loanersController.createLoaner);
// Route pour mettre à jour un emprunteur existant
router.put('/:id', loanersController.updateLoaner);
// Route pour supprimer un emprunteur par son ID
router.delete('/:id', loanersController.deleteLoaner);

export default router;

