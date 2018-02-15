const router = require("express").Router();
const detailController = require("../../../controllers/detailController");

// Matches with "/api/leather/leatherkits"
router.route("/")
  .get(detailController.findAll)
  .post(detailController.bringBackDetail);

// Matches with "/leather/leatherkits/:id"
router
  .route("/:id")
  .get(detailController.findById)
  .put(detailController.update)
  .delete(detailController.hide);

module.exports = router;
