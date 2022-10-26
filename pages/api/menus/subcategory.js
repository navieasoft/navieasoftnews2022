import {
  deleteSubCategoryMenu,
  postSubCategoryMenus,
} from "../../../services/server/menus/subCategory";
import { dbConnection } from "../../../services/server/mongodb";

export default async function handler(req, res) {
  const { database } = await dbConnection();

  if (!database) {
    res.status(500).send({ message: "Serverside error" });
    return;
  } else {
    const categoryMenus = database.collection("category_menus");
    switch (req.method) {
      case "POST":
        postSubCategoryMenus(req, res, categoryMenus);
        break;

      case "DELETE":
        deleteSubCategoryMenu(req, res, categoryMenus);
        break;

      default:
        res.status(404).send({ message: "not found" });
        break;
    }
  }
}
