// ErrorHandler.ts
import { Request, Response, NextFunction } from 'express';

class ErrorHandler extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }

  static handle(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ErrorHandler) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      console.error(err.stack);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default ErrorHandler;
