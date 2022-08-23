const express = require('express');
const bodyParser = require('body-parser');
const ingController = require('../controllers/ingredients');

const router = express.Router();

router.get('/',ingController.getLoginRedirect);


module.exports = router;