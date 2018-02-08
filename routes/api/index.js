const path = require("path");
const router = require("express").Router();
const booking = require("./booking");
const saving = require("./saving");
const leather = require("./leather");
const lift = require("./lift");
const detail = require("./detail");
const vehicle = require("./vehicle");
// API Routes
//if any api/booking routes are hit send them to the booking folder
router.use("/booking", booking);
//if any api/saving routes are hit send them to the savings folder
router.use("/saving", saving);
router.use("/leather", leather);
router.use("/lift", lift);
router.use("/detail", detail);
router.use("/vehicle", vehicle);
// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
