const path = require("path");
const router = require("express").Router();
const booking = require("./booking");
const saving = require("./saving");
// API Routes
router.use("/booking", booking);
router.use("/saving", saving);
// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
