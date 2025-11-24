import genresModel from "../models/genresModel.js";

// Récupérer tous les genres
// req : requête HTTP
// res : réponse HTTP
const getAllGenres = async (req, res) => {
    // trycatch pour gérer les erreurs
    // On essaye d'exécuter le code et si une erreur survient, on la catch
    try {
        // Appel du modèle pour récupérer tous les genres
        const genres = await genresModel.fetchAllGenres();
        // Définition du code de statut HTTP 200 (OK)
        res.status(200);
        // Envoi de la réponse avec les genres récupérés en JSON
        res.json(genres);
    } catch (error) {
        // En cas d'erreur, on envoie un statut 500 (erreur serveur)
        res.status(500);
        // On envoie un message d'erreur en JSON
        res.json({message: "Erreur serveur lors de la récupération des genres."});
    }
}

// Récupérer un genre par son ID
const getGenreById = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        const genre = await genresModel.fetchGenreById(id);
        // Vérification si le genre existe (genre n'est pas undefined)
        // Si oui, on renvoie le genre avec un statut 200
        // Sinon, on renvoie un statut 404 (non trouvé)
        if (genre) {
            res.status(200);
            res.json(genre);
        }else{
            res.status(404);
            res.json({message: "Genre non trouvé."});
        }
    }catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la récupération du genre."});
    }
}

// Création d'un nouveau genre
const createGenre = async (req, res) => {
    try {
        // {
        //     "label": "Nouveau Genre"
        // }
        // Récupération du label depuis le corps de la requête
        const {label} = req.body;
        const createGenre = await genresModel.createGenre(label);
        // Status 201 : Créé
        res.status(201);
        res.json({id: createGenre});
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la création du genre."});
    }
}

// Mise à jour d'un genre existant
const updateGenre = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        // Récupération du label depuis le corps de la requête
        const {label} = req.body;
        // updateGenre : nombre de lignes affectées
        const updateGenre = await genresModel.updateGenre(id, label);
        if (updateGenre === 0) {
            res.status(404);
            res.json({message: "Genre non trouvé ou pas de modification."});
        }else{
            res.status(200);
            res.json({message: "Genre mis à jour avec succès."});
        }
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la mise à jour du genre."});
    }
}

// Suppression d'un genre par son ID
const deleteGenre = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        // deleteGenre : nombre de lignes affectées
        const deleteGenre = await genresModel.deleteGenre(id);
        if (deleteGenre === 0) {
            res.status(404);
            res.json({message: "Genre non trouvé."});
        }else{
            res.status(200);
            res.json({message: "Genre supprimé avec succès."});
        }
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la suppression du genre."});
    }
}

export default {
    getAllGenres,
    getGenreById,
    createGenre,
    updateGenre,
    deleteGenre
}

