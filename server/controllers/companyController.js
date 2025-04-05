import Company from "../models/Company.js";
import bcrypt from 'bcrypt'
import { v2 as cloudinary} from 'cloudinary'
import generateToken from "../utils/generateToken.js";
import { messageInRaw } from "svix";
import Job from "../models/Job.js";
import JobApplication from "../models/jobApplication.js";

//Registracija poduzeca
export const registerCompany = async(req,res) =>{

    const {name,email,password}= req.body

    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
        return res.json({success:false, message: "Nepotpuni podatci"})
    }

    try {

        const companyExist= await Company.findOne({email})

        if (companyExist) {
            return res.json({success:false, message: "Poduzece vec postoji!"})
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        })

        res.json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        })

    } catch (error) {
        res.json({success:false, message: error.message})
    }
}

//Login poduzeca
export const loginCompany = async(req,res) => {

    const { email, password } = req.body;


    try {
        
        const company = await Company.findOne({email})

        if (await bcrypt.compare(password, company.password)) {
            
            res.json({
                success:true,
                company:{
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            })

        }
        else {
            res.json({success:false, message:'Pogresan email ili lozinka'})
        }

    } catch (error) {
        res.json({success:false,message:error.message})
    }

}
//Get data poduzece 
export const getCompanyData = async (req, res) => {
    try {
        // Provjera postoji li poduzeće u requestu
        if (!req.company) {
            return res.status(404).json({ success: false, message: "Poduzeće nije pronađeno" })
        }

        res.status(200).json({ success: true, company: req.company })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Greška na serveru: " + error.message
        })
    }
}
//Dodaj praksu
export const postJob = async (req, res) => {
    const { title, projectTitle, description, studij, location, brojstudenata, OPZFileUrl } = req.body;
    const companyId = req.company._id;

    try {
        const newJob = new Job({
            title,
            projectTitle,
            description,
            location,
            brojstudenata,
            companyId,
            OPZFileUrl, // Direktno iz req.body
            studij,
            date: Date.now(),
        });

        await newJob.save();
        res.json({ success: true, newJob });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


//Get aplikante od firme
export const getCompanyApplicants = async(req,res) =>{
    try {

        const companyId = req.company._id
        
        //Pronalazak aplikacija 
        const applications= await JobApplication.find({companyId})
        .populate('userId', 'name image')
        .populate('jobId','title projectTitle location prioritet')
        .exec()

        return res.json({success:true, applications})
        
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}
// Get objavljene prakse poduzeca
export const getCompanyPostedJobs = async(req,res) =>{

    try {

        const companyId= req.company._id

        const jobs = await Job.find({companyId})

        //dodati broj aplikanata u dati
        const jobsData=  await Promise.all(jobs.map(async(job)=>{
            const applicants = await JobApplication.find({jobId: job._id});
            return {...job.toObject(), applicants:applicants.length}
        }))

        res.json({success:true, jobsData})
        
    } catch (error) {
        res.json({success:false, message:error.message})
    }

}
//Promjena statusa aplikacije
export const ChangeJobApplicationsStatus = async(req,res) =>{

    try {

        const {id, status} = req.body

        //Pronalazak Aplikacije prakse i promjena statusa
        await JobApplication.findOneAndUpdate({_id: id},{status})
    
        res.json({success:true, message:'Status je uspjesno promjenjen'})
        
    } catch (error) {
        res.json({success:false, message: error.message})
    }


}
// promjena vidljivosti posla
export const changeVisibility = async(req,res) =>{

    try {
        
        const {id} = req.body

        const companyId= req.company._id

        const job = await Job.findById(id)

        if(companyId.toString()=== job.companyId.toString()){
            job.visible= !job.visible
        }

        await job.save()

        res.json({success:true, job})

    } catch (error) {
        res.json({success:false, message:error.message})
    }

}