import { dbConnection } from "../../../services/server/mongodb";
import {
  getSiteInfo,
  postSiteInfo,
} from "../../../services/server/settings/siteInfo";

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
    const settings = database.collection("settings");

    switch (req.method) {
      case "GET":
        getSiteInfo(req, res, settings);
        break;

      case "POST":
        postSiteInfo(req, res, settings);
        break;

      default:
        res.status(404).send({ message: "not found" });
        break;
    }
  }
}
