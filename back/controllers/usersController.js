import usersModel from "../models/usersModel.js";
import loanersModel from "../models/loanersModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const getAllUsers = async (req,res) => {
    try {
        const users = await usersModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: "Erreur lors de la récupération des utilisateurs."});
    }
}

const getUserByLogin = async (req, res ) => {
    try {
        const login = req.params.login;
        const user = await usersModel.getUserByLogin(login);
        if (user){
            res.status(200).json(user);
        }else{
            res.status(404).json({message: "Utilisateur non trouvé."});
        }
    } catch (error) {
        res.status(500).json({message: "Erreur lors de la récupération de l'utilisateur."});
    }
}

const createUser = async (req, res) => {
    try {
        const {login, password, firstname, lastname, email, street_number, street_name, 
            city, postal_code, additional_adress} = req.body;
        if (!login || ! password){
            return res.status(400).json({message: "Login et mot de passe sont requis."})
        }
        const existingUser = await usersModel.getUserByLogin(login);
        if(existingUser){
            return res.status(409).json({message: "Le login existe déjà"})
        }
        const passwordHashed = bcrypt.hashSync(password, 10);
        const userId = await usersModel.createUser(login, passwordHashed);
        if (userId) {
            const loaner = await loanersModel.createLoaner(lastname, firstname,email,street_number,street_name,city
                ,postal_code,additional_adress,userId)
            res.status(201).json({id : userId});
        }else{
            res.status(500).json({message: "Erreur lors de la création de l'utilisateur."});
        }
    } catch (error) {
        res.status(500).json({message: "Erreur lors de la création de l'utilisateur."});
    }
}

const updateUser = async (req,res) => {
    try {
        const id = req.params.id;
        const {login,password} = req.body;
        const passwordHashed = bcrypt.hashSync(password, 10);
        const affectedRows = await usersModel.updateUser(id, login, passwordHashed);
        if (affectedRows === 0){
            res.status(404).json({message: "Utilisateur non trouvé ou pas de modification."});
        }else{
            res.status(200).json({message: "Utilisateur mis à jour avec succès."});
        }
    } catch (error) {
        res.status(500).json({message: "Erreur lors de la mise à jour de l'utilisateur."});
    }
}

const deleteUser = async (req,res) => {
    try {
        const id = req.params.id;
        const affectedRows = await usersModel.deleteUser(id);
        if (affectedRows === 0) {
            res.status(404).json({message: "Utilisateur non trouvé."});
        }else{
            res.status(200).json({message: "Utilisateur supprimé avec succès."})
        }
    } catch (error) {
        res.status(500).json({message: "Erreur lors de la suppression de l'utilisateur."});
    }
}

const login = async (req,res) => {
    try {
        const {login, password} = req.body;
        // !login => login est undefined, null, ou une chaîne vide
        if (!login || !password) {
            return res.status(400).json({message: "Login et mot de passe sont requis."})
        }
        const user = await usersModel.getUserByLogin(login);
        if (!user) {
            return res.status(401).json({message: "Login ou mot de passe incorrect."});
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (isPasswordValid){
            const token = jwt.sign({
                    id: user.id,
                    login: user.login,
                },process.env.JWT_SECRET,
                {expiresIn: '1h'}
            );
            res.status(200).json({token});
        }else{
            res.status(401).json({message: "Login ou mot de passe incorrect."});
        }

    } catch (error) {
        res.status(500).json({message: "Erreur lors de la connexion de l'utilisateur."});
    }
}

const getMe = async (req , res) => {
    try {
        const user = await usersModel.getUserByLogin(req.userLogin)
        const loaner = await loanersModel.getLoanerByUser(req.userId)
        res.json({user,loaner})
    } catch (error) {
        res.status(500).json({message :'Erreur lors de la récupération de moi même'})
    }
}

export default {
    getAllUsers,
    getUserByLogin,
    createUser,
    updateUser,
    deleteUser,
    login,
    getMe
}