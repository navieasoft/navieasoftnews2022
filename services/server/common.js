import mysql from "mysql";
import fs from "fs";
import path from "path";

const mySql = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "newsportal",
  connectionLimit: 10,
});

export const queryDocument = (query) => {
  return new Promise((resolve, reject) => {
    mySql.getConnection((err, res) => {
      if (err) {
        res?.release();
        reject({ message: err.sqlMessage });
      } else {
        res.query(query, (err, result) => {
          res.release();
          if (err) reject({ message: err.sqlMessage });
          else resolve(result);
        });
      }
    });
  });
};

export const postDocument = (query, doc) => {
  return new Promise((resolve, reject) => {
    mySql.query(query, doc, (err, result) => {
      if (err) return reject({ message: err.sqlMessage });
      resolve(result);
    });
  });
};

export function deleteImage(image) {
  fs.unlinkSync(path.join(process.cwd(), "public", "assets", image));
}
