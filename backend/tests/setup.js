const sequelize = require("../config")
const { server } = require('../app');

const dotenv = require('dotenv');
dotenv.config();  


beforeAll(async () => {
    await sequelize.sync({ force: true }); // Reset the database before all tests
  });
  

afterAll(async () => {

    server.close();
    await sequelize.close();
  });