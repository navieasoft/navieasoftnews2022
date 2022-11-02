import { errorHandler } from "../errorhandler";
import { ObjectId } from "mongodb";
import { userVarification } from "../user/user";

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
    if (!req.body.userId) throw { message: "user unathenticated!" };
    const { varify } = await userVarification(req.body.userId);
    if (!varify) throw { message: "user unathenticated!" };
    delete req.body.userId;

    const id = ObjectId("6358e226cf4c489e511941c1");
    const title = "breakingNews";

    const isExist = await breakingnews.findOne({
      _id: id,
      [title]: req.body.value,
    });
    if (isExist) {
      res.send(409).send({ message: "Already added menu" });
      return;
    }
    const result = await breakingnews.updateOne(
      {
        _id: id,
      },
      { $push: { [title]: req.body.value } }
    );
    if (result.modifiedCount > 0) {
      res.send(200).send({
        message: "Breaking news added successfully",
      });
    } else {
      res.send(424).send({ message: "Unable to add, Try again." });
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}

export async function deleteBreakingNews(req, res, breakingNews) {
  try {
    if (!req.body.userId) throw { message: "user unathenticated!" };
    const { varify } = await userVarification(req.body.userId);
    if (!varify) throw { message: "user unathenticated!" };
    delete req.body.userId;

    const id = ObjectId("6358e226cf4c489e511941c1");
    const title = "breakingNews";

    const result = await breakingNews.updateOne(
      {
        _id: id,
      },
      { $pull: { [title]: req.body.value } }
    );

    if (result.modifiedCount > 0) {
      res.send(200).send({
        message: "Breaking news deleted successfully",
      });
    } else {
      res.send(424).send({ message: "Unable to delete, Try again." });
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}
