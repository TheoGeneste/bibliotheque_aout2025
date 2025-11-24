import editorsModel from "../models/editorsModel.js";

// Récupérer tous les éditeurs
// req : requête HTTP
// res : réponse HTTP
const getAllEditors = async (req, res) => {
    // trycatch pour gérer les erreurs
    // On essaye d'exécuter le code et si une erreur survient, on la catch
    try {
        // Appel du modèle pour récupérer tous les éditeurs
        const editors = await editorsModel.fetchAllEditors();
        // Définition du code de statut HTTP 200 (OK)
        res.status(200);
        // Envoi de la réponse avec les éditeurs récupérés en JSON
        res.json(editors);
    } catch (error) {
        // En cas d'erreur, on envoie un statut 500 (erreur serveur)
        res.status(500);
        // On envoie un message d'erreur en JSON
        res.json({message: "Erreur serveur lors de la récupération des éditeurs."});
    }
}

// Récupérer un éditeur par son ID
const getEditorById = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        const editor = await editorsModel.fetchEditorById(id);
        // Vérification si l'éditeur existe (editor n'est pas undefined)
        // Si oui, on renvoie l'éditeur avec un statut 200
        // Sinon, on renvoie un statut 404 (non trouvé)
        if (editor) {
            res.status(200);
            res.json(editor);
        }else{
            res.status(404);
            res.json({message: "Éditeur non trouvé."});
        }
    }catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la récupération de l'éditeur."});
    }
}

// Création d'un nouvel éditeur
const createEditor = async (req, res) => {
    try {
        // {
        //     "label": "Nouvel Éditeur"
        // }
        // Récupération du label depuis le corps de la requête
        const {label} = req.body;
        const createEditor = await editorsModel.createEditor(label);
        // Status 201 : Créé
        res.status(201);
        res.json({id: createEditor});
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la création de l'éditeur."});
    }
}

// Mise à jour d'un éditeur existant
const updateEditor = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        // Récupération du label depuis le corps de la requête
        const {label} = req.body;
        // updateEditor : nombre de lignes affectées
        const updateEditor = await editorsModel.updateEditor(id, label);
        if (updateEditor === 0) {
            res.status(404);
            res.json({message: "Éditeur non trouvé ou pas de modification."});
        }else{
            res.status(200);
            res.json({message: "Éditeur mis à jour avec succès."});
        }
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la mise à jour de l'éditeur."});
    }
}

// Suppression d'un éditeur par son ID
const deleteEditor = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        // deleteEditor : nombre de lignes affectées
        const deleteEditor = await editorsModel.deleteEditor(id);
        if (deleteEditor === 0) {
            res.status(404);
            res.json({message: "Éditeur non trouvé."});
        }else{
            res.status(200);
            res.json({message: "Éditeur supprimé avec succès."});
        }
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la suppression de l'éditeur."});
    }
}

export default {
    getAllEditors,
    getEditorById,
    createEditor,
    updateEditor,
    deleteEditor
}

