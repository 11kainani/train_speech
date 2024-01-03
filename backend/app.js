// app.js
const express = require('express');
const sequelize = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');

// models
const Subject = require('./models/subject'); 



//Middlewares
const logRequests= require('./middlewares/logger');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.DB_PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});



// Routes
const subjectRoutes = require('./routes/subject_routes')


/////////////
app.use(express.json());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));// Use body-parser for JSON requests
app.use(logRequests);
/////////////
app.use('/subject',subjectRoutes)



app.listen(port, () => {
  console.log(`Server listening at port : ${port}`);
});
