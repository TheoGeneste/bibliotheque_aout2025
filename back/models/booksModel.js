import bdd from '../config/bdd.js';

// Récupère tous les livres
const fetchAllBooks = async () => {
    // Requête SQL pour récupérer tous les livres avec le type
    const sql = `SELECT b.id, b.title, b.release_date, b.is_available, b.types_id, t.label as type_label 
                 FROM Books b 
                 LEFT JOIN Types t ON b.types_id = t.id`;
    // Exécution de la requête
    const [rows] = await bdd.query(sql);
    return rows;
}

// Récupère un livre par son ID
const fetchBookById = async (id) => {
    // Requête SQL préparé pour récupérer un livre par son ID avec le type
    const sql = `SELECT b.id, b.title, b.release_date, b.is_available, b.types_id, t.label as type_label 
                 FROM Books b 
                 LEFT JOIN Types t ON b.types_id = t.id 
                 WHERE b.id = ?;`;
    // Exécution de la requête avec l'ID en paramètre
    const [rows] = await bdd.query(sql, [id]);
    // Retourne le premier résultat (il n'y en aura qu'un seul)
    return rows[0];
}

// Récupère les auteurs d'un livre
const fetchBookAuthors = async (bookId) => {
    const sql = `SELECT a.id, a.lastname, a.firstname, a.born_at, a.die_at 
                 FROM Authors a 
                 INNER JOIN authors_books ab ON a.id = ab.author_id 
                 WHERE ab.book_id = ?`;
    const [rows] = await bdd.query(sql, [bookId]);
    return rows;
}

// Récupère les éditeurs d'un livre
const fetchBookEditors = async (bookId) => {
    const sql = `SELECT e.id, e.label 
                 FROM Editors e 
                 INNER JOIN editors_books eb ON e.id = eb.editor_id 
                 WHERE eb.book_id = ?`;
    const [rows] = await bdd.query(sql, [bookId]);
    return rows;
}

// Récupère les genres d'un livre
const fetchBookGenres = async (bookId) => {
    const sql = `SELECT g.id, g.label 
                 FROM Genres g 
                 INNER JOIN genres_books gb ON g.id = gb.genre_id 
                 WHERE gb.book_id = ?`;
    const [rows] = await bdd.query(sql, [bookId]);
    return rows;
}

// Création d'un nouveau livre
const createBook = async (title, release_date, is_available, types_id) => {
    // Requête SQL préparé pour insérer un nouveau livre
    const sql = "INSERT INTO Books (title, release_date, is_available, types_id) VALUES (?, ?, ?, ?);";
    // Exécution de la requête avec les paramètres
    const [result] = await bdd.query(sql, [title, release_date, is_available !== undefined ? is_available : true, types_id]);
    // Retourne l'ID du nouveau livre créé
    return result.insertId;
}

// Ajouter un auteur à un livre
const addAuthorToBook = async (bookId, authorId) => {
    const sql = "INSERT INTO authors_books (book_id, author_id) VALUES (?, ?);";
    const [result] = await bdd.query(sql, [bookId, authorId]);
    return result.affectedRows;
}

// Ajouter un éditeur à un livre
const addEditorToBook = async (bookId, editorId) => {
    const sql = "INSERT INTO editors_books (book_id, editor_id) VALUES (?, ?);";
    const [result] = await bdd.query(sql, [bookId, editorId]);
    return result.affectedRows;
}

// Ajouter un genre à un livre
const addGenreToBook = async (bookId, genreId) => {
    const sql = "INSERT INTO genres_books (book_id, genre_id) VALUES (?, ?);";
    const [result] = await bdd.query(sql, [bookId, genreId]);
    return result.affectedRows;
}

// Supprimer tous les auteurs d'un livre
const removeAllAuthorsFromBook = async (bookId) => {
    const sql = "DELETE FROM authors_books WHERE book_id = ?;";
    const [result] = await bdd.query(sql, [bookId]);
    return result.affectedRows;
}

// Supprimer tous les éditeurs d'un livre
const removeAllEditorsFromBook = async (bookId) => {
    const sql = "DELETE FROM editors_books WHERE book_id = ?;";
    const [result] = await bdd.query(sql, [bookId]);
    return result.affectedRows;
}

// Supprimer tous les genres d'un livre
const removeAllGenresFromBook = async (bookId) => {
    const sql = "DELETE FROM genres_books WHERE book_id = ?;";
    const [result] = await bdd.query(sql, [bookId]);
    return result.affectedRows;
}

// Mise à jour d'un livre existant
const updateBook = async (id, title, release_date, is_available, types_id) => {
    // Requête SQL préparé pour mettre à jour un livre
    const sql = "UPDATE Books SET title = ?, release_date = ?, is_available = ?, types_id = ? WHERE id = ?;";
    // Exécution de la requête avec les paramètres
    const [result] = await bdd.query(sql, [title, release_date, is_available, types_id, id]);
    // Retourne le nombre de lignes affectées
    return result.affectedRows;
}

// Suppression d'un livre par son ID
const deleteBook = async (id) => {
    // Requête SQL préparé pour supprimer un livre par son ID
    const sql = "DELETE FROM Books WHERE id = ?;";
    // Exécution de la requête avec l'ID en paramètre
    const [result] = await bdd.query(sql, [id]);
    // Retourne le nombre de lignes affectées
    return result.affectedRows;
}

export default {
    fetchAllBooks,
    fetchBookById,
    fetchBookAuthors,
    fetchBookEditors,
    fetchBookGenres,
    createBook,
    addAuthorToBook,
    addEditorToBook,
    addGenreToBook,
    removeAllAuthorsFromBook,
    removeAllEditorsFromBook,
    removeAllGenresFromBook,
    updateBook,
    deleteBook
}

