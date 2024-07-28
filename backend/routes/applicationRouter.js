import express from "express";
import {
  employerGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
  postApplication,
  employerReviewApplication
 
} from "../controllers/applicationController.js";
import {isAuthorized} from "../middlewares/auth.js"
import { uploads } from "../multerConfig.js";


const router = express.Router();



router.post("/post",isAuthorized ,uploads.single('image'), postApplication);
router.get("/employer/getall", isAuthorized, employerGetAllApplications);
router.get("/jobseeker/getall", isAuthorized, jobseekerGetAllApplications);
router.delete("/delete/:id", isAuthorized, jobseekerDeleteApplication);
router.put("/employerReviewApplication",isAuthorized,employerReviewApplication)

export default router;