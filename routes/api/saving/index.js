const router = require("express").Router();
const savedArticles = require("./saved");


// if any api/saving/saved routes are thig send them to the file saved
router.use("/saved", savedArticles);


module.exports = router;
