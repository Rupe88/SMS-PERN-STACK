import express from "express";
import { loginUser, registerUser } from "../controllers/userController";
const router = express.Router();
//routes for user
router.post("/register", registerUser);
router.post("/login", loginUser);
export default router;
