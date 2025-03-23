const { Sequelize } = require('sequelize');
require('dotenv').config();

//Initialize the Dataabase
const sequelize = new Sequelize(process.env.DATABASE_URL) 

//Database Connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database Connected Successfully'.green);
  } catch (error) {
    console.error('Unable to connect to the database:'.red, error);
  }
};

module.exports = { sequelize, connectDB };