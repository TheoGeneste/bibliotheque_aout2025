import typesModel from "../models/typesModel.js";

// Récupérer tous les types de livres
// req : requête HTTP
// res : réponse HTTP
const getAllTypes = async (req, res) => {
    // trycatch pour gérer les erreurs
    // On essaye d'exécuter le code et si une erreur survient, on la catch
    try {
        // Appel du modèle pour récupérer tous les types
        const types = await typesModel.fetchAllTypes();
        // Définition du code de statut HTTP 200 (OK)
        res.status(200);
        // Envoi de la réponse avec les types récupérés en JSON
        res.json(types);
    } catch (error) {
        // En cas d'erreur, on envoie un statut 500 (erreur serveur)
        res.status(500);
        // On envoie un message d'erreur en JSON
        res.json({message: "Erreur serveur lors de la récupération des types."});
    }
}

// Récupérer un type de livre par son ID
const getTypeById = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        const type = await typesModel.fetchTypeById(id);
        // Vérification si le type existe (type n'est pas undefined)
        // Si oui, on renvoie le type avec un statut 200
        // Sinon, on renvoie un statut 404 (non trouvé)
        // if (type != undefined) {
        if (type) {
            res.status(200);
            res.json(type);
        }else{
            res.status(404);
            res.json({message: "Type non trouvé."});
        }
    }catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la récupération du type."});
    }
}

// Création d'un nouveau type de livre
const createType = async (req, res) => {
    try {
        // {
        //     "label": "Nouveau Type"
        // }
        // Récupération du label depuis le corps de la requête
        const {label} = req.body;
        const createType = await typesModel.createType(label);
        // Status 201 : Créé
        res.status(201);
        res.json(createType);
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la création du type."});
    }
}

// Mise à jour d'un type de livre existant
const updateType = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        // Récupération du label depuis le corps de la requête
        const {label} = req.body;
        // updateType : nombre de lignes affectées
        const updateType = await typesModel.updateType(id, label);
        if (updateType === 0) {
            res.status(404);
            res.json({message: "Type non trouvé ou pas de modification."});
        }else{
            res.status(201);
            res.json(updateType);
        }
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la mise à jour du type."});
    }
}

// Suppression d'un type de livre par son ID
const deleteType = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        // deleteType : nombre de lignes affectées
        const deleteType = await typesModel.deleteType(id);
        if (deleteType === 0) {
            res.status(404);
            res.json({message: "Type non trouvé."});
        }else{
            res.status(200);
            res.json(deleteType);
        }
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la suppression du type."});
    }
}

export default {
    getAllTypes,
    getTypeById,
    createType,
    updateType,
    deleteType
}