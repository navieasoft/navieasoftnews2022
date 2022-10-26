import { ObjectId } from "mongodb";
import { errorHandler } from "../errorhandler";

export async function postSubCategoryMenus(req, res, categoryMenus) {
  try {
    const isExist = await categoryMenus.findOne({
      _id: ObjectId(req.body.categoryId),
      subs: req.body.value,
    });
    if (isExist) {
      res.status(409).send({ message: "Already added the sub category" });
      return;
    }
    const result = await categoryMenus.updateOne(
      {
        _id: ObjectId(req.body.categoryId),
      },
      { $push: { subs: req.body.value } }
    );
    if (result.modifiedCount > 0) {
      res.status(200).send({
        message: "Sub Category menu added successfully",
      });
    } else {
      res.status(424).send({ message: "Unable to add, Try again." });
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}

export async function deleteSubCategoryMenu(req, res, categoryMenus) {
  try {
    const result = await categoryMenus.updateOne(
      {
        _id: ObjectId(req.body.categoryId),
      },
      { $pull: { subs: req.body.value } }
    );
    console.log(result);
    if (result.modifiedCount > 0) {
      res.status(200).send({
        message: "Sub Category menu deleted successfully",
      });
    } else {
      res.status(424).send({ message: "Unable to delete, Try again." });
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}
