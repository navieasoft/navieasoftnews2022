import { queryDocument } from "../common";
import { errorHandler } from "../errorhandler";
import { userVarification } from "../user/user";

export async function getFooterMenus(req, res) {
  try {
    const result = {};
    const data = await queryDocument("SELECT * FROM footer_menu");
    result.news = data.filter((item) => item.column_number === 1);
    result.opinion = data.filter((item) => item.column_number === 2);
    result.arts = data.filter((item) => item.column_number === 3);
    result.living = data.filter((item) => item.column_number === 4);
    result.more = data.filter((item) => item.column_number === 5);
    result.social = data.filter((item) => item.column_number === 6);
    res.send(result);
  } catch (error) {
    errorHandler(res);
  }
}

export async function postFooterMenus(req, res) {
  try {
    if (!req.body.userId) throw { message: "user unathenticated!" };
    const varify = await userVarification(req.body.userId);
    if (!varify) throw { message: "user unathenticated!" };
    delete req.body.userId;

    const sql = `SELECT id FROM footer_menu WHERE name = '${req.body.name}' AND column_number = '${req.body.collumn}'`;
    const isExist = await queryDocument(sql);

    if (isExist.length) {
      res.status(409).send({ message: "Already added menu" });
      return;
    }
    const query = `INSERT INTO footer_menu SET name = '${req.body.name}', column_number = '${req.body.collumn}'`;
    const result = await queryDocument(query);
    if (result.insertId > 0) {
      res.status(200).send({
        message: "Menu added successfully",
      });
    } else {
      res.status(424).send({ message: "Unable to add, Try again." });
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}

export async function deleteFooterMenus(req, res) {
  try {
    if (!req.body.userId) throw { message: "user unathenticated!" };
    const varify = await userVarification(req.body.userId);
    if (!varify) throw { message: "user unathenticated!" };
    delete req.body.userId;

    const sql = `DELETE FROM footer_menu WHERE name = '${req.body.name}' AND column_number = '${req.body.collumn}'`;
    const result = await queryDocument(sql);
    if (result.affectedRows > 0) {
      res.send({
        message: "Menu deleted successfully",
      });
    } else {
      res.status(424).send({ message: "Unable to delete, Try again." });
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}
