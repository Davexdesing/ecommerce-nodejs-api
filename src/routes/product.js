const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../middleware/auth");
const ProductController = require("../controllers/ProductController");
const StockController = require("../controllers/StockController");

router.get("/", ProductController.all);
router.post("/", verifyToken, ProductController.create);
router.put("/:id", verifyToken, ProductController.update);
router.get("/:id", ProductController.show);

//stock
router.post("/:id/stock", verifyToken, StockController.create);
router.get("/:id/stock", verifyToken, StockController.all);
router.put("/:id/stock/:stock", verifyToken, StockController.update);
router.get("/:id/stock/:stock", verifyToken, StockController.show);

module.exports = router;
