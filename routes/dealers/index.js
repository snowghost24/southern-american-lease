const router = require("express").Router();
const dealerHandler = require("./dealer");


// // api/booking/books
router.use("/dealer", dealerHandler);


module.exports = router;
