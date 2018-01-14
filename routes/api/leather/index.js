const router = require("express").Router();
const leatherRoutes = require("./leatherkit");


// api/booking/books
router.use("/leatherkit", leatherRoutes);


module.exports = router;
