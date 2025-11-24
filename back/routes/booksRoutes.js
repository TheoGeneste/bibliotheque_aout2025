import express from 'express';
import booksController from '../controllers/booksController.js';
// Toutes les routes commencent par /api/books
// par ce que dans index.js on a fait app.use('/api/books', booksRoutes);

// Créer un routeur Express
const router = express.Router();

// Route pour récupérer tous les livres
router.get('/', booksController.getAllBooks);
// Route pour récupérer un livre par son ID
router.get('/:id', booksController.getBookById);
// Route pour créer un nouveau livre
router.post('/', booksController.createBook);
// Route pour mettre à jour un livre existant
router.put('/:id', booksController.updateBook);
// Route pour supprimer un livre par son ID
router.delete('/:id', booksController.deleteBook);

export default router;

