const { Router } = require('express');

const router = Router();

const { createTimer } = require('../controllers/timerController');

router.post('/v1/timer', createTimer);

module.exports = router;
