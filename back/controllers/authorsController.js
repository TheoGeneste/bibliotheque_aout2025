import authorsModel from "../models/authorsModel.js";

// Récupérer tous les auteurs
// req : requête HTTP
// res : réponse HTTP
const getAllAuthors = async (req, res) => {
    // trycatch pour gérer les erreurs
    // On essaye d'exécuter le code et si une erreur survient, on la catch
    try {
        // Appel du modèle pour récupérer tous les auteurs
        const authors = await authorsModel.fetchAllAuthors();
        // Définition du code de statut HTTP 200 (OK)
        res.status(200);
        // Envoi de la réponse avec les auteurs récupérés en JSON
        res.json(authors);
    } catch (error) {
        // En cas d'erreur, on envoie un statut 500 (erreur serveur)
        res.status(500);
        // On envoie un message d'erreur en JSON
        res.json({message: "Erreur serveur lors de la récupération des auteurs."});
    }
}

// Récupérer un auteur par son ID
const getAuthorById = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        const author = await authorsModel.fetchAuthorById(id);
        // Vérification si l'auteur existe (author n'est pas undefined)
        // Si oui, on renvoie l'auteur avec un statut 200
        // Sinon, on renvoie un statut 404 (non trouvé)
        if (author) {
            res.status(200);
            res.json(author);
        }else{
            res.status(404);
            res.json({message: "Auteur non trouvé."});
        }
    }catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la récupération de l'auteur."});
    }
}

// Création d'un nouvel auteur
const createAuthor = async (req, res) => {
    try {
        // {
        //     "lastname": "Doe",
        //     "firstname": "John",
        //     "born_at": "1980-01-01",
        //     "die_at": null
        // }
        // Récupération des données depuis le corps de la requête
        const {lastname, firstname, born_at, die_at} = req.body;
        // Vérification que les champs obligatoires sont présents
        if (!lastname || !firstname) {
            res.status(400);
            res.json({message: "Le nom et le prénom sont requis."});
            return;
        }
        const createAuthor = await authorsModel.createAuthor(lastname, firstname, born_at, die_at);
        // Status 201 : Créé
        res.status(201);
        res.json({id: createAuthor});
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la création de l'auteur."});
    }
}

// Mise à jour d'un auteur existant
const updateAuthor = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        // Récupération des données depuis le corps de la requête
        const {lastname, firstname, born_at, die_at} = req.body;
        // Vérification que les champs obligatoires sont présents
        if (!lastname || !firstname) {
            res.status(400);
            res.json({message: "Le nom et le prénom sont requis."});
            return;
        }
        // updateAuthor : nombre de lignes affectées
        const updateAuthor = await authorsModel.updateAuthor(id, lastname, firstname, born_at, die_at);
        if (updateAuthor === 0) {
            res.status(404);
            res.json({message: "Auteur non trouvé ou pas de modification."});
        }else{
            res.status(200);
            res.json({message: "Auteur mis à jour avec succès."});
        }
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la mise à jour de l'auteur."});
    }
}

// Suppression d'un auteur par son ID
const deleteAuthor = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        // deleteAuthor : nombre de lignes affectées
        const deleteAuthor = await authorsModel.deleteAuthor(id);
        if (deleteAuthor === 0) {
            res.status(404);
            res.json({message: "Auteur non trouvé."});
        }else{
            res.status(200);
            res.json({message: "Auteur supprimé avec succès."});
        }
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la suppression de l'auteur."});
    }
}

export default {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
}

