import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
    createJobApplication, editJobApplication,
    editJobApplicationStatus,
    getJobApplication
} from "../controllers/JobApplicationSchema.js";


const router = express.Router();

router.post("/job-apply-data", userAuth, createJobApplication);
router.get("/get-job-applications",  getJobApplication);
router.put("/:id/:status",  editJobApplicationStatus);
router.put("/:id",  editJobApplication);

export default router;
