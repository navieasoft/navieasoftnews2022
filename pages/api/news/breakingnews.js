import {
  deleteBreakingNews,
  getBreakingNews,
  postBreakingNews,
} from "../../../services/server/news/breakingnews";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      getBreakingNews(req, res);
      break;

    case "POST":
      postBreakingNews(req, res);
      break;

    case "DELETE":
      deleteBreakingNews(req, res);
      break;

    default:
      res.status(404).send({ message: "not found" });
      break;
  }
}
