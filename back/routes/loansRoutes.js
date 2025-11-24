import express from 'express';
import loansController from '../controllers/loansController.js';
// Toutes les routes commencent par /api/loans
// par ce que dans index.js on a fait app.use('/api/loans', loansRoutes);

// Créer un routeur Express
const router = express.Router();

// Route pour récupérer tous les emprunts
router.get('/', loansController.getAllLoans);
// Route pour récupérer un emprunt par son ID
router.get('/:id', loansController.getLoanById);
// Route pour récupérer tous les emprunts d'un emprunteur
router.get('/loaner/:loanerId', loansController.getLoansByLoanerId);
// Route pour récupérer tous les emprunts d'un livre
router.get('/book/:bookId', loansController.getLoansByBookId);
// Route pour créer un nouvel emprunt
router.post('/', loansController.createLoan);
// Route pour mettre à jour un emprunt existant
router.put('/:id', loansController.updateLoan);
// Route pour retourner un livre (mise à jour de la date de fin)
router.put('/:id/return', loansController.returnLoan);
// Route pour supprimer un emprunt par son ID
router.delete('/:id', loansController.deleteLoan);

export default router;

