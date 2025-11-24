import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import typesRoutes from './routes/typesRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import authorsRoutes from './routes/authorsRoutes.js';
import editorsRoutes from './routes/editorsRoutes.js';
import genresRoutes from './routes/genresRoutes.js';
import booksRoutes from './routes/booksRoutes.js';
import loanersRoutes from './routes/loanersRoutes.js';
import loansRoutes from './routes/loansRoutes.js';
// Charge les variables d'environnement depuis le fichier .env
dotenv.config();

// Crée une instance d'Express
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({message : "Bienvenue dans l'API de la bibliothèque !"});
});

// Import des routes
app.use('/api/types', typesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/authors', authorsRoutes);
app.use('/api/editors', editorsRoutes);
app.use('/api/genres', genresRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/loaners', loanersRoutes);
app.use('/api/loans', loansRoutes);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`L'API est lancé sur http://localhost:${process.env.SERVER_PORT}`);  
})