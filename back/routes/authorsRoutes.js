import express from 'express';
import authorsController from '../controllers/authorsController.js';
// Toutes les routes commencent par /api/authors
// par ce que dans index.js on a fait app.use('/api/authors', authorsRoutes);

// Créer un routeur Express
const router = express.Router();

// Route pour récupérer tous les auteurs
router.get('/', authorsController.getAllAuthors);
// Route pour récupérer un auteur par son ID
router.get('/:id', authorsController.getAuthorById);
// Route pour créer un nouvel auteur
router.post('/', authorsController.createAuthor);
// Route pour mettre à jour un auteur existant
router.put('/:id', authorsController.updateAuthor);
// Route pour supprimer un auteur par son ID
router.delete('/:id', authorsController.deleteAuthor);

export default router;

