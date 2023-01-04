const path = require('path');
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
app.use('/api/tickets', require('./routes/ticketRoutes'));

// Serve Frontend
if(process.env.NODE_ENV === 'production'){
  //set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req,res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else {
  app.get('/', (req, res) => {
    res.json({message: 'Welcome to the support desk API'});
  });
}

app.use(errorHandler);
