import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "admin123",
  database: "stage1",
  port: 5432,
});
