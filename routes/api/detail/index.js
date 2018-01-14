const router = require("express").Router();
const detailedTrucksRoutes = require("./detailedTrucks");


// api/booking/books
router.use("/detailedTrucks", detailedTrucksRoutes);


module.exports = router;
