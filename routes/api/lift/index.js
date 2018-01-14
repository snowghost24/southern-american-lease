const router = require("express").Router();
const liftRoutes = require("./liftrange");


// api/booking/books
router.use("/liftrange", liftRoutes);


module.exports = router;
