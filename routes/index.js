const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const fileRoute = require("./file");
const cartRoute = require("./cart");
const saleRoute = require("./sales");
const dealersRoute = require("./dealers");
const googleRoute = require("./google");

// If any api routes are hit send them to the API folder
router.use("/api", apiRoutes);
router.use("/file", fileRoute);
router.use("/cart", cartRoute);
router.use("/sales", saleRoute);
router.use("/sales", saleRoute);
router.use("/dealers", dealersRoute);
router.use("/google", googleRoute);
// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
