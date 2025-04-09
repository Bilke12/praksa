import express from 'express';
import { isAdmin } from '../middleware/isAdmin.js';
import { getPendingJobs, approveJob, rejectJob, getAllJobs, updateJob, deleteJob } from '../controllers/adminJobController.js';

const router = express.Router();

router.get("/jobs/all", isAdmin, getAllJobs)
// Dohvati sve neodobrene prakse
router.get('/jobs', isAdmin, getPendingJobs);

// Odobri praksu
router.post('/jobs/:id/approve', isAdmin, approveJob);

// Odbij praksu
router.post('/jobs/:id/reject', isAdmin, rejectJob);


router.put("/jobs/:id", isAdmin, updateJob);
router.delete("/jobs/:id", isAdmin, deleteJob);


export default router;
