const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const colors = require('colors');
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const {errorHandler} = require('./middleware/errorMiddleware');

const connectDb = require('./config/db');

// Connect to database
connectDb();


app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

app.get('/', (req, res) => {
  res.json({message: 'Welcome to the support desk API'});
});

//Routes
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);
