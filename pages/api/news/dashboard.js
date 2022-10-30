import { ObjectId } from "mongodb";
import { errorHandler } from "../../../services/server/errorhandler";
import { dbConnection } from "../../../services/server/mongodb";

export default async function handler(req, res) {
  const { database } = await dbConnection();

  if (!database) {
    res.status(500).send({ message: "Serverside error" });
    return;
  } else {
    const news = database.collection("news");
    const settings = database.collection("settings");
    switch (req.method) {
      case "POST":
        handleDashboard(req, res, news);
        break;

      case "PUT":
        updateNewsViews(req, res, news, settings);
        break;

      default:
        res.status(404).send({ message: "not found" });
        break;
    }
  }
}

async function handleDashboard(req, res, news) {
  try {
    const someNews = await news
      .find({})
      .sort({ created_at: -1 })
      .limit(10)
      .toArray();
    const todaysNews = await news
      .find({
        created_at: { $gt: req.body.yesterday, $lt: req.body.today },
      })
      .count();
    const thisMonthNews = await news
      .find({
        created_at: { $gt: req.body.firstDayOfMonth, $lt: req.body.today },
      })
      .count();
    const thisYearNews = await news
      .find({
        created_at: { $gt: req.body.firstDayOfYear, $lt: req.body.today },
      })
      .count();
    res.send({ someNews, todaysNews, thisMonthNews, thisYearNews });
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}

async function updateNewsViews(req, res, news, settings) {
  try {
    //update news views;
    if (req.query.news) {
      const isExist = await footer.findOne({
        _id: ObjectId(req.query.id),
        views: req.body.value,
      });
      if (!isExist) {
        const result = await news.updateOne(
          { _id: ObjectId(req.query.id) },
          { $push: { views: req.body.views } }
        );
        if (result.modifiedCount > 0) {
          res.send({ message: "News updated" });
        } else {
          throw { message: "Unable to update, try again" };
        }
      }
    } //till;
    //update visitor views;
    else {
      const _id = ObjectId("6358fa24cf4c489e511941c5");
      const title = "visitors";
      const result = await settings.updateOne(
        { _id },
        {
          $push: { [title]: req.body },
        }
      );
      if (result.modifiedCount > 0) {
        res.send({ message: "updated" });
      } else {
        throw { message: "Unable to update, try again" };
      }
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}
