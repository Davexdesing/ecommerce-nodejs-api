const { Router } = require('express')
const router = Router();
const { verifyToken } = require("../middleware/auth");
const CategoryController = require('../controllers/CategoryController')

router.get('/', CategoryController.all);
router.post('/', verifyToken, CategoryController.create);
router.put('/:id', verifyToken, CategoryController.update);
router.get('/:name', CategoryController.show);
router.get('/edit/:id', CategoryController.edit);

module.exports = router;