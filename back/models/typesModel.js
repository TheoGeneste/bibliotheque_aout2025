import bdd from '../config/bdd.js';

// Récupère tous les types de livres
const fetchAllTypes = async () => {
    // Requête SQL pour récupérer tous les types
    const sql = "SELECT id, label from Types";
    // Exécution de la requête
    const [rows] = await bdd.query(sql);
    return rows;
}

// Récupère un type de livre par son ID
const fetchTypeById = async (id) => {
    // Requête SQL préparé pour récupérer un type par son ID
    const sql = "SELECT id, label from Types WHERE id = ?;";
    // Exécution de la requête avec l'ID en paramètre
    const [rows] = await bdd.query(sql, [id]);
    // Retourne le premier résultat (il n'y en aura qu'un seul)
    return rows[0];
}

// Création d'un nouveau type de livre
const createType = async (label) => {
    // Requête SQL préparé pour insérer un nouveau type
    const sql = "INSERT INTO Types (label) VALUES (?);";
    // Exécution de la requête avec le label en paramètre
    const [result] = await bdd.query(sql, [label]);
    // Retourne l'ID du nouveau type créé
    return result.insertId;
}

// Mise à jour d'un type de livre existant
const updateType = async (id, label) => {
    // Requête SQL préparé pour mettre à jour un type
    const sql = "UPDATE Types SET label = ? WHERE id = ?;";
    // Exécution de la requête avec le label et l'ID en paramètres
    const [result] = await bdd.query(sql, [label, id]);
    // Retourne le nombre de lignes affectées
    return result.affectedRows;
}

// Suppression d'un type de livre par son ID
const deleteType = async (id) => {
    // Requête SQL préparé pour supprimer un type par son ID
    const sql = "DELETE FROM Types WHERE id = ?;";
    // Exécution de la requête avec l'ID en paramètre
    const [result] = await bdd.query(sql, [id]);
    // Retourne le nombre de lignes affectées
    return result.affectedRows;
}



export default {
    fetchAllTypes,
    fetchTypeById,
    createType,
    updateType,
    deleteType
}