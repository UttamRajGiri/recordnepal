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
  let data = [];
  try {
    data = await CoronaController.list();
  } catch (e) {
    console.log(e);
  }
  let faqs = await FaqController.list({ limit: 16 });
  let news = await NewsController.list({ limit: 3 });
  let myths = await MythController.list({ limit: 4 });
  faqs = faqs.data;
  faqs = faqs.map(d => {
    let { _id, type, question, answer, category, lang, image_url, question_np, answer_np } = d;
    if (question_np && question_np.length > 10) question = question_np;
    if (answer_np && answer_np.length > 5) answer = answer_np;
    return {
      _id,
      type,
      question,
      answer,
      category,
      lang,
      image_url
    };
  });
  news = news.data;
  myths = myths.data;
  res.render("index", {
    // meta: {
    //   image: "https://assets.rumsan.com/askbhunte/assets/coronavirus-myth-4b.jpg",
    //   title: "काेराेना भाइरस सम्बन्धी जानकारी",
    //   description:
    //     "काेराेना भाइरस सम्बन्धी तथ्याँक, खबर, प्रश्न र उत्तर र कसरी बाँच्ने जानकारीहरु। Realtime information on Coronavirus in Nepal. Check for stats, news and learn how to protect yourself and the community around you against this novel virus."
    // },
    faqs,
    news,
    myths,
    corona_data: req.corona_data,
    data
  });
});

module.exports = router;
