import {catchAsyncError} from "./catchAsyncError.js"
import ErrorHandler, {errorMiddleware} from "./error.js"
import jwt from "jsonwebtoken"
import {User} from "../models/userModals.js"

//defining a middlewares function called isAuthenticated using catchAysncErrors to handle any asynchronous errors

export const isAuthorized = catchAsyncError(async(req,res,next)=>{
    
    //extracting the token property from the request cookies
    // const {token} = req.cookies;
  
    // const {token} = req.headers;
    const token=req.headers['authorization'].split(' ')[1]
    // const token = req.headers['authorization'].split(' ')[1];
    console.log(token,"token")

    //if no token is found in cokies return an error indicating the user isnot authorized
    if(!token){
        return next(new ErrorHandler("User not authorized",401))
    }
    //verifying the token using the JWT_SECRET_KEY from the environment variable 
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    console.log(decoded)
 //finding the user associated with the decoded token id and attaching it to the request object
    req.user=await User.findById(decoded.id)

    //calling the next middleware in the chain
    
next()

}) 