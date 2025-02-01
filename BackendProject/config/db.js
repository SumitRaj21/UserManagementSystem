const mysql=require("mysql2");
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('user_management', 'root', 'root123', {
    host: 'localhost',
    dialect: 'mysql',
    logging:false
  })

  module.exports = sequelize;