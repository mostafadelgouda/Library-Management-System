const { Router } = require("express");
const controller = require("../controllers/books.controller");
const router = Router();

router.get("/getby", controller.searchBooks);
router.route("/").get(controller.getBooks).post(controller.addBook); //.delete(controller.clearBooks);
router
  .route("/:id")
  .get(controller.getBookById)
  .delete(controller.removeBookById)
  .put(controller.updateById);

module.exports = router;
