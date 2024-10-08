import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import { User } from "../models/userModals.js"
import ErrorHandler from "../middlewares/error.js"
import { sendToken } from "../utils/jwtToken.js"
export const register = catchAsyncError(async (req, res, next) => {

  
  //extracting data from the request body

  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full registration form!"))
  }
  const isEmail = await User.findOne({ email })
  if (isEmail) {
    return next(new ErrorHandler("Email already exists!"))

  }

const user = await User.create({
    name, email, phone, role, password
  })
  // res.status(200).json({
  //     success:true,
  //     message:"User Created",
  //     user,
  // })
  sendToken(user, 200, res, "user Registered Successfully!")
})


//login controller function

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email password and role", 400))
  }

  const user = await User.findOne({ email }).select("+password")

  if (!user) {
    return next(new ErrorHandler("Invalid Email or password", 400))
  }

  const isPasswordMatched = await user.comparePassword(password)

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or password", 400))
  }
  if (user.role !== role) {
    return next(new ErrorHandler("User with this role not found", 400))

  }

  sendToken(user, 200, res, "User Logged in successfully!")
})


  export const logout=catchAsyncError(async (req,res,next)=>{
    res.status(201).cookie("token","",{
      httpOnly:true,
      expires:new Date(Date.now())
    }).json({
      success:true,
      message:"User Logged out Successfully"
    })
  })



  

export const getUser=catchAsyncError( (req,res,next)=>{
  const user=req.user;
  // console.log(user,"user")
  res.status(200).json({
    success:true,
    user
  })
})
