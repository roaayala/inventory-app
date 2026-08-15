import "dotenv/config";
import { Pool } from "pg";

const isProduction = process.env.DIR_ENV === "production";

const dbConfig = { ssl: isProduction ? { rejectUnauthorized: false } : false };

dbConfig.connectionString = process.env.DB_URL;

export const pool = new Pool(dbConfig);

pool.connect((err, client, release) => {
  if (err) {
    console.error("Fail to connect:", err.message);
  } else {
    console.log(`Connect to (${isProduction ? "PRODUCTION" : "LOCAL"}) DB`);
  }
  if (client) release();
});
