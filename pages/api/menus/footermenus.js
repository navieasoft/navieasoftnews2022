import {
  deleteFooterMenus,
  getFooterMenus,
  postFooterMenus,
} from "../../../services/server/menus/footerMenus";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      getFooterMenus(req, res);
      break;

    case "POST":
      postFooterMenus(req, res);
      break;

    case "DELETE":
      deleteFooterMenus(req, res);
      break;

    default:
      res.status(404).send({ message: "not found" });
      break;
  }
}
