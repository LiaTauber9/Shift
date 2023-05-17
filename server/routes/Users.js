import express from 'express';
import {register, login, logout, token, getUsers, updateProfile } from '../controllers/Users.js';
import {VerifyToken} from '../middlewares/VerifyToken.js'


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/logout',logout);
router.get('/token',VerifyToken, token);
router.get('/m/getusers',getUsers);
router.post('/profile/update',updateProfile);


export default router;



