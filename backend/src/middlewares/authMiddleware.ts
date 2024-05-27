import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "./catchAsync";
import ErrorHandler from "./ErrorHandler";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const secretOrPrivateKey: string = process.env.JWT_SECRET || "defaultSecretKey";

export const authMiddleware = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).send({ error: "Authorization header is missing" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).send({ error: "Authentication token is missing" });
    }

    try {
      const decoded = JWT.verify(token, secretOrPrivateKey) as { userId: number };
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ id: decoded.userId });

      if (!user) {
        return res.status(401).send({ error: "Invalid token: User not found" });
      }

      // Attach user to request object
      (req as any).user = user;
      next();
    } catch (err) {
      console.error("Error verifying token:", err);
      return next(new ErrorHandler(500, "Internal server error"));
    }
  }
);
