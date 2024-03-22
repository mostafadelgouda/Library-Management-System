const { Router } = require("express");
const controller = require("../controllers/borrowing_operations.controller.js");
const router = Router();

router.get("/", controller.getBorrowingOperations);
router.post("/", controller.addBorrowingOperation);
router.get("/getby", controller.getBorrowingOperationsForBorrowerId);
router.get("/overdue", controller.getOverdueBorrowingOperations);
router.get("/return/:id", controller.returnBorrowingOperation);

module.exports = router;
