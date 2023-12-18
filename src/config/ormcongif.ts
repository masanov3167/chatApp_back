import { DataSource } from "typeorm";
import path from "path";
import envconfig from "./envconfig";

export const dataSource = new DataSource({
  type: "postgres",
  host: envconfig.db_host,
  port: 5432,
  username: envconfig.db_user,
  password: envconfig.db_pass,
  database: envconfig.db_name,
  synchronize: true,
  entities: [path.resolve(__dirname, "..", "entities", "*.entity.{ts,js}")],
  // logging: true
})
