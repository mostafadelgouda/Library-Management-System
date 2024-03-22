const { Router } = require("express");
const controller = require("../controllers/borrowers.controller.js");
const router = Router();

router
  .route("/")
  .get(controller.getBorrowers)
  .post(controller.registerBorrower);
router
  .route("/:id")
  .get(controller.getBorrowerById)
  .put(controller.updateBorrower)
  .delete(controller.deleteBorrower);

module.exports = router;
