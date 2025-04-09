import express from 'express';
import { isAdmin } from '../middleware/isAdmin.js';
import { getAllUsers } from '../controllers/adminController.js';

const router = express.Router();

router.get('/users', isAdmin, getAllUsers);

export default router;