const router = require("express").Router();
const savedArticles = require("./saved");


// Book routes
router.use("/saved", savedArticles);


module.exports = router;
