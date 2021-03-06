const router = require("express").Router();
const leatherController = require("../../../controllers/leatherController");

// Matches with "/api/leather/leatherkits"
router.route("/")
  .get(leatherController.findAll)
  .post(leatherController.bringBackLeather);

// Matches with "/leather/leatherkits/:id"
router
  .route("/:id")
  .get(leatherController.findById)
  .put(leatherController.update)
  .delete(leatherController.hide);

module.exports = router;
