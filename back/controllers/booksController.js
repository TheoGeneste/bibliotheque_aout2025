import booksModel from "../models/booksModel.js";

// Récupérer tous les livres
// req : requête HTTP
// res : réponse HTTP
const getAllBooks = async (req, res) => {
    // trycatch pour gérer les erreurs
    // On essaye d'exécuter le code et si une erreur survient, on la catch
    try {
        // Appel du modèle pour récupérer tous les livres
        const books = await booksModel.fetchAllBooks();
        // Définition du code de statut HTTP 200 (OK)
        res.status(200);
        // Envoi de la réponse avec les livres récupérés en JSON
        res.json(books);
    } catch (error) {
        // En cas d'erreur, on envoie un statut 500 (erreur serveur)
        res.status(500);
        // On envoie un message d'erreur en JSON
        res.json({message: "Erreur serveur lors de la récupération des livres."});
    }
}

// Récupérer un livre par son ID
const getBookById = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        const book = await booksModel.fetchBookById(id);
        // Vérification si le livre existe (book n'est pas undefined)
        // Si oui, on renvoie le livre avec un statut 200
        // Sinon, on renvoie un statut 404 (non trouvé)
        if (book) {
            // Récupération des relations (auteurs, éditeurs, genres)
            const authors = await booksModel.fetchBookAuthors(id);
            const editors = await booksModel.fetchBookEditors(id);
            const genres = await booksModel.fetchBookGenres(id);
            // Ajout des relations au livre
            book.authors = authors;
            book.editors = editors;
            book.genres = genres;
            res.status(200);
            res.json(book);
        }else{
            res.status(404);
            res.json({message: "Livre non trouvé."});
        }
    }catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la récupération du livre."});
    }
}

// Création d'un nouveau livre
const createBook = async (req, res) => {
    try {
        // {
        //     "title": "Titre du livre",
        //     "release_date": "2024-01-01",
        //     "is_available": true,
        //     "types_id": 1,
        //     "author_ids": [1, 2],
        //     "editor_ids": [1],
        //     "genre_ids": [1, 2]
        // }
        // Récupération des données depuis le corps de la requête
        const {title, release_date, is_available, types_id, author_ids, editor_ids, genre_ids} = req.body;
        // Vérification que les champs obligatoires sont présents
        if (!title || !release_date || !types_id) {
            res.status(400);
            res.json({message: "Le titre, la date de sortie et le type sont requis."});
            return;
        }
        const bookId = await booksModel.createBook(title, release_date, is_available, types_id);
        // Ajout des relations si elles sont fournies
        if (author_ids && Array.isArray(author_ids)) {
            for (const authorId of author_ids) {
                await booksModel.addAuthorToBook(bookId, authorId);
            }
        }
        if (editor_ids && Array.isArray(editor_ids)) {
            for (const editorId of editor_ids) {
                await booksModel.addEditorToBook(bookId, editorId);
            }
        }
        if (genre_ids && Array.isArray(genre_ids)) {
            for (const genreId of genre_ids) {
                await booksModel.addGenreToBook(bookId, genreId);
            }
        }
        // Status 201 : Créé
        res.status(201);
        res.json({id: bookId});
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la création du livre."});
    }
}

// Mise à jour d'un livre existant
const updateBook = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        // Récupération des données depuis le corps de la requête
        const {title, release_date, is_available, types_id, author_ids, editor_ids, genre_ids} = req.body;
        // Vérification que les champs obligatoires sont présents
        if (!title || !release_date || !types_id) {
            res.status(400);
            res.json({message: "Le titre, la date de sortie et le type sont requis."});
            return;
        }
        // updateBook : nombre de lignes affectées
        const updateBook = await booksModel.updateBook(id, title, release_date, is_available, types_id);
        if (updateBook === 0) {
            res.status(404);
            res.json({message: "Livre non trouvé ou pas de modification."});
            return;
        }
        // Mise à jour des relations si elles sont fournies
        if (author_ids !== undefined) {
            await booksModel.removeAllAuthorsFromBook(id);
            if (Array.isArray(author_ids) && author_ids.length > 0) {
                for (const authorId of author_ids) {
                    await booksModel.addAuthorToBook(id, authorId);
                }
            }
        }
        if (editor_ids !== undefined) {
            await booksModel.removeAllEditorsFromBook(id);
            if (Array.isArray(editor_ids) && editor_ids.length > 0) {
                for (const editorId of editor_ids) {
                    await booksModel.addEditorToBook(id, editorId);
                }
            }
        }
        if (genre_ids !== undefined) {
            await booksModel.removeAllGenresFromBook(id);
            if (Array.isArray(genre_ids) && genre_ids.length > 0) {
                for (const genreId of genre_ids) {
                    await booksModel.addGenreToBook(id, genreId);
                }
            }
        }
        res.status(200);
        res.json({message: "Livre mis à jour avec succès."});
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la mise à jour du livre."});
    }
}

// Suppression d'un livre par son ID
const deleteBook = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        // deleteBook : nombre de lignes affectées
        const deleteBook = await booksModel.deleteBook(id);
        if (deleteBook === 0) {
            res.status(404);
            res.json({message: "Livre non trouvé."});
        }else{
            res.status(200);
            res.json({message: "Livre supprimé avec succès."});
        }
    } catch (error) {
        res.status(500);
        res.json({message: "Erreur serveur lors de la suppression du livre."});
    }
}

export default {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}

