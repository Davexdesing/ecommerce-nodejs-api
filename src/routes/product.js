const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../middleware/auth");
const ProductController = require("../controllers/ProductController");
const StockController = require("../controllers/StockController");
const ImageStockController = require("../controllers/ImageStockController")
const SizeController = require('../controllers/SizeController')


router.get("/", ProductController.all);
router.post("/", verifyToken, ProductController.create);
router.put("/:id", verifyToken, ProductController.update);
router.get("/:id", ProductController.show);
router.get('/public/:id', ProductController.showPublic);

//stock
router.post("/:id/stock", verifyToken, StockController.create);
router.get("/:id/stock", StockController.all);
router.put("/stock/:stock", verifyToken, StockController.update);
router.get("/stock/:stock", StockController.show);
router.get("/public/stock/:stock", StockController.showPublic);

//image
router.post("/stock/:stock/image", verifyToken, ImageStockController.create);
router.delete("/stock/image/:image", verifyToken, ImageStockController.destroy);

//size
router.post("/stock/:stock/size", verifyToken, SizeController.create);
router.put("/stock/size/:size",verifyToken, SizeController.update);

module.exports = router;
