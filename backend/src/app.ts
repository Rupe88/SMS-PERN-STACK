import express from "express";
import { Request, Response } from "express";
import connectionDB from "./db/connection";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//test
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Hello world",
  });
});

//listening

app.listen(port, async() => {
  await connectionDB();
  console.log(`server is running on http://localhost:${port}`);
});
