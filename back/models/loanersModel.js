import bdd from '../config/bdd.js';

// Récupère tous les emprunteurs
const fetchAllLoaners = async () => {
    // Requête SQL pour récupérer tous les emprunteurs avec l'utilisateur associé
    const sql = `SELECT l.id, l.lastname, l.firstname, l.email, l.street_number, l.street_name, 
                 l.city, l.postal_code, l.additional_adress, l.user_id, u.login as user_login 
                 FROM Loaners l 
                 LEFT JOIN Users u ON l.user_id = u.id`;
    // Exécution de la requête
    const [rows] = await bdd.query(sql);
    return rows;
}

// Récupère un emprunteur par son ID
const fetchLoanerById = async (id) => {
    // Requête SQL préparé pour récupérer un emprunteur par son ID avec l'utilisateur associé
    const sql = `SELECT l.id, l.lastname, l.firstname, l.email, l.street_number, l.street_name, 
                 l.city, l.postal_code, l.additional_adress, l.user_id, u.login as user_login 
                 FROM Loaners l 
                 LEFT JOIN Users u ON l.user_id = u.id 
                 WHERE l.id = ?;`;
    // Exécution de la requête avec l'ID en paramètre
    const [rows] = await bdd.query(sql, [id]);
    // Retourne le premier résultat (il n'y en aura qu'un seul)
    return rows[0];
}

// Création d'un nouvel emprunteur
const createLoaner = async (lastname, firstname, email, street_number, street_name, city, postal_code, additional_adress, user_id) => {
    // Requête SQL préparé pour insérer un nouvel emprunteur
    const sql = "INSERT INTO Loaners (lastname, firstname, email, street_number, street_name, city, postal_code, additional_adress, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
    // Exécution de la requête avec les paramètres
    const [result] = await bdd.query(sql, [lastname, firstname, email, street_number || null, street_name || null, city || null, postal_code || null, additional_adress || null, user_id || null]);
    // Retourne l'ID du nouvel emprunteur créé
    return result.insertId;
}

// Mise à jour d'un emprunteur existant
const updateLoaner = async (id, lastname, firstname, email, street_number, street_name, city, postal_code, additional_adress, user_id) => {
    // Requête SQL préparé pour mettre à jour un emprunteur
    const sql = "UPDATE Loaners SET lastname = ?, firstname = ?, email = ?, street_number = ?, street_name = ?, city = ?, postal_code = ?, additional_adress = ?, user_id = ? WHERE id = ?;";
    // Exécution de la requête avec les paramètres
    const [result] = await bdd.query(sql, [lastname, firstname, email, street_number || null, street_name || null, city || null, postal_code || null, additional_adress || null, user_id || null, id]);
    // Retourne le nombre de lignes affectées
    return result.affectedRows;
}

// Suppression d'un emprunteur par son ID
const deleteLoaner = async (id) => {
    // Requête SQL préparé pour supprimer un emprunteur par son ID
    const sql = "DELETE FROM Loaners WHERE id = ?;";
    // Exécution de la requête avec l'ID en paramètre
    const [result] = await bdd.query(sql, [id]);
    // Retourne le nombre de lignes affectées
    return result.affectedRows;
}

export default {
    fetchAllLoaners,
    fetchLoanerById,
    createLoaner,
    updateLoaner,
    deleteLoaner
}

