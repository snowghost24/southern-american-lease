const router = require("express").Router();
const bookRoutes = require("./books");


// api/booking/books
router.use("/books", bookRoutes);


module.exports = router;
