import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {createJobApplication} from "../controllers/JobApplicationSchema.js";
import {createSave, getSave, unSave} from "../controllers/saveController.js";

const router = express.Router();
router.post("/save-job", createSave);
router.get("/get-save", getSave);
router.get('/unsave-job/:id', unSave);

export default router;