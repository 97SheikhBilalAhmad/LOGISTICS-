// index.js
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router');

dotenv.config();
const app = express();
app.use(express.json()); 
app.use(cors());
app.use(morgan('tiny'));

app.use(router);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database Connected.... "))
  .catch((err) => console.log(err));

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
