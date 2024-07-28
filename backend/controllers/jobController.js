import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js"
import { Job } from "../models/jobModals.js"
import {User} from "../models/userModals.js"

export const getAllJobs = catchAsyncError(async (req, res, next) => {
    const jobs = await Job.find({ expired: false })
    res.status(200).json({
        success: true,
        jobs
    })
})

export const postJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    console.log(role,"shubh")
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job seeker is not allowed to access this resources!", 400))
    }
    const { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo, } = req.body;


    if (!title || !description || !category || !country || !city || !location) {
        return next(new ErrorHandler("Please Provide full job details", 400))
    }


    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
        return next(new ErrorHandler("please either provide fixed salary or ranged salary!"))
    }

    if (salaryFrom && salaryTo && fixedSalary) {
        return next(new ErrorHandler("cannot enter fixed salary and ranged salary together"))
    }

    const postedBy = req.user._id;
    console.log(postedBy);
    const job = await Job.create({
        title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo, postedBy
    })

    res.status(200).json({
        success: true,
        message: "job posted successfully",
        job
    })

})




export const getMyJobs=catchAsyncError(async (req,res,next)=>{
    const {role}=req.user;
    if(role==="Job Seeker"){
        return next(new ErrorHandler("Job seeker not allowed to access this resources",400))
    }

    let myJobs=await Job.find({postedBy:req.user._id})
    res.status(200).json({
        success:true,
        myJobs
    })
})

export const updateJob=catchAsyncError(async (req,res,next)=>{
    const {role}=req.user;
    console.log(role);
    if(role=="Job Seeker"){
        return next(new ErrorHandler("job seeker not allowed to access this resources",400))
    }
    
    const {id}=req.params;
    console.log(id);
    let job= await Job.findById(id)
    console.log(job);
 if(!job){
    return next(new ErrorHandler("oops JOb not found",404))
 }

 job=await Job.findByIdAndUpdate(id,req.body,{
    new:true,
    runValidators:true,
    useFindAndModify:false
 })

 res.status(200).json({
    success: true,
    message: "Job Updated!",
  });

})

export const deleteJob=catchAsyncError(async (req,res,next)=>{

    let {role}=req.user;
    if(role == "Job Seeker"){
        return next(ErrorHandler("job seeker can not allowed to access this resources",400))

    }

    let {id}=req.params;
    let job=Job.findById(id)
    if(!job){
        return next(ErrorHandler("OOps Job not found",404))
    }
    await job.deleteOne();
    res.status(200).json({
        success:true,
        message:"job Deleted Successfully"
    })

})
 export const getSingleJob=catchAsyncError(async (req,res,next)=>{
    let {id}=req.params;
    
let job=await Job.findById(id)
console.log(job);
res.send(job)
 })






