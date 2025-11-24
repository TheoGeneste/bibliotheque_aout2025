import bdd from '../config/bdd.js';

// Récupère tous les genres
const fetchAllGenres = async () => {
    // Requête SQL pour récupérer tous les genres
    const sql = "SELECT id, label FROM Genres";
    // Exécution de la requête
    const [rows] = await bdd.query(sql);
    return rows;
}

// Récupère un genre par son ID
const fetchGenreById = async (id) => {
    // Requête SQL préparé pour récupérer un genre par son ID
    const sql = "SELECT id, label FROM Genres WHERE id = ?;";
    // Exécution de la requête avec l'ID en paramètre
    const [rows] = await bdd.query(sql, [id]);
    // Retourne le premier résultat (il n'y en aura qu'un seul)
    return rows[0];
}

// Création d'un nouveau genre
const createGenre = async (label) => {
    // Requête SQL préparé pour insérer un nouveau genre
    const sql = "INSERT INTO Genres (label) VALUES (?);";
    // Exécution de la requête avec le label en paramètre
    const [result] = await bdd.query(sql, [label]);
    // Retourne l'ID du nouveau genre créé
    return result.insertId;
}

// Mise à jour d'un genre existant
const updateGenre = async (id, label) => {
    // Requête SQL préparé pour mettre à jour un genre
    const sql = "UPDATE Genres SET label = ? WHERE id = ?;";
    // Exécution de la requête avec le label et l'ID en paramètres
    const [result] = await bdd.query(sql, [label, id]);
    // Retourne le nombre de lignes affectées
    return result.affectedRows;
}

// Suppression d'un genre par son ID
const deleteGenre = async (id) => {
    // Requête SQL préparé pour supprimer un genre par son ID
    const sql = "DELETE FROM Genres WHERE id = ?;";
    // Exécution de la requête avec l'ID en paramètre
    const [result] = await bdd.query(sql, [id]);
    // Retourne le nombre de lignes affectées
    return result.affectedRows;
}

export default {
    fetchAllGenres,
    fetchGenreById,
    createGenre,
    updateGenre,
    deleteGenre
}

