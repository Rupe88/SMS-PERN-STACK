import express from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import { AppDataSource } from "./data-source";
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

//apis
app.use("/api/user", userRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("database connected successfully");

    //listening
    app.listen(port, async () => {
      console.log(`server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("error in db conneciton", error);
  });
