const { Router } = require('express');
const controller = require('../controller/menu');

const router = Router();

router.get('/', controller.getMenus);
router.get('/type/:types', controller.getMenuByTypes);
router.post('/', controller.addMenu);
router.get('/:id', controller.getMenuById);
router.put('/:id', controller.updateMenu);
router.delete('/:id', controller.deleteMenu);

module.exports = router;