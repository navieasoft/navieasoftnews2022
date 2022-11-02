import { ObjectId } from "mongodb";
import { errorHandler } from "../errorhandler";
import { userVarification } from "../user/user";

export async function postSubCategoryMenus(req, res, categoryMenus) {
  try {
    if (!req.body.userId) throw { message: "user unathenticated!" };
    const { varify } = await userVarification(req.body.userId);
    if (!varify) throw { message: "user unathenticated!" };
    delete req.body.userId;

    const isExist = await categoryMenus.findOne({
      _id: ObjectId(req.body.categoryId),
      subs: req.body.value,
    });
    if (isExist) {
      res.send(409).send({ message: "Already added the sub category" });
      return;
    }
    const result = await categoryMenus.updateOne(
      {
        _id: ObjectId(req.body.categoryId),
      },
      { $push: { subs: req.body.value } }
    );
    if (result.modifiedCount > 0) {
      res.send(200).send({
        message: "Sub Category menu added successfully",
      });
    } else {
      res.send(424).send({ message: "Unable to add, Try again." });
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}

export async function deleteSubCategoryMenu(req, res, categoryMenus) {
  try {
    if (!req.body.userId) throw { message: "user unathenticated!" };
    const { varify } = await userVarification(req.body.userId);
    if (!varify) throw { message: "user unathenticated!" };
    delete req.body.userId;

    const result = await categoryMenus.updateOne(
      {
        _id: ObjectId(req.body.categoryId),
      },
      { $pull: { subs: req.body.value } }
    );

    if (result.modifiedCount > 0) {
      res.send(200).send({
        message: "Sub Category menu deleted successfully",
      });
    } else {
      res.send(424).send({ message: "Unable to delete, Try again." });
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}
