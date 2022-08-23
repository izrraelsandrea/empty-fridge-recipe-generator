const express = require('express');
const bodyParser = require('body-parser');
const ingController = require('../controllers/ingredients');

const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));

router.get('/delete',ingController.getDeleteIngredients);

router.get('/ingredients',ingController.getIngredients);

router.post('/add-ingredients',ingController.postIngredients);

router.post('/login',ingController.postLogin);

router.get('/login',ingController.getLogin);

router.post('/generate',ingController.postGenerator);



module.exports = router;