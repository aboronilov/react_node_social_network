const express = require('express');
const app = express();
const dotenv = require('dotenv');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const cors = require('cors');

dotenv.config();
mongoose.connect(process.env.MONGO_URL, (err) => {
    if (err) {
        console.log(err)
    }
    console.log('Connected to Mongo DB')
});
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors(corsOptions));


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});