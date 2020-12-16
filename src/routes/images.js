const { Router } = require('express')
const router = Router();
const { verifyToken } = require("../middleware/auth");
const { getImage } = require('../controllers/ImageController')

router.get('/:type/:name', verifyToken, getImage);
router.get('/public/:type/:name', getImage);



module.exports = router;