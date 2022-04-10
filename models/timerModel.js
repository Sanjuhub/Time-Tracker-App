const mongoose = require('mongoose');

const timerSchema = mongoose.Schema({
  name: { type: String, required: true },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'author',
    required: true,
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'task',
    required: true,
  },
});

module.exports = mongoose.model('timer', timerSchema);
