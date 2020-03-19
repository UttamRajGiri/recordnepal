const router = require("express").Router();
const CoronaController = require("../modules/corona/corona.controller").controller;
const FaqController = require("../modules/page/faq.controller").controller;
const MythController = require("../modules/page/myth.controller").controller;
const NewsController = require("../modules/page/news.controller").controller;

router.use(async (req, res, next) => {
  try {
    let data = await CoronaController.list();
    data = data[data.length - 1];
    data.date = new Date().toISOString().split("T")[0];
    req.corona_data = data;
    req.full_url = req.protocol + "://" + req.get("host") + req.originalUrl;
  } catch (e) {
    req.corona_data = {
      totalCases: 0,
      newCases: 0,
      totalDeaths: 0,
      newDeaths: 0,
      activeCases: 0,
      totalRecovered: 0,
      criticalCases: 0
    };
  }
  next();
});

router.get("/", async (req, res, next) => {
  res.render("index", {
    corona_data: req.corona_data
  });
});
router.get("/post", async (req, res, next) => {
  res.render("single-post", {
    corona_data: req.corona_data
  });
});

module.exports = router;
