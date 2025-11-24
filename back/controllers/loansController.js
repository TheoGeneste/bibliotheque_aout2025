import loansModel from "../models/loansModel.js";
import booksModel from "../models/booksModel.js";

// Récupérer tous les emprunts
// req : requête HTTP
// res : réponse HTTP
const getAllLoans = async (req, res) => {
    // trycatch pour gérer les erreurs
    // On essaye d'exécuter le code et si une erreur survient, on la catch
    try {
        // Appel du modèle pour récupérer tous les emprunts
        const loans = await loansModel.fetchAllLoans();
        // Définition du code de statut HTTP 200 (OK)
        res.status(200);
        // Envoi de la réponse avec les emprunts récupérés en JSON
        res.json(loans);
    } catch (error) {
        // En cas d'erreur, on envoie un statut 500 (erreur serveur)
        res.status(500);
        // On envoie un message d'erreur en JSON
        res.json({message: "Erreur serveur lors de la récupération des emprunts."});
    }
}

// Récupérer un emprunt par son ID
const getLoanById = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        const loan = await loansModel.fetchLoanById(id);
        // Vérification si l'emprunt existe (loan n'est pas undefined)
        // Si oui, on renvoie l'emprunt avec un statut 200
        // Sinon, on renvoie un statut 404 (non trouvé)
        if (loan) {
            res.status(200);
            res.json(loan);
        }else{
            res.status(404);
            res.json({message: "Emprunt non trouvé."});
        }
    }catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la récupération de l'emprunt."});
    }
}

// Récupérer tous les emprunts d'un emprunteur
const getLoansByLoanerId = async (req, res) => {
    try {
        const loanerId = req.params.loanerId;
        const loans = await loansModel.fetchLoansByLoanerId(loanerId);
        res.status(200);
        res.json(loans);
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la récupération des emprunts de l'emprunteur."});
    }
}

// Récupérer tous les emprunts d'un livre
const getLoansByBookId = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const loans = await loansModel.fetchLoansByBookId(bookId);
        res.status(200);
        res.json(loans);
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la récupération des emprunts du livre."});
    }
}

// Création d'un nouvel emprunt
const createLoan = async (req, res) => {
    try {
        // {
        //     "loaner_id": 1,
        //     "book_id": 1,
        //     "start_date": "2024-01-01",
        //     "end_date": null
        // }
        // Récupération des données depuis le corps de la requête
        const {loaner_id, book_id, start_date, end_date} = req.body;
        // Vérification que les champs obligatoires sont présents
        if (!loaner_id || !book_id) {
            res.status(400);
            res.json({message: "L'ID de l'emprunteur et l'ID du livre sont requis."});
            return;
        }
        // Vérification que le livre est disponible
        const book = await booksModel.fetchBookById(book_id);
        if (!book) {
            res.status(404);
            res.json({message: "Livre non trouvé."});
            return;
        }
        if (!book.is_available) {
            res.status(400);
            res.json({message: "Le livre n'est pas disponible."});
            return;
        }
        const loanId = await loansModel.createLoan(loaner_id, book_id, start_date, end_date);
        // Mise à jour de la disponibilité du livre
        await booksModel.updateBook(book_id, book.title, book.release_date, false, book.types_id);
        // Status 201 : Créé
        res.status(201);
        res.json({id: loanId});
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la création de l'emprunt."});
    }
}

// Mise à jour d'un emprunt existant
const updateLoan = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        // Récupération des données depuis le corps de la requête
        const {loaner_id, book_id, start_date, end_date} = req.body;
        // Vérification que les champs obligatoires sont présents
        if (!loaner_id || !book_id || !start_date) {
            res.status(400);
            res.json({message: "L'ID de l'emprunteur, l'ID du livre et la date de début sont requis."});
            return;
        }
        // updateLoan : nombre de lignes affectées
        const updateLoan = await loansModel.updateLoan(id, loaner_id, book_id, start_date, end_date);
        if (updateLoan === 0) {
            res.status(404);
            res.json({message: "Emprunt non trouvé ou pas de modification."});
        }else{
            res.status(200);
            res.json({message: "Emprunt mis à jour avec succès."});
        }
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la mise à jour de l'emprunt."});
    }
}

// Retour d'un livre (mise à jour de la date de fin)
const returnLoan = async (req, res) => {
    try {
        const id = req.params.id;
        const {end_date} = req.body;
        // Si end_date n'est pas fourni, on utilise la date actuelle
        const returnDate = end_date || new Date().toISOString().split('T')[0];
        const loan = await loansModel.fetchLoanById(id);
        if (!loan) {
            res.status(404);
            res.json({message: "Emprunt non trouvé."});
            return;
        }
        const updateLoan = await loansModel.returnLoan(id, returnDate);
        if (updateLoan === 0) {
            res.status(404);
            res.json({message: "Emprunt non trouvé."});
        }else{
            // Mise à jour de la disponibilité du livre
            const book = await booksModel.fetchBookById(loan.book_id);
            if (book) {
                await booksModel.updateBook(loan.book_id, book.title, book.release_date, true, book.types_id);
            }
            res.status(200);
            res.json({message: "Livre retourné avec succès."});
        }
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors du retour du livre."});
    }
}

// Suppression d'un emprunt par son ID
const deleteLoan = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        // Récupération de l'emprunt avant suppression pour remettre le livre disponible
        const loan = await loansModel.fetchLoanById(id);
        // deleteLoan : nombre de lignes affectées
        const deleteLoan = await loansModel.deleteLoan(id);
        if (deleteLoan === 0) {
            res.status(404);
            res.json({message: "Emprunt non trouvé."});
        }else{
            // Si l'emprunt n'a pas de date de fin, on remet le livre disponible
            if (loan && !loan.end_date) {
                const book = await booksModel.fetchBookById(loan.book_id);
                if (book) {
                    await booksModel.updateBook(loan.book_id, book.title, book.release_date, true, book.types_id);
                }
            }
            res.status(200);
            res.json({message: "Emprunt supprimé avec succès."});
        }
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la suppression de l'emprunt."});
    }
}

export default {
    getAllLoans,
    getLoanById,
    getLoansByLoanerId,
    getLoansByBookId,
    createLoan,
    updateLoan,
    returnLoan,
    deleteLoan
}

