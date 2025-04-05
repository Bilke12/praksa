import express from 'express'
import { ChangeJobApplicationsStatus, changeVisibility, getCompanyApplicants, getCompanyData, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middleware/authMiddleware.js'

const router = express.Router()

// Registracija kompanije
router.post('/register',upload.single('image'), registerCompany)

// Login poduzeca
router.post('/login',loginCompany)

//Get data poduzeca
router.get('/company', protectCompany, getCompanyData)

// Objavi praksu
router.post('/post-job', protectCompany, upload.single('file'), postJob);

// Get aplikante
router.get('/applicants', protectCompany,getCompanyApplicants)

// Get lista praksa poduzeca
router.get('/list-jobs', protectCompany,getCompanyPostedJobs) 

//Promjena statusa aplikacije
router.post('/change-status', protectCompany,ChangeJobApplicationsStatus)

//Promjena vidljivosti aplikacije
router.post('/change-visibility', protectCompany,changeVisibility)

export default router