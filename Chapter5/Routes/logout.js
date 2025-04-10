const express = require('express');
const logoutController = require('../controller/logoutController');
const router = express.Router();


router.get('/',logoutController.logoutHandle);


module.exports = router;