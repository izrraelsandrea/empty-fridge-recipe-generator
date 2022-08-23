const express = require('express');
const bodyParser = require('body-parser');
const ingController = require('../controllers/ingredients');
const { READUNCOMMITTED } = require('sequelize/types/table-hints');

const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));

router.get('/delete',ingController.getDeleteIngredients);

router.get('/ingredients',ingController.getIngredients);

router.post('/add-ingredients',ingController.postIngredients);

router.post('/login',ingController.postLogin);

router.get('/login',ingController.getLogin);

router.post('/generate',ingController.postGenerator);

router.get('/',ingController.getLoginRedirect);



module.exports = router;