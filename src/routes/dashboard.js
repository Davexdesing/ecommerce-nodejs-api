const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../middleware/auth");
const DashboardController = require("../controllers/DashboardController");
const  {verifyAdmin} = require("../middleware/admin")

router.get("/", [verifyToken, verifyAdmin], DashboardController.dashboard);

module.exports = router;
