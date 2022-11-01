import { ObjectId } from "mongodb";
import { errorHandler } from "../errorhandler";

export async function getBreakingNews(req, res, breakingNews) {
  try {
    const _id = ObjectId("6358e226cf4c489e511941c1");
    const result = await breakingNews.findOne({ _id });
    res.send(result || {});
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}

export async function postBreakingNews(req, res, breakingnews) {
  try {
    const id = ObjectId("6358e226cf4c489e511941c1");
    const title = "breakingNews";

    const isExist = await breakingnews.findOne({
      _id: id,
      [title]: req.body.value,
    });
    if (isExist) {
      res.status(409).send({ message: "Already added menu" });
      return;
    }
    const result = await breakingnews.updateOne(
      {
        _id: id,
      },
      { $push: { [title]: req.body.value } }
    );
    if (result.modifiedCount > 0) {
      res.status(200).send({
        message: "Breaking news added successfully",
      });
    } else {
      res.status(424).send({ message: "Unable to add, Try again." });
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}

export async function deleteBreakingNews(req, res, breakingNews) {
  try {
    const id = ObjectId("6358e226cf4c489e511941c1");
    const title = "breakingNews";

    const result = await breakingNews.updateOne(
      {
        _id: id,
      },
      { $pull: { [title]: req.body.value } }
    );

    if (result.modifiedCount > 0) {
      res.status(200).send({
        message: "Breaking news deleted successfully",
      });
    } else {
      res.status(424).send({ message: "Unable to delete, Try again." });
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}
