import { ObjectId } from "mongodb";
import { errorHandler } from "../errorhandler";
import { userVarification } from "../user/user";

export async function getFooterMenus(req, res, footer) {
  try {
    const result = await footer.find().toArray();
    res.status(200).send(result[0]);
  } catch (error) {
    errorHandler(res);
  }
}

export async function postFooterMenus(req, res, footer) {
  try {
    if (!req.body.userId) throw { message: "user unathenticated!" };
    const { varify } = await userVarification(req.body.userId);
    if (!varify) throw { message: "user unathenticated!" };
    delete req.body.userId;

    const id = ObjectId("6358d00bcf4c489e511941be");
    const title = req.body.title;
    const isExist = await footer.findOne({
      _id: id,
      [title]: req.body.value,
    });
    if (isExist) {
      res.status(409).send({ message: "Already added menu" });
      return;
    }
    const result = await footer.updateOne(
      {
        _id: id,
      },
      { $push: { [title]: req.body.value } }
    );
    if (result.modifiedCount > 0) {
      res.status(200).send({
        message: "Menu added successfully",
      });
    } else {
      res.status(424).send({ message: "Unable to add, Try again." });
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}

export async function deleteFooterMenus(req, res, footer) {
  try {
    if (!req.body.userId) throw { message: "user unathenticated!" };
    const { varify } = await userVarification(req.body.userId);
    if (!varify) throw { message: "user unathenticated!" };
    delete req.body.userId;

    const id = ObjectId("6358d00bcf4c489e511941be");
    const title = req.body.title;

    const result = await footer.updateOne(
      {
        _id: id,
      },
      { $pull: { [title]: req.body.value } }
    );

    if (result.modifiedCount > 0) {
      res.status(200).send({
        message: "Menu deleted successfully",
      });
    } else {
      res.status(424).send({ message: "Unable to delete, Try again." });
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}
