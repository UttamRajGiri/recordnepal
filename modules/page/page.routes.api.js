const router = require("express").Router();
const ArticleController = require("./article.controller").controller;
const MythController = require("./myth.controller").controller;
const FaqController = require("./faq.controller").controller;
const NewsController = require("./news.controller").controller;
const PhotoController = require("./photo.controller").controller;

//--------------- Pages ----------------

router.get("/articles", (req, res, next) => {
  let limit = req.query.limit || 50;
  let start = req.query.start || 0;
  let search = req.query.search || null;
  ArticleController.list({
    limit,
    start,
    search
  })
    .then(d => res.json(d))
    .catch(e => next(e));
});

router.get("/articles/:id", (req, res, next) => {
  ArticleController.get(req.params.id)
    .then(d => res.json(d))
    .catch(e => next(e));
});

//--------------- Myths ----------------

router.get("/myths", (req, res, next) => {
  let limit = req.query.limit || 50;
  let start = req.query.start || 0;
  let search = req.query.search || null;
  MythController.list({
    limit,
    start,
    search
  })
    .then(d => res.json(d))
    .catch(e => next(e));
});

router.get("/myths/:id", (req, res, next) => {
  MythController.get(req.params.id)
    .then(d => res.json(d))
    .catch(e => next(e));
});

//--------------- FAQs ----------------

router.get("/faqs", (req, res, next) => {
  let limit = req.query.limit || 50;
  let start = req.query.start || 0;
  let search = req.query.search || null;
  FaqController.list({
    limit,
    start,
    search
  })
    .then(d => res.json(d))
    .catch(e => next(e));
});

router.get("/faqs/:id", (req, res, next) => {
  FaqController.get(req.params.id)
    .then(d => res.json(d))
    .catch(e => next(e));
});

//--------------- News ----------------

router.get("/news", (req, res, next) => {
  let limit = req.query.limit || 10;
  let start = req.query.start || 0;
  let search = req.query.search || null;
  NewsController.list({
    limit,
    start,
    search
  })
    .then(d => res.json(d))
    .catch(e => next(e));
});

router.get("/news/:id", (req, res, next) => {
  NewsController.get(req.params.id)
    .then(d => res.json(d))
    .catch(e => next(e));
});
module.exports = router;
