import { errorHandler } from "../errorhandler";
import { firebaseServerInit } from "../firebase";
import admin from "firebase-admin";

if (!admin.app.length) firebaseServerInit();

export async function addUser(req, res) {
  try {
    const { uid } = await admin.auth().createUser({
      displayName: req.body.displayName,
      email: req.body.email,
      emailVerified: true,
      password: req.body.password,
      photoURL: req.body.photoURL,
    });
    await admin
      .auth()
      .setCustomUserClaims(uid, { designation: req.body.designation });

    res.send({ message: "User Added successfully" });
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}

export async function getUser(req, res) {
  try {
    if (req.query.uid) {
      const user = await admin.auth().getUser(req.query.uid);
      res.send({ designation: user.customClaims?.role || "user" });
    } else if (req.query.designation) {
      const userlist = await admin
        .auth()
        .getUsers([{ customClaims: { designation: req.query.designation } }]);
      res.status(200).send(userlist);
    } else {
      const userlist = await admin.auth().listUsers(20, req.query.page || "1");
      res.status(200).send(userlist.users);
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}

export async function updateUser(req, res) {
  try {
    switch (req.query.title) {
      case "designation":
        await admin.auth().setCustomUserClaims(req.body.uid, {
          designation: req.body.designation,
        });
        res.send({ message: "Updated successfully" });
        break;

      case "Enable":
        await admin.auth().updateUser(req.body.uid, {
          disabled: false,
        });
        res.send({ message: "Updated successfully" });
        break;

      case "Disable":
        await admin.auth().updateUser(req.body.uid, {
          disabled: true,
        });
        res.send({ message: "Updated successfully" });
        break;

      default:
        throw { message: "Unexpected error occured", status: 500 };
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}

export async function deleteuser(req, res) {
  try {
    await admin.auth().deleteUser(req.query.uid);
    res.send({ message: "Deleted successfully" });
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}
