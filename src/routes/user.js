const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../middleware/auth");
const UserController = require("../controllers/UserController");
const  {verifyAdmin} = require("../middleware/admin")

router.get("/", [verifyToken, verifyAdmin], UserController.all);
router.post("/", [verifyToken, verifyAdmin], UserController.create);
router.put("/:id", [verifyToken, verifyAdmin], UserController.update);
router.get("/:id", [verifyToken, verifyAdmin], UserController.show);

module.exports = router;
