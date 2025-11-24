import bdd from '../config/bdd.js';

// Récupère tous les emprunts
const fetchAllLoans = async () => {
    // Requête SQL pour récupérer tous les emprunts avec les informations de l'emprunteur et du livre
    const sql = `SELECT l.id, l.loaner_id, l.book_id, l.start_date, l.end_date, 
                 lo.lastname as loaner_lastname, lo.firstname as loaner_firstname, lo.email as loaner_email,
                 b.title as book_title, b.is_available as book_is_available
                 FROM Loans l 
                 LEFT JOIN Loaners lo ON l.loaner_id = lo.id 
                 LEFT JOIN Books b ON l.book_id = b.id`;
    // Exécution de la requête
    const [rows] = await bdd.query(sql);
    return rows;
}

// Récupère un emprunt par son ID
const fetchLoanById = async (id) => {
    // Requête SQL préparé pour récupérer un emprunt par son ID avec les informations de l'emprunteur et du livre
    const sql = `SELECT l.id, l.loaner_id, l.book_id, l.start_date, l.end_date, 
                 lo.lastname as loaner_lastname, lo.firstname as loaner_firstname, lo.email as loaner_email,
                 b.title as book_title, b.is_available as book_is_available
                 FROM Loans l 
                 LEFT JOIN Loaners lo ON l.loaner_id = lo.id 
                 LEFT JOIN Books b ON l.book_id = b.id 
                 WHERE l.id = ?;`;
    // Exécution de la requête avec l'ID en paramètre
    const [rows] = await bdd.query(sql, [id]);
    // Retourne le premier résultat (il n'y en aura qu'un seul)
    return rows[0];
}

// Récupère tous les emprunts d'un emprunteur
const fetchLoansByLoanerId = async (loanerId) => {
    const sql = `SELECT l.id, l.loaner_id, l.book_id, l.start_date, l.end_date, 
                 b.title as book_title, b.is_available as book_is_available
                 FROM Loans l 
                 LEFT JOIN Books b ON l.book_id = b.id 
                 WHERE l.loaner_id = ?`;
    const [rows] = await bdd.query(sql, [loanerId]);
    return rows;
}

// Récupère tous les emprunts d'un livre
const fetchLoansByBookId = async (bookId) => {
    const sql = `SELECT l.id, l.loaner_id, l.book_id, l.start_date, l.end_date, 
                 lo.lastname as loaner_lastname, lo.firstname as loaner_firstname, lo.email as loaner_email
                 FROM Loans l 
                 LEFT JOIN Loaners lo ON l.loaner_id = lo.id 
                 WHERE l.book_id = ?`;
    const [rows] = await bdd.query(sql, [bookId]);
    return rows;
}

// Création d'un nouvel emprunt
const createLoan = async (loaner_id, book_id, start_date, end_date) => {
    // Requête SQL préparé pour insérer un nouvel emprunt
    const sql = "INSERT INTO Loans (loaner_id, book_id, start_date, end_date) VALUES (?, ?, ?, ?);";
    // Exécution de la requête avec les paramètres
    const [result] = await bdd.query(sql, [loaner_id, book_id, start_date || null, end_date || null]);
    // Retourne l'ID du nouvel emprunt créé
    return result.insertId;
}

// Mise à jour d'un emprunt existant
const updateLoan = async (id, loaner_id, book_id, start_date, end_date) => {
    // Requête SQL préparé pour mettre à jour un emprunt
    const sql = "UPDATE Loans SET loaner_id = ?, book_id = ?, start_date = ?, end_date = ? WHERE id = ?;";
    // Exécution de la requête avec les paramètres
    const [result] = await bdd.query(sql, [loaner_id, book_id, start_date, end_date || null, id]);
    // Retourne le nombre de lignes affectées
    return result.affectedRows;
}

// Mise à jour de la date de fin d'un emprunt (retour du livre)
const returnLoan = async (id, end_date) => {
    // Requête SQL préparé pour mettre à jour uniquement la date de fin
    const sql = "UPDATE Loans SET end_date = ? WHERE id = ?;";
    // Exécution de la requête avec les paramètres
    const [result] = await bdd.query(sql, [end_date, id]);
    // Retourne le nombre de lignes affectées
    return result.affectedRows;
}

// Suppression d'un emprunt par son ID
const deleteLoan = async (id) => {
    // Requête SQL préparé pour supprimer un emprunt par son ID
    const sql = "DELETE FROM Loans WHERE id = ?;";
    // Exécution de la requête avec l'ID en paramètre
    const [result] = await bdd.query(sql, [id]);
    // Retourne le nombre de lignes affectées
    return result.affectedRows;
}

export default {
    fetchAllLoans,
    fetchLoanById,
    fetchLoansByLoanerId,
    fetchLoansByBookId,
    createLoan,
    updateLoan,
    returnLoan,
    deleteLoan
}

