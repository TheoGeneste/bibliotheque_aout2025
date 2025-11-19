import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({message : "Bienvenue dans l'API de la bibliothèque !"});
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`L'API est lancé sur http://localhost:${process.env.SERVER_PORT}`);  
})