import mongoose  from "mongoose";

export const dbConnection=()=>{
    mongoose.connect(process.env.MONGODB_URL_LOCALHOST,{
        dbName:"MERN_STACK_JOB_SEEKING"
    }).then(()=>{
        console.log("connected to database");
    }).catch((err)=>{
        console.log(`some error occured while connection to database ${err}`);
    })
}

