const router = require("express").Router();
const dataRoutes = require("./data");


// api/booking/books
router.use("/data", dataRoutes);


module.exports = router;
