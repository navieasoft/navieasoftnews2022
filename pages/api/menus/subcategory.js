import {
  deleteSubCategoryMenu,
  postSubCategoryMenus,
} from "../../../services/server/menus/subCategory";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      postSubCategoryMenus(req, res);
      break;

    case "DELETE":
      deleteSubCategoryMenu(req, res);
      break;

    default:
      res.status(404).send({ message: "not found" });
      break;
  }
}
