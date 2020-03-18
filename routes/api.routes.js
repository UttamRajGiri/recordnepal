const router = require("express").Router();

const CoronaRouter = require("../modules/corona/corona.routes.api");
const PagesRouter = require("../modules/page/page.routes.api");

router.use("/corona", CoronaRouter);
router.use("/cms", PagesRouter);

module.exports = router;
