import loanersModel from "../models/loanersModel.js";

// Récupérer tous les emprunteurs
// req : requête HTTP
// res : réponse HTTP
const getAllLoaners = async (req, res) => {
    // trycatch pour gérer les erreurs
    // On essaye d'exécuter le code et si une erreur survient, on la catch
    try {
        // Appel du modèle pour récupérer tous les emprunteurs
        const loaners = await loanersModel.fetchAllLoaners();
        // Définition du code de statut HTTP 200 (OK)
        res.status(200);
        // Envoi de la réponse avec les emprunteurs récupérés en JSON
        res.json(loaners);
    } catch (error) {
        // En cas d'erreur, on envoie un statut 500 (erreur serveur)
        res.status(500);
        // On envoie un message d'erreur en JSON
        res.json({message: "Erreur serveur lors de la récupération des emprunteurs."});
    }
}

// Récupérer un emprunteur par son ID
const getLoanerById = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        const loaner = await loanersModel.fetchLoanerById(id);
        // Vérification si l'emprunteur existe (loaner n'est pas undefined)
        // Si oui, on renvoie l'emprunteur avec un statut 200
        // Sinon, on renvoie un statut 404 (non trouvé)
        if (loaner) {
            res.status(200);
            res.json(loaner);
        }else{
            res.status(404);
            res.json({message: "Emprunteur non trouvé."});
        }
    }catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la récupération de l'emprunteur."});
    }
}

// Création d'un nouvel emprunteur
const createLoaner = async (req, res) => {
    try {
        // {
        //     "lastname": "Doe",
        //     "firstname": "John",
        //     "email": "john.doe@example.com",
        //     "street_number": 123,
        //     "street_name": "Rue de la Paix",
        //     "city": "Paris",
        //     "postal_code": "75001",
        //     "additional_adress": "Appartement 4B",
        //     "user_id": 1
        // }
        // Récupération des données depuis le corps de la requête
        const {lastname, firstname, email, street_number, street_name, city, postal_code, additional_adress, user_id} = req.body;
        // Vérification que les champs obligatoires sont présents
        if (!lastname || !firstname || !email) {
            res.status(400);
            res.json({message: "Le nom, le prénom et l'email sont requis."});
            return;
        }
        const createLoaner = await loanersModel.createLoaner(lastname, firstname, email, street_number, street_name, city, postal_code, additional_adress, user_id);
        // Status 201 : Créé
        res.status(201);
        res.json({id: createLoaner});
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la création de l'emprunteur."});
    }
}

// Mise à jour d'un emprunteur existant
const updateLoaner = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        // Récupération des données depuis le corps de la requête
        const {lastname, firstname, email, street_number, street_name, city, postal_code, additional_adress, user_id} = req.body;
        // Vérification que les champs obligatoires sont présents
        if (!lastname || !firstname || !email) {
            res.status(400);
            res.json({message: "Le nom, le prénom et l'email sont requis."});
            return;
        }
        // updateLoaner : nombre de lignes affectées
        const updateLoaner = await loanersModel.updateLoaner(id, lastname, firstname, email, street_number, street_name, city, postal_code, additional_adress, user_id);
        if (updateLoaner === 0) {
            res.status(404);
            res.json({message: "Emprunteur non trouvé ou pas de modification."});
        }else{
            res.status(200);
            res.json({message: "Emprunteur mis à jour avec succès."});
        }
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la mise à jour de l'emprunteur."});
    }
}

// Suppression d'un emprunteur par son ID
const deleteLoaner = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        // deleteLoaner : nombre de lignes affectées
        const deleteLoaner = await loanersModel.deleteLoaner(id);
        if (deleteLoaner === 0) {
            res.status(404);
            res.json({message: "Emprunteur non trouvé."});
        }else{
            res.status(200);
            res.json({message: "Emprunteur supprimé avec succès."});
        }
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la suppression de l'emprunteur."});
    }
}

export default {
    getAllLoaners,
    getLoanerById,
    createLoaner,
    updateLoaner,
    deleteLoaner
}

