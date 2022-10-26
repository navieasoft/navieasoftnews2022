import {
  deleteFooterMenus,
  getFooterMenus,
  postFooterMenus,
} from "../../../services/server/menus/footerMenus";
import { dbConnection } from "../../../services/server/mongodb";

export default async function handler(req, res) {
  const { database } = await dbConnection();

  if (!database) {
    res.status(500).send({ message: "Serverside error" });
    return;
  } else {
    const footerMenus = database.collection("footer_menus");
    switch (req.method) {
      case "GET":
        getFooterMenus(req, res, footerMenus);
        break;

      case "POST":
        postFooterMenus(req, res, footerMenus);
        break;

      case "DELETE":
        deleteFooterMenus(req, res, footerMenus);
        break;

      default:
        res.status(404).send({ message: "not found" });
        break;
    }
  }
}
