const path = require("path");
const router = require("express").Router();
const booking = require("./booking");
const saving = require("./saving");

// API Routes
//if any api/booking routes are hit send them to the booking folder
router.use("/booking", booking);
//if any api/saving routes are hit send them to the savings folder
router.use("/saving", saving);
// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
