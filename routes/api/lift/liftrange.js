const router = require("express").Router();
const liftController = require("../../../controllers/liftController");

// Matches with "/api/leather/leatherkits"
router.route("/")
  .get(liftController.findAll)
  .post(liftController.bringBackLift);

// Matches with "/leather/leatherkits/:id"
router
  .route("/:id")
  .get(liftController.findById)
  .put(liftController.update)
  .delete(liftController.hide);

module.exports = router;
