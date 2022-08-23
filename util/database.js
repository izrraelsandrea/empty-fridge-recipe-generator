const {Sequelize, Model, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.DBNAME,process.env.USERNAME,process.env.PASS,{ 
    dialect: 'mysql',
    host: 'sql8.freemysqlhosting.net'
});
module.exports = sequelize;

// Server: sql8.freemysqlhosting.net
// Name: sql8514064
// Username: sql8514064
// Password: DAUni9n7Vb

// DBNAME="recipes"
// USERNAME="root"
// PASS="MaxNode09"