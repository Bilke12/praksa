import Document from "../models/Document.js";
import JobApplication from "../models/jobApplication.js";

export const uploadDocument = async (req, res) => {
  try {
    const { url, type } = req.body;
    const userId = req.auth.userId;

    if (!url || !type) {
      return res.status(400).json({ success: false, message: "Nedostaje URL ili tip dokumenta." });
    }

    // Provjera postoji li odabrana praksa
    const selectedApp = await JobApplication.findOne({ userId, selected: true });
    if (!selectedApp) {
      return res.status(404).json({ success: false, message: "Odabrana praksa nije pronađena." });
    }

    // Ako već postoji dokument tog tipa, obriši ga
    const existing = await Document.findOne({ userId, type });
    if (existing) {
      await Document.deleteOne({ _id: existing._id });
    }

    // Spremi novi dokument
    const newDoc = new Document({
      userId,
      jobId: selectedApp.jobId,
      type,
      url,
    });

    await newDoc.save();

    res.json({ success: true, message: "Dokument uspješno predan.", document: newDoc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMyDocuments = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const docs = await Document.find({ userId });
    res.json({ success: true, documents: docs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateDocumentStatus = async (req, res) => {
  try {
    const { docId } = req.params;
    const { status } = req.body;

    const doc = await Document.findById(docId);
    if (!doc) return res.status(404).json({ success: false, message: "Dokument nije pronađen." });

    if (status) doc.status = status;

    await doc.save();

    // ⬇️ Ako je tip "sporazum" i status "approved", ažuriraj JobApplication
    if (doc.type === "sporazum" && status === "approved") {
      await JobApplication.findOneAndUpdate(
        { userId: doc.userId, selected: true },
        { $set: { sporazumPredan: true } }
      );
    }

    res.json({ success: true, message: "Status ažuriran.", document: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};