const { Router } = require('express');

const router = Router();

// const { createAuthorValidation } = require('../middlewares/authorValidation');
const {
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskControllers');

router.get('/v1/task', getTask);
router.post('/v1/task', createTask);
router.put('/v1/task/:taskId', updateTask);
router.delete('/v1/task/:taskId', deleteTask);

module.exports = router;
