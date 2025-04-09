import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    projectTitle: { type: String, required: true }, // Ispravljeno ime polja
    description: { type: String, required: true },
    location: { type: String, required: true },
    studij: { type: String, required: true },
    brojstudenata: { type: Number, required: true },
    date: { type: Number, required: false },
    visible: { type: Boolean, default: false },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    OPZFileUrl: { type: String } 
});


const Job = mongoose.model('Job', jobSchema);

export default Job;
