import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please Provide Job Title"],
        minLength:[3,"Job Title must contain at least 3 characters"],
        maxLength:[50,"job title can not exceed 50 characters"]
    },
    description:{
        type:String,
        required:[true,"please provide job description"],
        minLength:[3,"Job description must contain at least 3 characters"],
        maxLength:[350,"job title can not exceed 350 characters"]

    },
    category:{
        type:String,
        required:[true,"job category is required"]
    },
    country:{
        type:String,
        required:[true,"job country is required"]
    },
    city:{
        type:String,
        required:[true,"Job city is required"]
    },
    location:{
        type:String,
        required:[true,"please provide exact location"],
        minLength:[5,"job location must contain at least 5 character"],
        
    },
    fixedSalary:{
        type:Number,
        minLength:[4,"fixed salary must contain at least 4 digits"],
        maxLength:[9,"fixed salary can not exeed 9 digits"]

    },
    salaryFrom:{
        type:Number,
        minLength:[4,"Salary from must contain at least 4 digits"],
        maxLength:[9,"Salary from can not exeed 9 digits"]

    },
    salaryTo:{
        type:Number,
        minLength:[4,"Salary to must contain at least 4 digits"],
        maxLength:[9,"Salary to can not exeed 9 digits"]

    },
    expired:{
        type:Boolean,
        default:false
    },
    jobPostedOn:{
        type:Date,
        default:Date.now
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }



})

export const Job=mongoose.model("Job",jobSchema) 