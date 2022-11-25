import { errorHandler } from "../errorhandler";
import { userVarification } from "../user/user";
import { queryDocument } from "../common";

export async function getBreakingNews(req, res) {
  try {
    const result = await queryDocument("SELECT value FROM breaking_news");
    res.send(result);
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}

export async function postBreakingNews(req, res) {
  try {
    if (!req.body.userId) throw { message: "user unathenticated!" };
    const { varify } = await userVarification(req.body.userId);
    if (!varify) throw { message: "user unathenticated!" };
    delete req.body.userId;

    const sql = `SELECT id FROM breaking_news WHERE value = '${req.body.value}'`;
    const isExist = await queryDocument(sql);
    if (isExist.length) {
      res.status(409).send({ message: "Already added menu" });
      return;
    }
    const query = `INSERT INTO breaking_news SET value = '${req.body.value}'`;
    const result = await queryDocument(query);
    if (result.insertId > 0) {
      res.send({
        message: "Breaking news added successfully",
      });
    } else {
      res.status(424).send({ message: "Unable to add, Try again." });
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}

export async function deleteBreakingNews(req, res) {
  try {
    if (!req.body.userId) throw { message: "user unathenticated!" };
    const { varify } = await userVarification(req.body.userId);
    if (!varify) throw { message: "user unathenticated!" };
    delete req.body.userId;

    const sql = `DELETE FROM breaking_news WHERE id = '${req.body.id}'`;
    const result = await queryDocument(sql);
    console.log(result);
    if (result.affectedRows > 0) {
      res.send({
        message: "Breaking news deleted successfully",
      });
    } else {
      res.status(424).send({ message: "Unable to delete, Try again." });
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}
