import { errorHandler } from "../errorhandler";
import { ObjectId } from "mongodb";

export async function getCategoryMenus(req, res, category) {
  try {
    const result = await category.find().toArray();
    res.status(200).send(result);
  } catch (error) {
    errorHandler(res);
  }
}

export async function postCategoryMenus(req, res, categoryMenus) {
  try {
    const isExist = await categoryMenus.findOne({ name: req.body.name });
    if (isExist) {
      res.status(409).send({ message: "Already added the category" });
      return;
    }
    const result = await categoryMenus.insertOne(req.body);
    if (result.insertedId) {
      res.status(200).send({
        message: "Category menu added successfully",
      });
    } else {
      res.status(424).send({ message: "Unable to add, Try again." });
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}

export async function updateCategoryMenus(req, res, categoryMenus) {
  try {
    const result = await categoryMenus.updateOne(
      {
        _id: ObjectId(req.body.categoryId),
      },
      { $set: { name: req.body.value } }
    );

    if (result.modifiedCount > 0) {
      res.status(200).send({
        message: "Category menu updated successfully",
      });
    } else {
      res.status(424).send({ message: "Unable to update, Try again." });
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}

export async function deleteCategoryMenu(req, res, category) {
  try {
    const result = await category.deleteOne({ _id: ObjectId(req.body.id) });
    if (result.deletedCount > 0) {
      res.status(200).send({
        message: "Category menu delete successfully",
      });
    } else {
      res.status(424).send({ message: "Unable to delete, Try again." });
    }
  } catch (error) {
    errorHandler(res);
  }
}
