const TaskModel = require('../models/taskModel');
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
async function deleteTask(req, res) {}

module.exports = { getTask, createTask, updateTask, deleteTask };
