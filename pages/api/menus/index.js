import {
  deleteCategoryMenu,
  getCategoryMenus,
  postCategoryMenus,
  updateCategoryMenus,
} from "../../../services/server/menus/categoryMenus";
import { dbConnection } from "../../../services/server/mongodb";

export default async function handler(req, res) {
  const { database } = await dbConnection();

  if (!database) {
    res.send(500).send({ message: "Serverside error" });
    return;
  } else {
    const categoryMenus = database.collection("category_menus");
    switch (req.method) {
      case "GET":
        getCategoryMenus(req, res, categoryMenus);
        break;

      case "POST":
        postCategoryMenus(req, res, categoryMenus);
        break;

      case "PUT":
        updateCategoryMenus(req, res, categoryMenus);
        break;

      case "DELETE":
        deleteCategoryMenu(req, res, categoryMenus);
        break;

      default:
        res.status(404).send({ message: "not found" });
        break;
    }
  }
}
