// app.js
const express = require('express');
const sequelize = require('./config');
const bodyParser = require('body-parser');


// IMPLEMET CORS !!!! ADD LIMITER FOR API USAGE
//const cors = require('cors');

//Middlewares
const logRequests= require('./middlewares/logger');
const apiKeyRequests = require('./middlewares/apiKeyMiddleware');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.DB_PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});



// Routes
const subjectRoutes = require('./routes/subject_routes');
const answerRoutes = require('./routes/answer_routes');
const commentRoutes = require('./routes/commnet_routes');


/////////////
app.use(express.json());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));// Use body-parser for JSON requests
app.use(logRequests);
app.use(apiKeyRequests);
/////////////
app.use('/subjects',subjectRoutes);
app.use('/answers', answerRoutes);
app.use('/comments', commentRoutes);




const server = app.listen(port, () => {
  console.log(`Server listening at port : ${port}`);
});


module.exports = { app, server };