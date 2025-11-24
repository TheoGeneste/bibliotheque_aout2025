import bdd from '../config/bdd.js';

// Récupère tous les éditeurs
const fetchAllEditors = async () => {
    // Requête SQL pour récupérer tous les éditeurs
    const sql = "SELECT id, label FROM Editors";
    // Exécution de la requête
    const [rows] = await bdd.query(sql);
    return rows;
}

// Récupère un éditeur par son ID
const fetchEditorById = async (id) => {
    // Requête SQL préparé pour récupérer un éditeur par son ID
    const sql = "SELECT id, label FROM Editors WHERE id = ?;";
    // Exécution de la requête avec l'ID en paramètre
    const [rows] = await bdd.query(sql, [id]);
    // Retourne le premier résultat (il n'y en aura qu'un seul)
    return rows[0];
}

// Création d'un nouvel éditeur
const createEditor = async (label) => {
    // Requête SQL préparé pour insérer un nouvel éditeur
    const sql = "INSERT INTO Editors (label) VALUES (?);";
    // Exécution de la requête avec le label en paramètre
    const [result] = await bdd.query(sql, [label]);
    // Retourne l'ID du nouvel éditeur créé
    return result.insertId;
}

// Mise à jour d'un éditeur existant
const updateEditor = async (id, label) => {
    // Requête SQL préparé pour mettre à jour un éditeur
    const sql = "UPDATE Editors SET label = ? WHERE id = ?;";
    // Exécution de la requête avec le label et l'ID en paramètres
    const [result] = await bdd.query(sql, [label, id]);
    // Retourne le nombre de lignes affectées
    return result.affectedRows;
}

// Suppression d'un éditeur par son ID
const deleteEditor = async (id) => {
    // Requête SQL préparé pour supprimer un éditeur par son ID
    const sql = "DELETE FROM Editors WHERE id = ?;";
    // Exécution de la requête avec l'ID en paramètre
    const [result] = await bdd.query(sql, [id]);
    // Retourne le nombre de lignes affectées
    return result.affectedRows;
}

export default {
    fetchAllEditors,
    fetchEditorById,
    createEditor,
    updateEditor,
    deleteEditor
}

