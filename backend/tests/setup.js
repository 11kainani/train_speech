const sequelize = require("../config")
const { server } = require('../app');

const dotenv = require('dotenv');
dotenv.config();  




afterAll(async () => {

    server.close();
    await sequelize.close();
  });