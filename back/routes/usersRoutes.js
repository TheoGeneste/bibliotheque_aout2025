import express from 'express';
import usersController from '../controllers/usersController.js';
import checkToken from '../middlewares/checkToken.js';
import checkAdmin from '../middlewares/checkAdmin.js';

const router = express.Router();

router.get('/', checkAdmin, usersController.getAllUsers);
router.post('/register', usersController.createUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);
router.post('/login', usersController.login);
// A mettre avant la route /:login pour pas que mon code confonde les deux routes 
router.get('/me', checkToken, usersController.getMe);
router.get('/:login', usersController.getUserByLogin);


export default router;