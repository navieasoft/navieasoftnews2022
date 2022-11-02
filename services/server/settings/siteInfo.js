import { userVarification } from "../user/user";
import { errorHandler } from "../errorhandler";
import { multipleBodyParser } from "../multer";
import { ObjectId } from "mongodb";
import path from "path";
import fs from "fs";

export async function getSiteInfo(req, res, settings) {
  try {
    const _id = ObjectId("6358fa24cf4c489e511941c5");
    const result = await settings.findOne({ _id });
    res.send({ ...result.siteInfo });
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}

export async function postSiteInfo(req, res, settings) {
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

    const _id = ObjectId("6358fa24cf4c489e511941c5");
    const title = "siteInfo";

    if (req.files) {
      if (req.files.logo) {
        req.body.logo = req.files.logo[0].filename;
        fs.unlinkSync(path.join(process.cwd(), "public", req.body.existedLogo));
        delete req.body.existedLogo;
      }
      if (req.files.favicon) req.body.favicon = req.files.favicon[0].filename;
    }

    const result = await settings.updateOne(
      { _id },
      { $set: { [title]: req.body } }
    );

    if (result.modifiedCount > 0) {
      res.send(200).send({
        message: "Updated successfully",
      });
    } else {
      res.send(424).send({ message: "Unable to update, Try again." });
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}
