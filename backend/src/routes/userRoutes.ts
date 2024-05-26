import express from "express";
import { loginUser, registerUser } from "../controllers/userController";
import upload from "../middlewares/multer";
const router = express.Router();
//routes for user
router.post("/register",upload.single("avatar"), registerUser);
router.post("/login", loginUser);
export default router;
