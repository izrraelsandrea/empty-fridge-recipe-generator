const {Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const Ingredient = sequelize.define('ingredient', { 
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    description: { 
    type: Sequelize.STRING,
    allowNull: false
    }
});

module.exports = Ingredient;