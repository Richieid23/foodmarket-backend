const { Router } = require('express');
const controller = require('../controller/order');

const router = Router();

router.post('/', controller.addOrder);

module.exports = router;