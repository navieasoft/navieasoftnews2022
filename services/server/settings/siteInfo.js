import { userVarification } from "../user/user";
import { errorHandler } from "../errorhandler";
import { multipleBodyParser } from "../multer";
import { queryDocument } from "../common";
import path from "path";
import fs from "fs";

export async function getSiteInfo(req, res) {
  try {
    const result = await queryDocument("SELECT * FROM site_info");
    res.send(result[0]);
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}

export async function postSiteInfo(req, res) {
  try {
    const { error } = await multipleBodyParser(req, res, "", [
      { name: "logo", maxCount: 1 },
      { name: "favicon", maxCount: 1 },
    ]);
    if (error) throw error || "Error occour when file uploading";
    //user virify;
    if (!req.body.userId) throw { message: "user unathenticated!" };
    const { varify } = await userVarification(req.body.userId);
    if (!varify) throw { message: "user unathenticated!" };
    delete req.body.userId; //till;

    if (req.files) {
      if (req.files.logo) {
        req.body.logo = req.files.logo[0].filename;
        fs.unlinkSync(path.join(process.cwd(), "public", req.body.existedLogo));
        delete req.body.existedLogo;
      }
      if (req.files.favicon) req.body.favicon = req.files.favicon[0].filename;
    }
    let data = "";
    Object.entries(req.body).forEach(([key, value]) => {
      if (value) {
        if (data) {
          data += `, ${key} = '${value}'`;
        } else data += `${key} = '${value}'`;
      }
    });
    const sql = `UPDATE site_info SET ${data} WHERE id = '1'`;
    const result = await queryDocument(sql);

    if (result.changedRows > 0) {
      res.send({
        message: "Updated successfully",
      });
    } else {
      res.status(424).send({ message: "Unable to update, Try again." });
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}
