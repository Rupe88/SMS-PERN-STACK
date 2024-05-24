
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "RUPESH",
  database: "sms-db",
  synchronize: true,
  logging: false,
  entities: ["src/entities/*{.ts,.js}"],
  migrations: [],
  subscribers: [],
});
