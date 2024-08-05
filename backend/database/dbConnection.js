import mongoose  from "mongoose";

export const dbConnection=()=>{
<<<<<<< HEAD
    mongoose.connect(process.env.MONGODB_URL,{
=======
    mongoose.connect(process.env.MONGODB_URL_LOCALHOST,{
>>>>>>> 2287281 (Fixed the bug in the user authentication module)
        dbName:"MERN_STACK_JOB_SEEKING"
    }).then(()=>{
        console.log("connected to database");
    }).catch((err)=>{
        console.log(`some error occured while connection to database ${err}`);
    })
}

