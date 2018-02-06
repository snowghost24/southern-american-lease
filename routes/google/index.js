const router = require("express").Router();
const upLoads = require("./uploads");


// // api/booking/books
router.use("/uploads", upLoads);


module.exports = router;
