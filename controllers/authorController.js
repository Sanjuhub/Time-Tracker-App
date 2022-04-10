const AuthorModel = require('../models/authorModel');
const mongoose = require('mongoose');

async function getAuthor(req, res) {
  try {
    const authorData = await AuthorModel.find({});
    return res.json(authorData);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function createAuthor(req, res) {
  const { name, email } = req.body;

  try {
    const isExist = await AuthorModel.findOne({ email });
    if (isExist) {
      return res.status(422).json({
        message: 'email already exists',
      });
    }

    const newAuthor = new AuthorModel({
      name,
      email,
    });

    const savedAuthor = await newAuthor.save();
    return res.json(savedAuthor);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function updateAuthor(req, res) {
  const { name, email } = req.body;
  const { authorId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(authorId)) {
    return res.status(422).json('Invalid author Id');
  }

  try {
    if (email) {
      const isExist = await AuthorModel.findOne({ email });
      if (isExist && isExist._id.toString() !== authorId) {
        return res.status(422).json({
          message: 'email already exists',
        });
      }
    }

    const updatedAuthor = await AuthorModel.findByIdAndUpdate(
      {
        _id: authorId,
      },
      { email, name },
      { new: true }
    );

    return res.json(updatedAuthor);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function deleteAuthor(req, res) {}

module.exports = { getAuthor, createAuthor, updateAuthor, deleteAuthor };
