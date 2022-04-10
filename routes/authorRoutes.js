const { Router } = require('express');

const router = Router();

const { createAuthorValidation } = require('../middlewares/authorValidation');
const {
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require('../controllers/authorController');

router.get('/v1/author', getAuthor);
router.post('/v1/author', createAuthorValidation, createAuthor);
router.put('/v1/author/:authorId', updateAuthor);
router.delete('/v1/author/:authorId', deleteAuthor);

module.exports = router;
