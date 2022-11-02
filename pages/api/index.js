import { errorHandler } from "../../services/server/errorhandler";
import { multipleBodyParser } from "../../services/server/multer";
import { dbConnection } from "../../services/server/mongodb";
import { ObjectId } from "mongodb";
import fs from "fs";
import path from "path";
import { userVarification } from "../../services/server/user/user";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { database } = await dbConnection();

  if (!database) {
    res.send(500).send({ message: "Serverside error" });
    return;
  }
  const footerMenus = database.collection("footer_menus");

  switch (req.method) {
    case "POST":
      if (req.query.socialImg) {
        uploadSocialImg(req, res, footerMenus);
      } else uploadImage(req, res);
      break;

    case "DELETE":
      deleteSocialLink(req, res, footerMenus);
      break;

    default:
      res.status(404).send({ message: "not found" });
      break;
  }
}

async function uploadImage(req, res) {
  try {
    const { error } = await multipleBodyParser(req, res, "", [
      { name: "img", maxCount: 1 },
    ]);
    if (error) throw { message: "error occured when image uploading" };
    if (req.body.exist && !req.body.exist?.includes("https://")) {
      const img = req.body.exist.replace("/", "");
      fs.unlinkSync(path.join(process.cwd(), "public", img));
    }
    res.send({ image: req.files.img[0].filename });
  } catch (error) {
    errorHandler(res, { msg: error.message, status: error.status });
  }
}

async function uploadSocialImg(req, res, footerMenus) {
  try {
    const { error } = await multipleBodyParser(req, res, "", [
      { name: "img", maxCount: 1 },
    ]);
    if (error) throw { message: error || "Error occured when file uploading" };
    //user virification;
    if (!req.body.userId) throw { message: "user unathenticated!" };
    const { varify } = await userVarification(req.body.userId);
    if (!varify) throw { message: "user unathenticated!" };
    delete req.body.userId; //till;

    req.body.img = req.files.img[0].filename;
    const id = ObjectId("6358d00bcf4c489e511941be");
    const isExist = await footerMenus.findOne({
      _id: id,
      social: req.body.link,
    });
    if (isExist) {
      res.status(409).send({ message: "Already added menu" });
      return;
    }
    const result = await footerMenus.updateOne(
      {
        _id: id,
      },
      { $push: { social: req.body } }
    );
    if (result.modifiedCount > 0) {
      res.status(200).send({
        message: "Link added successfully",
      });
    } else {
      res.status(424).send({ message: "Unable to add, Try again." });
    }
  } catch (error) {
    errorHandler(res, { msg: error.message, status: error.status });
  }
}

async function deleteSocialLink(req, res, footerMenus) {
  try {
    const { error } = await multipleBodyParser(req, res, "", []);
    if (error) throw { message: "There was an error" };
    //user virification;
    if (!req.body.userId) throw { message: "user unathenticated!" };
    const { varify } = await userVarification(req.body.userId);
    if (!varify) throw { message: "user unathenticated!" };
    delete req.body.userId; //till;

    req.body = JSON.parse(req.body.menu);
    const id = ObjectId("6358d00bcf4c489e511941be");

    const result = await footerMenus.updateOne(
      {
        _id: id,
      },
      { $pull: { social: { link: req.body.link } } }
    );
    if (result.modifiedCount > 0) {
      if (req.body.img) {
        fs.unlinkSync(path.join(process.cwd(), "public", req.body.img));
      }
      res.status(200).send({
        message: "Link deleted successfully",
      });
    } else {
      res.status(424).send({ message: "Unable to delete, Try again." });
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}
