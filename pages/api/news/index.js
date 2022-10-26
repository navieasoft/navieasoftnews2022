import { dbConnection } from "../../../services/server/mongodb";

export default async function handler(req, res) {
  const { database } = await dbConnection();

  if (!database) {
    res.status(500).send({ message: "Serverside error" });
    return;
  } else {
    const news = database.collection("news");
    switch (req.method) {
      case "GET":
        // getBreakingNews(req, res, breakingNews);
        break;

      case "POST":
        // postBreakingNews(req, res, breakingNews);
        break;

      case "DELETE":
        // deleteBreakingNews(req, res, breakingNews);
        break;

      default:
        res.status(404).send({ message: "not found" });
        break;
    }
  }
}
