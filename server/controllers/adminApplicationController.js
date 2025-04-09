import JobApplication from '../models/jobApplication.js';

// Funkcija za checkboxove (predaniDokumenti, praksaUspjesnoObavljena)
export const updateApplicationStatusFlags = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { predaniDokumenti, praksaUspjesnoObavljena } = req.body;

    const updateFields = {};
    if (typeof predaniDokumenti !== 'undefined') {
      updateFields.predaniDokumenti = predaniDokumenti;
    }
    if (typeof praksaUspjesnoObavljena !== 'undefined') {
      updateFields.praksaUspjesnoObavljena = praksaUspjesnoObavljena;
    }

    const application = await JobApplication.findByIdAndUpdate(
      applicationId,
      { $set: updateFields },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: 'Prijava nije pronađena.' });
    }

    res.json({ success: true, message: 'Statusi su uspješno ažurirani.', application });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// funkcija za opći update statusa
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await JobApplication.findById(id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Prijava nije pronađena.' });
    }

    if (status) application.status = status;
    await application.save();

    res.json({ success: true, message: 'Status prijave ažuriran.', application });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getSelectedApplicationsWithUsers = async (req, res) => {
  try {
    const applications = await JobApplication.find({ selected: true })
      .populate("userId", "name email image")
      .populate("companyId", "title ")
      .populate("jobId", "title projectTitle location studij")

    res.json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAdminComment = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { comment } = req.body;

    const updated = await JobApplication.findByIdAndUpdate(
      applicationId,
      { adminComment: comment },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Prijava nije pronađena." });
    }

    res.json({ success: true, message: "Komentar ažuriran.", application: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateDokumentacijaStatus = async (req, res) => {
  try {
    const { appId } = req.params;
    const { dokumentacijaKompletna } = req.body;

    const app = await JobApplication.findById(appId);
    if (!app) return res.status(404).json({ success: false, message: "Prijava nije pronađena." });

    app.dokumentacijaKompletna = dokumentacijaKompletna;
    await app.save();

    res.json({ success: true, message: "Status dokumentacije ažuriran." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// adminApplicationController.js
export const updateSporazumPredan = async (req, res) => {
  try {
    const { userId } = req.params;
    const { value } = req.body;

    const application = await JobApplication.findOne({ userId, selected: true });
    if (!application) return res.status(404).json({ success: false });

    application.sporazumPredan = value;
    await application.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
