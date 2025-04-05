import express from 'express'
import { getJobById, getJobs } from '../controllers/jobController.js';

const router = express.Router()

//Route za info o svim poslovimma 
router.get('/', getJobs)

//Route za jednu praksu po ID-u
router.get('/:id', getJobById)

export default router;