const {Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const Users = sequelize.define('user', { 
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    username: { 
    type: Sequelize.STRING,
    allowNull: false
    }
});

module.exports = Users;