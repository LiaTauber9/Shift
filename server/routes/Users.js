import express from 'express';
import {register, login, logout, token} from '../controllers/Users.js';
import { insertSchedule, getSchedule, getPostedSchedule,upsertSchedule } from '../controllers/MSchedule.js'
import { getConstraints, insertConstraints, updateConstraints,upsertConstraints, mGetConstraints } from '../controllers/Constraints.js';
import { getUsers } from '../controllers/MConstraints.js';

import {VerifyToken} from '../middlewares/VerifyToken.js'

const router = express.Router();

// router.get('/users', VerifyToken, getUsers);
router.post('/register', register);
router.post('/login', login)
router.delete('/logout',logout)
router.get('/token',VerifyToken, token)
router.get('/constraints/get',getConstraints)
router.post('/constraints/m/get',mGetConstraints)
router.post('/schedule/insert',insertSchedule)
router.get('/schedule',getPostedSchedule)
router.post('/schedule/upsert',upsertSchedule)
router.post('/constraints/upsert',upsertConstraints)
// router.post('/constraints/insert',insertConstraints)
// router.post('/constraints/update',updateConstraints)
router.get('/m/getusers',getUsers)


export default router;
