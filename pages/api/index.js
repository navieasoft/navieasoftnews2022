import { errorHandler } from "../../services/server/errorhandler";
import { multipleBodyParser } from "../../services/server/multer";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      uploadImage(req, res);
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
