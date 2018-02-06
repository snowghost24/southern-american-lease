const router = require("express").Router();
const saleInventory = require("./inventory");


// // api/booking/books
router.use("/inventory", saleInventory);


module.exports = router;
