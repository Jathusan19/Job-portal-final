import express from "express";

import authRoute from "./authRoutes.js";
import userRoute from "./userRoutes.js";
import companyRoute from "./companiesRoutes.js";
import jobRoute from "./jobsRoutes.js";
import jobApplicationRoutes from "./jobApplicationRoutes.js";
import {getAllUsers} from "../controllers/userController.js";
import {getNotifications} from "./notificationRoutes.js";
import {createSave, getSave, unSave} from "../controllers/saveController.js";
import saceRoutes from "./saceRoutes.js";

const router = express.Router();

const path = "/api-v1/";

router.use(`${path}auth`, authRoute); //api-v1/auth/
router.use(`${path}users`, userRoute);
router.use(`${path}companies`, companyRoute);
router.use(`${path}jobs`, jobRoute)
router.use(`${path}job-application`, jobApplicationRoutes)
router.use(`${path}save`, saceRoutes)
router.use(`${path}all-user-data`, getAllUsers)
router.use(`${path}notify`, getNotifications)

export default router;
