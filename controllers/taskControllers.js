const TaskModel = require('../models/taskModel');
const TimerModel = require('../models/timerModel');
const mongoose = require('mongoose');

async function createTask(req, res) {
  const { name, description } = req.body;

  try {
    const newTask = new TaskModel({
      name,
      description,
    });

    const savedTask = await newTask.save();
    return res.json(savedTask);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function updateTask(req, res) {
  const { name, description } = req.body;
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(422).json('Invalid task Id');
  }

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      {
        _id: taskId,
      },
      { description, name },
      { new: true }
    );

    return res.json(updatedTask);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function getTask(req, res) {
  try {
    const taskData = await TaskModel.find({});
    return res.json(taskData);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
async function deleteTask(req, res) {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(422).json({ message: 'Invalid task Id' });
  }

  const existingTask = await TaskModel.findById({
    _id: taskId,
  });

  if (!existingTask) {
    return res.status(404).json('Task not found with the given id');
  }

  const timerEx = await TimerModel.findOne({ taskId });
  if (timerEx) {
    return res.json('Task associated with timer, not allowed to delete.');
  }

  TaskModel.findOneAndDelete({ _id: taskId }, (err, doc) => {
    if (err) {
      return res.json(err);
    }
    return res.json({ message: 'task deleted successfully' });
  });
}

module.exports = { getTask, createTask, updateTask, deleteTask };
