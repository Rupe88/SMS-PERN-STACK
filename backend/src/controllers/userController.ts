import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { catchAsync } from "../middlewares/catchAsync";
import ErrorHandler from "../middlewares/ErrorHandler";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import JWT from "jsonwebtoken";
const secretOrPrivateKey: string = process.env.JWT_SECRET || 'defaultSecretKey';
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password, role } = req.body;

      //validate email
      if(!emailRegex.test(email)){
        return res.status(400).json({
          success:false,
          message:"invalid email format"
        })
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
      });
      await userRepository.save(newUser);

      res.status(200).json({
        success: true,
        message: "new user created successfully",
      });
    } catch (error) {
      next(new ErrorHandler(500, "Error in user register api"));
    }
  }
);

export const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

if(!emailRegex.test(email)){
  return res.status(400).json({
    success:false,
    message:"invalid email format"
  })
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
