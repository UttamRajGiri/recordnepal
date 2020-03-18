const router = require("express").Router();

const uiRouter = require("./ui.routes");
const apiRouter = require("./api.routes");

router.use("/", uiRouter);
router.use("/api/v1", apiRouter);

module.exports = router;
