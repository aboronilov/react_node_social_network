const express = require('express');
const app = express();
const dotenv = require('dotenv');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');

dotenv.config();
mongoose.connect(process.env.MONGO_URL, () => {
    console.log('Connected to Mongo DB')
});

app.listen(3000, () => {
    console.log('The server is running on 3000 port')
})