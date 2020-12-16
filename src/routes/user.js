const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../middleware/auth");
const UserController = require("../controllers/UserController");

router.get("/", verifyToken, UserController.all);
router.post("/", verifyToken, UserController.create);
router.put("/:id", verifyToken, UserController.update);
router.get("/:id", verifyToken, UserController.show);

module.exports = router;
