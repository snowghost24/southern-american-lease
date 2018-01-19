const router = require("express").Router();
const fileUp = require("./filesend");


// // api/booking/books
router.use("/filesend", fileUp);


module.exports = router;
