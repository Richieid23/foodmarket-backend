const { Router } = require('express');
const controller = require('../controller/order');
const authorization = require('../middleware/authorization')

const router = Router();

router.put('/:id', authorization, controller.updateOrder);
router.get("/user", authorization, controller.getUserOrder);
router.get("/", authorization, controller.getOrders);
router.post('/checkout', authorization, controller.addOrder);

module.exports = router;