import { errorHandler } from "../../../services/server/errorhandler";
import { multipleBodyParser } from "../../../services/server/multer";
import { userVarification } from "../../../services/server/user/user";
import path from "path";
import fs from "fs";
import { queryDocument } from "../../../services/server/common";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      getAds(res);
      break;

    case "POST":
      postAds(req, res);
      break;

    default:
      res.status(404).send({ message: "not found" });
      break;
  }
}

async function getAds(res) {
  try {
    const data = { home: {}, other: {} };
    const sql = "SELECT * FROM ads";
    const result = await queryDocument(sql);
    data.home.small = result.filter(
      (item) => item.page === "home" && item.size === "small"
    );
    data.home.long = result.filter(
      (item) => item.page === "home" && item.size === "long"
    );
    data.other.small = result.filter(
      (item) => item.page === "other" && item.size === "small"
    );
    data.other.long = result.filter(
      (item) => item.page === "other" && item.size === "long"
    );
    res.send(data);
  } catch (error) {
    errorHandler(res, { msg: error.message, status: error.status || 500 });
  }
}

async function postAds(req, res) {
  try {
    const { error } = await multipleBodyParser(req, res, "ads", [
      { name: "image", maxCount: 1 },
    ]);
    if (error) throw { message: "error occured when image uploading" };
    //user virify;
    if (!req.body.userId) throw { message: "user unathenticated!" };
    const { varify } = await userVarification(req.body.userId);
    if (!varify) throw { message: "user unathenticated!" };
    delete req.body.userId; //till;

    let data = "";
    if (req.body.link) data += `link = '${req.body.link}'`;
    if (req.files.image) data += `, image = '${req.files.image[0].filename}'`;
    const sql = `UPDATE ads SET ${data} WHERE id = '${req.query.id}'`;
    const result = await queryDocument(sql);

    if (result.affectedRows > 0) {
      if (req.body.exist && req.files.image) {
        fs.unlinkSync(
          path.join(process.cwd(), "public", "ads", req.body.exist)
        );
      }
      res.send({ message: "Updated successfully" });
    } else throw { message: "Unable to update" };
  } catch (error) {
    fs.unlinkSync(path.join(process.cwd(), "public", "ads", data.adImg));
    errorHandler(res, { msg: error.message, status: error.status || 500 });
  }
}
