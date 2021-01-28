const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../middleware/auth");
const ProductController = require("../controllers/ProductController");
const StockController = require("../controllers/StockController");
const ImageStockController = require("../controllers/ImageStockController")
const SizeController = require('../controllers/SizeController');
const { verifyAdmin } = require("../middleware/admin");


router.get("/", ProductController.all);
router.get("/admin", ProductController.allAdmin);
router.post("/", [verifyToken, verifyAdmin], ProductController.create);
router.put("/:id", [verifyToken, verifyAdmin], ProductController.update);
router.put("/:id/delete", [verifyToken, verifyAdmin], ProductController.destroy);
router.put("/:id/activate", [verifyToken, verifyAdmin], ProductController.backActivate);
router.get("/:id", ProductController.show);
router.get('/public/:id', ProductController.showPublic);

//stock
router.post("/:id/stock", [verifyToken, verifyAdmin], StockController.create);
router.get("/:id/stock", StockController.all);
router.put("/stock/:stock", [verifyToken, verifyAdmin], StockController.update);
router.get("/stock/:stock", StockController.show);
router.get("/public/stock/:stock", StockController.showPublic);

//image
router.post("/stock/:stock/image", [verifyToken, verifyAdmin], ImageStockController.create);
router.delete("/stock/image/:image", [verifyToken, verifyAdmin], ImageStockController.destroy);

//size
router.post("/stock/:stock/size", [verifyToken, verifyAdmin], SizeController.create);
router.put("/stock/size/:size",[verifyToken, verifyAdmin], SizeController.update);
router.delete("/stock/size/:size",[verifyToken, verifyAdmin], SizeController.destroy);

module.exports = router;
