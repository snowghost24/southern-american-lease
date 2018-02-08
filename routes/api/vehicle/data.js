const router = require("express").Router();
const vehDataController = require("../../../controllers/vehDataController");

// Matches with "/api/booking/books"
router.route("/")
  .get(vehDataController.getSavedMarketing)
  .post(vehDataController.useVinDecoder)
  .put(vehDataController.enterVehicle);

// Matches with "/api/booking/books/:id"
router.route("/:id")
  .get(vehDataController.findById)
  .put(vehDataController.update)
  .delete(vehDataController.remove);

module.exports = router;
