import {
  deleteCategoryMenu,
  getCategoryMenus,
  postCategoryMenus,
  updateCategoryMenus,
} from "../../../services/server/menus/categoryMenus";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      getCategoryMenus(req, res);
      break;

    case "POST":
      postCategoryMenus(req, res);
      break;

    case "PUT":
      updateCategoryMenus(req, res);
      break;

    case "DELETE":
      deleteCategoryMenu(req, res);
      break;

    default:
      res.status(404).send({ message: "not found" });
      break;
  }
}
