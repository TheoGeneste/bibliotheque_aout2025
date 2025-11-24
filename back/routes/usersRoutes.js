import express from 'express';
import usersController from '../controllers/usersController.js';

const router = express.Router();

router.get('/', usersController.getAllUsers);
router.get('/:login', usersController.getUserByLogin);
router.post('/register', usersController.createUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);
router.post('/login', usersController.login);

export default router;