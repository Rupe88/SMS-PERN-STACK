import express from "express";
import {
  getUser,
  getUsers,
  loginUser,
  putUser,
  registerUser,
  removeUser,
} from "../controllers/userController";
import upload from "../middlewares/multer";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = express.Router();
//routes for user
router.post("/register", upload.single("avatar"), registerUser); //register user
router.post("/login", loginUser); //login user
router.get("/users", authMiddleware, getUsers); //get all the users
router.get("/user/:id",authMiddleware, getUser); // get single user by id
router.put("/user/:id",authMiddleware, putUser); // update user
router.delete("/user/:id",authMiddleware, removeUser); //deleter user

export default router;
