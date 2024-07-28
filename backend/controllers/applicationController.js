import { Job } from "../models/jobModals.js";
import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js"
import {Application} from "../models/applicationModals.js"

export const employerGetAllApplications= catchAsyncError(async (req,res,next)=>{

const {role}=req.user;

if(role === "Job Seeker"){
    return next(new ErrorHandler("Job Seeker is not allowed to access this resources",400))
}

const {_id}=req.user;
const applications=await Application.find({"employerID.user":_id})
res.status(200).json({
    success:true,
    applications
})


})











//get all application which is related to that user filled


export const jobseekerGetAllApplications = catchAsyncError(
    async (req, res, next) => {
      const { role } = req.user;
      if (role === "Employer") {
        return next(
          new ErrorHandler("Employer not allowed to access this resource.", 400)
        );
      }
      const { _id } = req.user;
      const applications = await Application.find({ "applicantID.user": _id });
      console.log(applications)
      res.status(200).json({
        success: true,
        applications,
      });
    }
  );




  export const jobseekerDeleteApplication = catchAsyncError(
    async (req, res, next) => {
      const { role } = req.user;
      if (role === "Employer") {
        return next(
          new ErrorHandler("Employer not allowed to access this resource.", 400)
        );
      }
      const { id } = req.params;
      const application = await Application.findById(id);
      if (!application) {
        return next(new ErrorHandler("Application not found!", 404));
      }
      await application.deleteOne();
      res.status(200).json({
        success: true,
        message: "Application Deleted!",
      });
    }
  );





//post 
export const postApplication=catchAsyncError(async (req,res,next)=>{

    const { role } = req.user;
      if (role === "Employer") {
        return next(
          new ErrorHandler("Employer not allowed to access this resource.", 400)
        );
      }


const { name, email, coverLetter, phone, address, jobId } = req.body;

const applicantID = {
    user: req.user._id,
    role: "Job Seeker",
  };

  if (!jobId) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  console.log(jobId)
  const jobDetails = await Job.findById(jobId);
  console.log(jobDetails)
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  const employerID = {
    user: jobDetails.postedBy,
    role: "Employer",
  };
  if (
    !name ||
    !email ||
    !coverLetter ||
    !phone ||
    !address ||
    !applicantID ||
    !employerID
  ) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }
  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantID,
    employerID,
    
    image: req.file.filename, // Access uploaded file here
    //     
  });
  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });

})

export const employerReviewApplication=catchAsyncError(async (req,res,next)=>{
 console.log("chala");
  
const {role}=req.user;
if(role == "Job Seeker"){
  return next(new ErrorHandler("Job Seeker not allowed to access this resources",400))
}


let {applicationId,status} = req.body
console.log(applicationId,status);
if(!applicationId || !status){
  return next(new ErrorHandler("Please fill all fields",400)) 
}

// const application = await Application.findById(id);
const application =await Application.findById(applicationId)
if(!application){
  return next(new ErrorHandler("No Job Found"))
}
console.log(application);
let applications=await Application.findOneAndUpdate({_id:application._id},{applicationStatus:status},{new:true})
console.log(applications);
res.status(200).json({
  success: true,
  message: "Applications Updated!",
  application:applications
});


})

