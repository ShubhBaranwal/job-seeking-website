import express from "express";
import dotenv from 'dotenv'
import cors from "cors"
import cookieParser from "cookie-parser"
import session from "express-session";

import userRouter from "./routes/userRouter.js"
import jobRouter from './routes/jobRouter.js'
import applicationRouter from './routes/applicationRouter.js'
import {dbConnection} from './database/dbConnection.js'
import {errorMiddleware} from "./middlewares/error.js"

const app=express()
dotenv.config({path:"./config/config.env"})

<<<<<<< HEAD
 app.use(cors())

=======
// app.use(cors())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:['POST','GET','DELETE','UPDATE','PUT'],
    credentials:true
}))
>>>>>>> 2287281 (Fixed the bug in the user authentication module)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('uploads'))




app.use('/api/v1/user',userRouter)
app.use("/api/v1/application",applicationRouter)
app.use("/api/v1/job",jobRouter)

dbConnection();



export default app;







