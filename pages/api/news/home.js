import { errorHandler } from "../../../services/server/errorhandler";
import { dbConnection } from "../../../services/server/mongodb";

export default async function handler(req, res) {
  const { database } = await dbConnection();

  if (!database) {
    res.status(500).send({ message: "Serverside error" });
    return;
  } else {
    const news = database.collection("news");
    switch (req.method) {
      case "GET":
        if (req.query.otherNews) {
          getOtherNews(req, res, news);
        } else if (req.query.category) {
          getCategoryNews(req, res, news);
        } else if (req.query.types) {
          getTypesNews(req, res, news);
        } else {
          getBasicData(req, res, news);
        }
        break;
      default:
        res.status(404).send({ message: "not found" });
        break;
    }
  }
}

async function getBasicData(req, res, news) {
  try {
    const hotNews = await news
      .find({ newsType: "hot news" })
      .sort({ created_at: 1 })
      .limit(4)
      .toArray();

    const topNews = await news
      .find({ newsType: "top news" })
      .sort({ created_at: 1 })
      .limit(3)
      .toArray();

    const countryNews = await news
      .find({ category: /bangladesh/i })
      .sort({ created_at: 1 })
      .limit(5)
      .toArray();

    const politicsNews = await news
      .find({ category: /politics/i })
      .sort({ created_at: 1 })
      .limit(5)
      .toArray();

    const businessNews = await news
      .find({ category: /business/i })
      .sort({ created_at: 1 })
      .limit(5)
      .toArray();

    const latestNews = await news
      .find()
      .sort({ created_at: 1 })
      .limit(22)
      .toArray();

    res.send({
      hotNews,
      topNews,
      countryNews,
      politicsNews,
      businessNews,
      latestNews,
    });
  } catch (error) {
    errorHandler(res, { msg: error.message, status: error.status || 500 });
  }
}

async function getOtherNews(req, res, news) {
  try {
    const otherNews = await news
      .find({ newsType: "genaral news" })
      .sort({ created_at: 1 })
      .limit(10)
      .toArray();

    const homeNews = await news
      .find({ category: /bangladesh/i })
      .sort({ created_at: 1 })
      .toArray();

    const featuresNews = await news
      .find({ newsType: /features/i })
      .sort({ created_at: 1 })
      .limit(5)
      .toArray();

    res.send({ otherNews, homeNews, featuresNews });
  } catch (error) {
    errorHandler(res, { msg: error.message, status: error.status || 500 });
  }
}

async function getCategoryNews(req, res, news) {
  try {
    if (req.query.sub) {
      const result = await news
        .find({
          category: RegExp(req.query.category, "i"),
          subs: RegExp(req.query.sub, "i"),
        })
        .sort({ created_at: 1 })
        .limit(parseInt(req.query.limit) || 20)
        .toArray();
      res.send(result);
    } else {
      const result = await news
        .find({
          category: RegExp(req.query.category, "i"),
        })
        .sort({ created_at: 1 })
        .skip(parseInt(req.query.skip) || 0)
        .limit(parseInt(req.query.limit) || 20)
        .toArray();
      res.send(result);
    }
  } catch (error) {
    errorHandler(res, { msg: error.message, status: error.status || 500 });
  }
}

async function getTypesNews(req, res, news) {
  try {
    const result = await news
      .find({ newsType: RegExp(req.query.types, "i") })
      .sort({ created_at: 1 })
      .limit(12)
      .toArray();
    res.send(result);
  } catch (error) {
    errorHandler(res, { msg: error.message, status: error.status || null });
  }
}
