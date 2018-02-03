const router = require("express").Router();
const cartHandler = require("./addtocart");


// // api/booking/books
router.use("/addtocart", cartHandler);


module.exports = router;
