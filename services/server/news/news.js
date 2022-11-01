import { ObjectId } from "mongodb";
import { errorHandler } from "../errorhandler";
import { multipleBodyParser } from "../multer";
import fs from "fs";
import path from "path";

export async function postNews(req, res, news) {
  try {
    const { error } = await multipleBodyParser(req, res, "assets", [
      { name: "mainImg", maxCount: 1 },
      { name: "featureImg1", maxCount: 1 },
      { name: "featureImg2", maxCount: 1 },
      { name: "featureImg3", maxCount: 1 },
    ]);
    if (error) throw { message: error || "Error occured when file uploading" };
    Object.entries(req.files).map(
      ([key, value]) => (req.body[key] = value[0].filename)
    );
    req.body.raletedTopic = JSON.parse(req.body.raletedTopic);
    req.body.created_at = new Date();

    const result = await news.insertOne(req.body);
    if (result.insertedId) {
      res.send({ message: "News successfully posted" });
    } else {
      throw { message: "Unable to post, try again", status: 500 };
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}

export async function getNews(req, res, news) {
  try {
    const page = parseInt(req.query.page) * 20;
    if (req.query.id) {
      const result = await news.findOne({ _id: ObjectId(req.query.id) });
      if (result) res.send(result);
      else throw { message: "no data found" };
    } else {
      const result = await news
        .find({})
        .sort({ created_at: -1 })
        .skip(page || 0)
        .limit(20)
        .toArray();

      res.send(result);
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}

export async function updateNews(req, res, news) {
  try {
    const { error } = await multipleBodyParser(req, res, "assets", [
      { name: "mainImg", maxCount: 1 },
      { name: "featureImg1", maxCount: 1 },
      { name: "featureImg2", maxCount: 1 },
      { name: "featureImg3", maxCount: 1 },
    ]);
    if (error) throw { message: error || "Error occured when file uploading" };
    if (req.files) {
      Object.entries(req.files).map(
        ([key, value]) => (req.body[key] = value[0].filename)
      );
    }
    req.body.raletedTopic = JSON.parse(req.body.raletedTopic);
    const existedImg = req.body.existedImg;
    delete req.body.existedImg;
    const result = await news.updateOne(
      { _id: ObjectId(req.query.id) },
      {
        $set: req.body,
      }
    );
    if (result.modifiedCount > 0) {
      if (existedImg) {
        existedImg.forEach((item) => {
          fs.unlinkSync(path.join(process.cwd(), "public", "assets", item));
        });
      }
      res.send({ message: "News successfully updated" });
    } else {
      throw { message: "Unable to update, try again" };
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}

export async function deleteNews(req, res, news) {
  try {
    const { error } = await multipleBodyParser(req, res, "", []);
    if (error) throw { message: error || "Internal server error" };
    req.body.images = JSON.parse(req.body.images);
    //delte image from server;
    Object.entries(req.body.images).map(([key, value]) => {
      if (value) {
        fs.unlinkSync(path.join(process.cwd(), "public", "assets", value));
      }
    });
    //delete data from db;
    const result = await news.deleteOne({ _id: ObjectId(req.query.id) });
    if (result.deletedCount > 0) {
      res.send({ message: "News successfully deleted" });
    } else {
      throw { message: "Unable to delete, try again", status: 500 };
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}
