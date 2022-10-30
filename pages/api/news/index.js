import { dbConnection } from "../../../services/server/mongodb";
import {
  deleteNews,
  getNews,
  postNews,
  updateNews,
} from "../../../services/server/news/news";

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
    const news = database.collection("news");
    switch (req.method) {
      case "GET":
        getNews(req, res, news);
        break;

      case "POST":
        postNews(req, res, news);
        break;

      case "PUT":
        updateNews(req, res, news);
        break;

      case "DELETE":
        deleteNews(req, res, news);
        break;

      default:
        res.status(404).send({ message: "not found" });
        break;
    }
  }
}
