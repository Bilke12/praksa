import express from 'express';
import { clerkMiddleware } from '@clerk/express';
import { isAdmin } from '../middleware/isAdmin.js';
import { getSelectedApplicationsWithUsers } from "../controllers/adminApplicationController.js";
import {
  updateApplicationStatus,
  updateApplicationStatusFlags,
  updateAdminComment,
  updateDokumentacijaStatus,
  updateSporazumPredan
} from '../controllers/adminApplicationController.js';

const router = express.Router();

router.use(clerkMiddleware());

// PUT - za status prijave (opcionalno koristiš negdje)
router.put('/applications/:id/status', isAdmin, updateApplicationStatus);

// POST - za checkbox statuse (predaniDokumenti, praksaUspjesnoObavljena)
router.post('/applications/:applicationId/flags', isAdmin, updateApplicationStatusFlags);

router.get('/applications/selected', isAdmin, getSelectedApplicationsWithUsers)

router.post("/applications/:applicationId/comment", isAdmin, updateAdminComment)

router.patch("/applications/:appId/dokumentacija", isAdmin, updateDokumentacijaStatus); 

router.patch("/applications/:userId/sporazum", isAdmin, updateSporazumPredan);



export default router;