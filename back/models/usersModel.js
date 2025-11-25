import bdd from "../config/bdd.js";

const getAllUsers = async () => {
    const [rows] =  await bdd.query("SELECT id, login,password, role FROM users");
    return rows;
}

const getUserByLogin = async (login) => {
    const [rows] =  await bdd.query("SELECT id, login,password, role FROM users WHERE login = ?", [login]);   
    return rows[0];
}

const createUser = async (login, password) => {
    const [result] = await bdd.query("INSERT INTO users (login, password) VALUES (?, ?)", [login, password]);
    return result.insertId;
}

const updateUser = async (id, login, password) => {
    const [result] = await bdd.query("UPDATE users SET login = ?, password = ? WHERE id = ?", [login, password, id]);
    return result.affectedRows;
}

const deleteUser = async (id) => {
    const [result] = await bdd.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows;
}

export default {
    getAllUsers,
    getUserByLogin,
    createUser,
    updateUser,
    deleteUser
}