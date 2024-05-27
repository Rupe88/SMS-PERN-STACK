import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { catchAsync } from "../middlewares/catchAsync";
import ErrorHandler from "../middlewares/ErrorHandler";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import JWT from "jsonwebtoken";
const secretOrPrivateKey: string = process.env.JWT_SECRET || "defaultSecretKey";
import {
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../services/userService";
import upload from "../middlewares/multer";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//register user
export const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password, role } = req.body;
      const avatar = req.file;

      //validate email
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "invalid email format",
        });
      }
      if (!username || !email || !password || !role) {
        return res.status(400).json({
          success: false,
          message: "please provide full data",
        });
      }
      const userRepository = AppDataSource.getRepository(User);
      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "user already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
      const newUser = userRepository.create({
        username,
        email,
        password: hashedPassword,
        role,
        avatar: `src/storage/${avatar?.filename}`,
      });
      await userRepository.save(newUser);

      res.status(200).json({
        success: true,
        message: "new user created successfully",
        newUser,
      });
    } catch (error) {
      next(new ErrorHandler(500, "Error in user register api"));
    }
  }
);

//login user
export const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "invalid email format",
        });
      }
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({
          success: false,
          message: "invalid email or password",
        });
      }

      //token
      const token = JWT.sign(
        { userId: user.id, role: user.role },
        secretOrPrivateKey,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({
        success: true,
        message: "logged in successfully !",
        token: token,
      });
    } catch (error) {
      next(new ErrorHandler(500, "internal server error"));
    }
  }
);

// get user by id
export const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        next(new ErrorHandler(404, "invalid user Id"));
      }
      const user = await getUserById(id);
      if (!user) {
        return next(new ErrorHandler(404, "User not found"));
      }
      res.json(user);
    } catch (error) {
      console.log(error);
      next(new ErrorHandler(500, "internal server error"));
    }
  }
);

//get all the users
export const getUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getAllUsers();
      res.json(users);
    } catch (error) {
      next(new ErrorHandler(500, "internal server error"));
    }
  }
);

//update user
export const putUser = [
  upload.single("avatar"),
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        // If id is not a valid number, respond with a 400 Bad Request error
        return next(new ErrorHandler(400, "Invalid user ID"));
      }

      const updateData = req.body;
      if (req.file) {
        // If an avatar file is uploaded, add its path to the update data
        updateData.avatar = `src/storage/${req.file.filename}`;
      }

      //hashing password while updating data
      if(updateData.password){
        const hashedPassword=await bcrypt.hash(updateData.password, 10);
        updateData.password=hashedPassword;
      }

      // Validate updateData here if necessary
      const user = await updateUser(id, updateData);

      if (!user) {
        return next(new ErrorHandler(404, "User not found"));
      }

      // User was successfully updated
      res.status(200).json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      next(new ErrorHandler(500, "Internal server error"));
    }
  }),
];

//delete user
export const removeUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        // If id is not a valid number, respond with a 400 Bad Request error
        return next(new ErrorHandler(400, "Invalid user ID"));
      }

      const result = await deleteUser(id);

      if (result.affected === 0) {
        // No user was deleted, so respond with a 404 Not Found error
        return next(new ErrorHandler(404, "User not found"));
      }

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      next(new ErrorHandler(500, "Internal server error"));
    }
  }
);
