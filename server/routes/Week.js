import express from 'express';
import { getSchedule,upsertSchedule } from '../controllers/Schedule.js'
import { getConstraints, upsertConstraints, mGetConstraints } from '../controllers/Constraints.js';

const router = express.Router();

router.get('/constraints/get',getConstraints)
router.post('/constraints/upsert',upsertConstraints)
router.post('/constraints/m/get',mGetConstraints)
router.get('/schedule',getSchedule)
router.post('/schedule/upsert',upsertSchedule)


export default router;