const { Router } = require('express');
const controller = require('../controller/auth');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');


const router = Router();

router.post('/register', validInfo, controller.register);
router.post('/login', validInfo, controller.login);
router.get('/is-verify', authorization, controller.verify);
router.get('/verified', authorization, controller.verified);

module.exports = router;