import express from 'express';
import genresController from '../controllers/genresController.js';
// Toutes les routes commencent par /api/genres
// par ce que dans index.js on a fait app.use('/api/genres', genresRoutes);

// Créer un routeur Express
const router = express.Router();

// Route pour récupérer tous les genres
router.get('/', genresController.getAllGenres);
// Route pour récupérer un genre par son ID
router.get('/:id', genresController.getGenreById);
// Route pour créer un nouveau genre
router.post('/', genresController.createGenre);
// Route pour mettre à jour un genre existant
router.put('/:id', genresController.updateGenre);
// Route pour supprimer un genre par son ID
router.delete('/:id', genresController.deleteGenre);

export default router;

