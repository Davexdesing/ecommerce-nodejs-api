const { Router } = require('express')
const router = Router();
const LoginController = require('../controllers/LoginController')
const { verifyToken } = require("../middleware/auth");

router.post('/login', LoginController.login);
router.post('/register', LoginController.register);
router.post('/forgot-password', LoginController.forgotPassword);
router.post('/refresh-token', verifyToken, LoginController.refreshToken);


module.exports = router;