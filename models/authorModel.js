const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('author', authorSchema);
