import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ← promijenjeno
  type: {
    type: String,
    enum: ["sporazum", "opz", "izvjesce", "zavrsno", "poster", "prezentacija"],
    required: true,
  },
  url: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  comment: { type: String, default: "" },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" }
}, { timestamps: true });


const Document = mongoose.model('Document', documentSchema);
export default Document;
