import mysql from "mysql2";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "newsportal",
  password: "",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
