const express = require('express');
const path = require('path');
const ingRoutes = require('./routes/ingredients');
const sequelize = require('./util/database');
const ingredients = require('./controllers/ingredients');
const Ingredient = require('./models/ingredients');
const User = require('./models/users');

const app = express();

//Setting default setups
app.set('view engine', 'ejs');
app.set('views','views');
app.use(express.static(path.join(__dirname,'public')));

//Routes definitions
app.use('/recipes',ingRoutes);

//Associations
User.hasMany(Ingredient);
Ingredient.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});


sequelize.sync()
.then(connect =>{
app.listen(3200);
})
.catch(err =>console.log(err));
