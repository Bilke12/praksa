import express from 'express'
import { applyForJob, getUserData, getUserJobApplications, selectInternship } from '../controllers/userController.js'

const router = express.Router()

// Get user Data
router.get('/user', getUserData)

//Prijava prakse
router.post('/apply', applyForJob)

//Get applied praksa data
router.get('/applications', getUserJobApplications)

//Ruta za odabir prakse

router.post('/select-internship', selectInternship)


//Dokumentacija nadam se 


export default router