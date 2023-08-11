const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./api/routes/routes');

const app = express();
require('dotenv').config();

mongoose.set('strictQuery', false);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true })
  .then(console.log('Connected'))
  .catch((err) => {
    console.log('---------------');
    console.log(err);
    console.log('---------------');
  });

app.use(routes);

app.listen(3000);
