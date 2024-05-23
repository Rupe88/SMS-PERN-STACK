import { DataSource } from "typeorm";
import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config()

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "RUPESH",
  database: "sms-db",
  entities: ["src/entities/*{.ts,.js}"],
  synchronize: true,
  logging: true,
});

const connectionDB=async()=>{
    await AppDataSource.initialize()
    .then(() => {
      console.log("database is connected successfully");
    })
    .catch((error) => {
      console.log("error in db connection", error);
    });
}

export default connectionDB;

