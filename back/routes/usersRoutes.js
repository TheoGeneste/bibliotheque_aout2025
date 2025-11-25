import express from 'express';
import usersController from '../controllers/usersController.js';
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.get('/', usersController.getAllUsers);
router.post('/register', usersController.createUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);
router.post('/login', usersController.login);
router.get('/me', checkToken, usersController.getMe);
router.get('/:login', usersController.getUserByLogin);


export default router;