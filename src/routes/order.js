const { Router } = require('express')
const router = Router();
const { verifyToken } = require("../middleware/auth");
const OrderController = require("../controllers/OrderControlelr")

router.get("/:id", [verifyToken], OrderController);
router.post("/:id", [verifyToken], OrderController);

module.exports = router;