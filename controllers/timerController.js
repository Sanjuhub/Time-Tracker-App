const TimerModel = require('../models/timerModel');
const TaskModel = require('../models/taskModel');
const AuthorModel = require('../models/authorModel');
const mongoose = require('mongoose');

async function createTimer(req, res) {
  const { name, authorId, taskId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(422).json('Invalid task Id');
  }

  if (!mongoose.Types.ObjectId.isValid(authorId)) {
    return res.status(422).json('Invalid author Id');
  }

  try {
    const existingAuthor = await AuthorModel.findById({ _id: authorId });

    if (!existingAuthor) {
      return res.status(404).json('Author not found');
    }
    const existingTask = await TaskModel.findById({ _id: taskId });

    if (!existingTask) {
      return res.status(404).json('Task not found');
    }

    const newTimer = new TimerModel({
      name,
      taskId,
      authorId,
    });

    const savedTimer = await newTimer.save();
    return res.json(savedTimer);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = { createTimer };
