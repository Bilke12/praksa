import express from 'express'
import { applyForJob, getUserData, getUserJobApplications } from '../controllers/userController.js'

const router = express.Router()

// Get user Data
router.get('/user', getUserData)

//Prijava prakse
router.post('/apply', applyForJob)

//Get applied praksa data
router.get('/applications', getUserJobApplications)

//Dokumentacija nadam se 

export default router