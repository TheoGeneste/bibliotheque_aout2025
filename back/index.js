import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import typesRoutes from './routes/typesRoutes.js';
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

app.listen(process.env.SERVER_PORT, () => {
    console.log(`L'API est lancé sur http://localhost:${process.env.SERVER_PORT}`);  
})