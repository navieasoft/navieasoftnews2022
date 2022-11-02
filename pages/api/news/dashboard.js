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
    const visitors = database.collection("visitors");
    switch (req.method) {
      case "GET":
        handleDashboard(req, res, news, visitors);
        break;

      case "PUT":
        updateNewsViews(req, res, news, visitors);
        break;

      default:
        res.status(404).send({ message: "not found" });
        break;
    }
  }
}

function getAllDates() {
  const date = new Date();
  const today = date;
  const yesterday = new Date(date.valueOf() - 1000 * 60 * 60 * 24);
  const beforeYesterday = new Date(date.valueOf() - 1000 * 60 * 60 * 48);
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const previousMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const previousYear = new Date(date.getFullYear() - 1, 0, 1);

  return {
    today,
    yesterday,
    beforeYesterday,
    firstDayOfMonth,
    previousMonth,
    firstDayOfYear,
    previousYear,
  };
}

async function getPostReport(news) {
  const {
    today,
    yesterday,
    beforeYesterday,
    firstDayOfMonth,
    previousMonth,
    firstDayOfYear,
    previousYear,
  } = getAllDates();
  const todaysNews = await news
    .find({
      created_at: { $gt: yesterday, $lt: today },
    })
    .count();

  const yesterNews = await news
    .find({
      created_at: { $gt: beforeYesterday, $lt: yesterday },
    })
    .count();
  const thisMonthNews = await news
    .find({
      created_at: { $gt: firstDayOfMonth, $lt: today },
    })
    .count();

  const previousMonthNews = await news
    .find({
      created_at: { $gt: previousMonth, $lt: firstDayOfMonth },
    })
    .count();
  const thisYearNews = await news
    .find({
      created_at: { $gt: firstDayOfYear, $lt: today },
    })
    .count();

  const previousYearNews = await news
    .find({
      created_at: { $gt: previousYear, $lt: firstDayOfYear },
    })
    .count();
  return [
    {
      name: "Today's Post",
      count: todaysNews,
      grouth: ((todaysNews - yesterNews) / yesterNews) * 100,
    },
    {
      name: "This Month's Post",
      count: thisMonthNews,
      grouth:
        ((thisMonthNews - previousMonthNews) /
          (previousMonthNews === 0 ? 1 : previousMonthNews)) *
        100,
    },
    {
      name: "This year's Post",
      count: thisYearNews,
      grouth:
        ((thisYearNews - previousYearNews) /
          (previousYearNews === 0 ? 1 : previousYearNews)) *
        100,
    },
  ];
}

async function getViewerReport(visitors) {
  const {
    today,
    yesterday,
    beforeYesterday,
    firstDayOfMonth,
    previousMonth,
    firstDayOfYear,
    previousYear,
  } = getAllDates();

  const todaysViews = await visitors
    .find({
      created_at: { $gt: yesterday, $lt: today },
    })
    .count();

  const yesterViews = await visitors
    .find({
      created_at: { $gt: beforeYesterday, $lt: yesterday },
    })
    .count();
  const thisMonthViews = await visitors
    .find({
      created_at: { $gt: firstDayOfMonth, $lt: today },
    })
    .count();

  const previousMonthViews = await visitors
    .find({
      created_at: { $gt: previousMonth, $lt: firstDayOfMonth },
    })
    .count();
  const thisYearViews = await visitors
    .find({
      created_at: { $gt: firstDayOfYear, $lt: today },
    })
    .count();

  const previousYearViews = await visitors
    .find({
      created_at: { $gt: previousYear, $lt: firstDayOfYear },
    })
    .count();

  return [
    {
      name: "Today's Views",
      count: todaysViews,
      grouth: ((todaysViews - yesterViews) / yesterViews) * 100,
    },
    {
      name: "This Month's Views",
      count: thisMonthViews,
      grouth:
        ((thisMonthViews - previousMonthViews) /
          (previousMonthViews === 0 ? 1 : previousMonthViews)) *
        100,
    },
    {
      name: "This year's Post",
      count: thisYearViews,
      grouth:
        ((thisYearViews - previousYearViews) /
          (previousYearViews === 0 ? 1 : previousYearViews)) *
        100,
    },
  ];
}

async function handleDashboard(req, res, news, visitors) {
  try {
    const someNews = await news
      .find({})
      .sort({ created_at: -1 })
      .limit(10)
      .toArray();
    const postReport = await getPostReport(news);
    const viewerReport = await getViewerReport(visitors);

    res.send({
      someNews,
      postReport,
      viewerReport,
    });
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}

async function updateNewsViews(req, res, news, visitors) {
  try {
    //update news views;
    if (req.query.news) {
      const isExist = await news.findOne({
        _id: ObjectId(req.query.id),
        "views.ipAdress": req.body.ipAdress,
        "views.date": req.body.date,
      });
      if (isExist) throw { message: "already added", status: 200 };

      const result = await news.updateOne(
        { _id: ObjectId(req.query.id) },
        { $push: { views: req.body } }
      );
      if (result.modifiedCount > 0) {
        res.send({ message: "News updated" });
      } else {
        throw { message: "Unable to update, try again" };
      }
    } //till;
    //update visitor views;
    else {
      const existed = await visitors.findOne({
        ipAdress: req.body.ipAdress,
        date: req.body.date,
      });
      if (existed) throw { message: "already added", status: 200 };
      req.body.created_at = new Date();
      const result = await visitors.insertOne(req.body);
      if (result.insertedId) {
        res.send({ message: "updated" });
      } else {
        throw { message: "Unable to update, try again" };
      }
    }
  } catch (err) {
    errorHandler(res, { msg: err.message, status: err.status });
  }
}
