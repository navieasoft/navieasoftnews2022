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
  switch (req.method) {
    case "GET":
      getSiteInfo(req, res);
      break;

    case "POST":
      postSiteInfo(req, res);
      break;

    default:
      res.status(404).send({ message: "not found" });
      break;
  }
}
