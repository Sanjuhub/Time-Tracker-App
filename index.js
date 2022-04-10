const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();
const app = express();

const authorRoutes = require('./routes/authorRoutes');
const taskRoutes = require('./routes/taskRoutes');
const timerRoutes = require('./routes/timerRoutes');

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

const corsOptions = {
  origin: true,
  credentials: true,
  ///..other options
};

app.get('/', (req, res) => {
  res.send('Up and running.');
});

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(authorRoutes);
app.use(taskRoutes);
app.use(timerRoutes);

app.listen(process.env.PORT);
