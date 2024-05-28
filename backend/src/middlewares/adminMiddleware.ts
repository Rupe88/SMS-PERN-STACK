import { Request, Response, NextFunction } from "express";
import { catchAsync } from "./catchAsync";
import ErrorHandler from "./ErrorHandler";

export const isAdmin = catchAsync(
    
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        // @ts-ignore
        const user = req.user as { role: string } | undefined;
  
        if (!user || user.role !== "admin") {
          return res
            .status(403)
            .json({ message: "Unauthorized: Only admins are allowed" });
        }
  
        // If user is admin, proceed to the next middleware or route handler
        next();
      } catch (error) {
        next(new ErrorHandler(500, "internal server error"));
      }
    }
  );
  