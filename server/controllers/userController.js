import Job from "../models/Job.js"
import JobApplication from "../models/jobApplication.js"
import User from "../models/User.js"


//Get user data
export const getUserData= async(req, res)=>{

    const userId= req.auth.userId

    try {
        
        const user= await User.findById(userId)

        if (!user) {
            return res.json({success:false, message:'Korisnik nije pronadjen'})
        }

        res.json({success:true, user})

    } catch (error) {
        res.json({success:false, message:error.message})
    }

}

//Prijava za praksu
export const applyForJob= async (req,res) => {

    const {jobId, prioritet} = req.body

    const userId = req.auth.userId

    try {
        
        const isAlreadyApplied = await JobApplication.find({jobId, userId})

        if(isAlreadyApplied.length > 0) {
            return res.json({success:false, message:'Praksa je vec prijavljena'})
        }

        const jobData = await Job.findById(jobId)

        if (!jobData) {
            return res.json({success:false, message:'Praksa nije nadjena'})
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            prioritet,
            date: Date.now()
        })

        res.json({success: true, message:'Uspjesno prijavljeno!'})

    } catch (error) {
        res.json({success:false, message:error.message})
    }

}

// Get student prijave
export const getUserJobApplications = async (req,res) => {

    try {

        const userId = req.auth.userId

        const applications= await JobApplication.find({userId})
        .populate('companyId','name email image')
        .populate('jobId', 'title projectTitle description location')
        .exec()

        if (!applications) {
            return res.json({success: false, message:'Nije pronadjena nijedna prijava za ovog korisnika'})
        }

        return res.json({success:true, applications})
        
    } catch (error) {
        res.json({success:false, message:error.message})
    }

}

//Odabir izbora prakse

export const selectInternship = async (req, res) => {
    const { applicationId } = req.body;
    const userId = req.auth?.userId;
  
    console.log("🟡 selectInternship triggered");
    console.log("applicationId:", applicationId);
    console.log("userId:", userId);
  
    try {
      const selectedApp = await JobApplication.findOne({ _id: applicationId, userId });
  
      if (!selectedApp || selectedApp.status !== 'Prihvaceno') {
        return res.json({ success: false, message: 'Nevažeća prijava za odabir.' });
      }
  
      await JobApplication.updateMany(
        { userId, _id: { $ne: applicationId } },
        { $set: { selected: false } }
      );
  
      selectedApp.selected = true;
      await selectedApp.save();
  
      console.log("✅ Praksa uspješno označena kao odabrana");
      res.json({ success: true, message: 'Praksa je uspješno prihvaćena!' });
    } catch (error) {
      console.log(" GRESKA:", error.message);
      res.json({ success: false, message: error.message });
    }
  };
  

//Update korisnikovu dokumentaciju ? 
