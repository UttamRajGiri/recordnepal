const router = require("express").Router();
const crawler = require("./crawler");
const who = require("./who_sit");
const Controller = require("./corona.controller").controller;
const SITController = require("../page/sitreport.controller").controller;

router.get("/", async (req, res, next) => {
  Controller.list()
    .then(d => res.json(d))
    .catch(e => next);
});

router.get("/crawl", async (req, res, next) => {
  let data = await crawler.scrape();
  if (data.length) {
    Controller.add(data)
      .then(d => res.json(d))
      .catch(e => next);
  } else {
    res.status(500).send("No Data");
  }
});

router.get("/who", async (req, res, next) => {
  let data = await who.scrape();
  for (let d of data) {
    try {
      await SITController.add(d);
    } catch (e) {}
  }

  res.json(data);
});

module.exports = router;
