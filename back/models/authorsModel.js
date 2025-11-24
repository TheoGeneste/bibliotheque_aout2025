import bdd from '../config/bdd.js';

// Récupère tous les auteurs
const fetchAllAuthors = async () => {
    // Requête SQL pour récupérer tous les auteurs
    const sql = "SELECT id, lastname, firstname, born_at, die_at FROM Authors";
    // Exécution de la requête
    const [rows] = await bdd.query(sql);
    return rows;
}

// Récupère un auteur par son ID
const fetchAuthorById = async (id) => {
    // Requête SQL préparé pour récupérer un auteur par son ID
    const sql = "SELECT id, lastname, firstname, born_at, die_at FROM Authors WHERE id = ?;";
    // Exécution de la requête avec l'ID en paramètre
    const [rows] = await bdd.query(sql, [id]);
    // Retourne le premier résultat (il n'y en aura qu'un seul)
    return rows[0];
}

// Création d'un nouvel auteur
const createAuthor = async (lastname, firstname, born_at, die_at) => {
    // Requête SQL préparé pour insérer un nouvel auteur
    const sql = "INSERT INTO Authors (lastname, firstname, born_at, die_at) VALUES (?, ?, ?, ?);";
    // Exécution de la requête avec les paramètres
    const [result] = await bdd.query(sql, [lastname, firstname, born_at || null, die_at || null]);
    // Retourne l'ID du nouvel auteur créé
    return result.insertId;
}

// Mise à jour d'un auteur existant
const updateAuthor = async (id, lastname, firstname, born_at, die_at) => {
    // Requête SQL préparé pour mettre à jour un auteur
    const sql = "UPDATE Authors SET lastname = ?, firstname = ?, born_at = ?, die_at = ? WHERE id = ?;";
    // Exécution de la requête avec les paramètres
    const [result] = await bdd.query(sql, [lastname, firstname, born_at || null, die_at || null, id]);
    // Retourne le nombre de lignes affectées
    return result.affectedRows;
}

// Suppression d'un auteur par son ID
const deleteAuthor = async (id) => {
    // Requête SQL préparé pour supprimer un auteur par son ID
    const sql = "DELETE FROM Authors WHERE id = ?;";
    // Exécution de la requête avec l'ID en paramètre
    const [result] = await bdd.query(sql, [id]);
    // Retourne le nombre de lignes affectées
    return result.affectedRows;
}

export default {
    fetchAllAuthors,
    fetchAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
}

