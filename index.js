require('dotenv-safe').config();
const bodyParser = require('body-parser')
const express = require('express');
const router = require('./routes/routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

app.listen(port, () => {
  try {
    console.log(`Server running on port ${port}`);
  } catch (e) {
    console.log(`Unexpected error. Log: ${e}`);
  };
});