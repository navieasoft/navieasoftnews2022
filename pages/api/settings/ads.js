import { ObjectId } from "mongodb";
import { errorHandler } from "../../../services/server/errorhandler";
import { dbConnection } from "../../../services/server/mongodb";
import { multipleBodyParser } from "../../../services/server/multer";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { database } = await dbConnection();

  if (!database) {
    res.status(500).send({ message: "Serverside error" });
    return;
  } else {
    const ads = database.collection("ads");

    switch (req.method) {
      case "GET":
        getAds(req, res, ads);
        break;

      case "POST":
        postAds(req, res, ads);
        break;

      default:
        res.status(404).send({ message: "not found" });
        break;
    }
  }
}

async function getAds(req, res, ads) {
  try {
    const homeData = await ads.find({ name: "home" }).toArray();
    const smallHome = homeData.filter((item) => item.size === "small");
    const longHome = homeData.filter((item) => item.size === "long");
    const home = { small: smallHome, long: longHome };
    const othersData = await ads.find({ name: "others" }).toArray();
    const smallOther = othersData.filter((item) => item.size === "small");
    const longOther = othersData.filter((item) => item.size === "long");
    const others = { small: smallOther, long: longOther };
    res.send({ home, others });
  } catch (error) {
    errorHandler(res, { msg: error.message, status: error.status || 500 });
  }
}

async function postAds(req, res, ads) {
  try {
    const { error } = await multipleBodyParser(req, res, "ads", [
      { name: "adImg", maxCount: 1 },
    ]);
    if (error) throw { message: "error occured when image uploading" };
    const data = {};
    if (req.body.url) data.url = req.body.url;
    if (req.files.adImg) data.adImg = req.files.adImg[0].filename;
    const result = await ads.updateOne(
      { _id: ObjectId(req.query.id) },
      {
        $set: data,
      }
    );
    if (result.modifiedCount > 0) {
      if (req.body.exist && req.files.adImg) {
        try {
          fs.unlinkSync(
            path.join(process.cwd(), "public", "ads", req.body.exist)
          );
        } catch (error) {
          console.log(error.message);
        }
      }
      res.send({ message: "Updated successfully" });
    } else throw { message: "Unable to update" };
  } catch (error) {
    errorHandler(res, { msg: error.message, status: error.status || 500 });
  }
}
