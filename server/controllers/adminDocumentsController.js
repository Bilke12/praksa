import Document from "../models/Document.js";
import User from "../models/User.js";
import Job from "../models/Job.js";
import JobApplication from "../models/jobApplication.js";

export const getAllUserDocuments = async (req, res) => {
  try {
    // Dohvati sve korisnike
    const users = await User.find().select("name email image");

    const documents = await Document.find().populate("jobId", "studij");

    // Grupiraj dokumente po userId
    const grouped = {};
    documents.forEach((doc) => {
      if (!grouped[doc.userId]) grouped[doc.userId] = [];
      grouped[doc.userId].push(doc);
    });

    // Pronađi zadnju odabranu praksu za svakog korisnika 
    const userApplications = await JobApplication.find({ selected: true }).populate("jobId", "studij");

    const applicationMap = {};
    userApplications.forEach((app) => {
      applicationMap[app.userId] = {
        studij: app.jobId?.studij || "",
        predaniDokumenti: app.predaniDokumenti || false,
      };
    });

    // Kombiniraj korisnike s njihovim dokumentima i studijem
    const combined = users.map((user) => ({
      ...user._doc,
      studij: applicationMap[user._id]?.studij || "", 
      predaniDokumenti: applicationMap[user._id]?.predaniDokumenti || false,
      documents: grouped[user._id] || [],
    }));

    res.json({ success: true, users: combined });
  } catch (err) {
    console.error("Greška u getAllUserDocuments:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateDocumentStatus = async (req, res) => {
  try {
    const { docId } = req.params;
    const { status, comment } = req.body;

    const doc = await Document.findById(docId);
    if (!doc) return res.status(404).json({ success: false, message: "Dokument nije pronađen." });

    if (status) doc.status = status;
    if (comment !== undefined) doc.comment = comment;

    await doc.save();
    res.json({ success: true, message: "Status ažuriran.", document: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateDocumentsStatus = async (req, res) => {
  try {
    const { userId, status } = req.body;

    const selectedApp = await JobApplication.findOne({ userId, selected: true });
    if (!selectedApp) {
      return res.status(404).json({ success: false, message: "Nema odabrane prakse za korisnika." });
    }

    selectedApp.predaniDokumenti = status;
    await selectedApp.save();

    res.json({ success: true, message: "Status dokumentacije ažuriran." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateDokumentacijaKompletna = async (req, res) => {
  try {
    const { userId } = req.params;
    const { value } = req.body;

    const application = await JobApplication.findOne({ userId, selected: true });
    if (!application) {
      return res.status(404).json({ success: false, message: "Praksa nije pronađena." });
    }

    application.dokumentacijaKompletna = value;
    await application.save();

    res.json({ success: true, message: "Status spremljen." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
