import Job from '../models/Job.js';

// Dohvati sve neodobrene prakse
export const getPendingJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ visible: false }).populate('companyId', 'name email');
    res.json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Odobri praksu
export const approveJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) return res.status(404).json({ success: false, message: 'Praksa nije pronađena.' });

    job.visible = true;
    await job.save();

    res.json({ success: true, message: 'Praksa je odobrena.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Odbij praksu (ili obriši)
export const rejectJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    await Job.findByIdAndDelete(jobId);

    res.json({ success: true, message: 'Praksa je odbijena i obrisana.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT - Ažuriraj praksu po ID-u
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, projectTitle, location, positions } = req.body;

    const updated = await Job.findByIdAndUpdate(
      id,
      { title, projectTitle, location, positions },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Praksa nije pronađena.' });
    }

    res.json({ success: true, message: 'Praksa ažurirana.', job: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE - Obriši praksu po ID-u
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Job.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Praksa nije pronađena.' });
    }

    res.json({ success: true, message: 'Praksa obrisana.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
