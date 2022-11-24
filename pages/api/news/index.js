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
  switch (req.method) {
    case "GET":
      getNews(req, res);
      break;

    case "POST":
      postNews(req, res);
      break;

    case "PUT":
      updateNews(req, res);
      break;

    case "DELETE":
      deleteNews(req, res);
      break;

    default:
      res.status(404).send({ message: "not found" });
      break;
  }
}
