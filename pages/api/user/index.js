import {
  addUser,
  deleteuser,
  getUser,
  updateUser,
} from "../../../services/server/user/user";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      getUser(req, res);
      break;

    case "POST":
      addUser(req, res);
      break;

    case "PUT":
      updateUser(req, res);
      break;

    case "DELETE":
      deleteuser(req, res);
      break;

    default:
      res.status(404).send({ message: "not found" });
      break;
  }
}
