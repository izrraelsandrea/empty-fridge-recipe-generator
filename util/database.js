const {Sequelize, Model, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.DBNAME,process.env.USERNAME,process.env.PASS,{ 
    dialect: 'mysql',
    host: 'sql8.freemysqlhosting.net'
});
module.exports = sequelize;
