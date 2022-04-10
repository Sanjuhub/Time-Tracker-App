const { Router } = require('express');

const router = Router();

const {
  createTimer,
  getTimer,
  updateTime,
  deleteTimer,
} = require('../controllers/timerController');

router.post('/v1/timer', createTimer);
router.get('/v1/timer', getTimer);
router.put('/v1/timer/:timerId', updateTime);
router.delete('/v1/timer/:timerId', deleteTimer);

module.exports = router;
