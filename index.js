const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const app = express();

const authorRoutes = require('./routes/authorRoutes');
const taskRoutes = require('./routes/taskRoutes');

//MongoDb connection
try {
  mongoose.connect(process.env.LOCAL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (err) {
  console.log(err.message);
}

mongoose.connection
  .once('open', () => {
    console.log('database connected');
  })
  .on('disconnected', () => {
    console.log('database disconnected');
  });

app.get('/', (req, res) => {
  res.send('Up and running.');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(authorRoutes);
app.use(taskRoutes);

app.listen(process.env.PORT);