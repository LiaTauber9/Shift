import express from 'express';
import { getRestDays } from '../controllers/Timesheet.js';
import { getMonthlySchedule } from '../controllers/Schedule.js';
// import {VerifyToken} from '../middlewares/VerifyToken.js'


const router = express.Router();

// router.get('/token',VerifyToken, token);
router.get('/restDays',getRestDays);
router.get('/monthlySechedul',getMonthlySchedule);


export default router;