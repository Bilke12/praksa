import express from "express";
import { uploadDocument, getMyDocuments } from "../controllers/documentController.js";
import { clerkMiddleware } from "@clerk/express";

const router = express.Router();
router.use(clerkMiddleware());

router.post("/upload", uploadDocument);
router.get("/mine", getMyDocuments);

export default router;
