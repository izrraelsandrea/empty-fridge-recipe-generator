const express = require('express');
const path = require('path');
const ingRoutes = require('./routes/ingredients');

const app = express();

//Setting default setups
app.set('view engine', 'ejs');
app.set('views','views');
app.use(express.static(path.join(__dirname,'public')));

//Routes definitios
app.use('/recipes',ingRoutes);


app.listen(3200);