const express = require('express');
const bodyParser = require('body-parser');
const ingController = require('../controllers/ingredients');

const router = express.Router();

router.get('/ingredients',ingController.getIngredients);

module.exports = router;