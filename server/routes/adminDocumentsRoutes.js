import express from "express";
import { clerkMiddleware } from "@clerk/express";
import { isAdmin } from "../middleware/isAdmin.js";
import { getAllUserDocuments, updateDocumentStatus, updateDokumentacijaKompletna } from "../controllers/adminDocumentsController.js";

const router = express.Router();
router.use(clerkMiddleware());

router.get("/documents", isAdmin, getAllUserDocuments);
router.patch("/documents/:docId", isAdmin, updateDocumentStatus);
router.patch("/documents/complete/:userId", isAdmin, updateDokumentacijaKompletna);

export default router;
