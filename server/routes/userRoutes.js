import express from "express";
import path from "path";
import userAuth from "../middlewares/authMiddleware.js";
import {
  getAllUsers,
  getUser,
  updateUser,
  verifyEmail,
} from "../controllers/userController.js";

const router = express.Router();

const __dirname = path.resolve(path.dirname(""));

//verify user email
router.get("/verify/:userId/:token", verifyEmail);

// GET user
router.post("/get-user", userAuth, getUser);
router.post("/get-all-user", getAllUsers);

// UPDATE USER || PUT
router.put("/update-user", userAuth, updateUser);

export default router;
