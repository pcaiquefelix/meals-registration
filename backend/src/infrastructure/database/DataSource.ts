import { DataSource } from "typeorm";
import config from "../../../connection-config.json";
import { SqlServerConnectionOptions } from "typeorm/driver/sqlserver/SqlServerConnectionOptions";

export const AppDataSource = new DataSource(
  config as SqlServerConnectionOptions
);

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
