const { Router } = require('express')
const router = Router();
const { verifyToken } = require("../middleware/auth");
const { verifyAdmin } = require("../middleware/admin");
const { cart, order } = require("../middleware/cart")
const OrderController = require("../controllers/OrderController")

router.get("/", [verifyToken], OrderController.get);
router.get("/user", [verifyToken], OrderController.userShow)
router.get("/:id", [verifyToken], OrderController.show);
router.post("/", [verifyToken, cart, order], OrderController.store);

module.exports = router;