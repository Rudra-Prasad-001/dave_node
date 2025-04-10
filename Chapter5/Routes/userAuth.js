const express = require('express');
const { userLogin } = require('../controller/authController');
const router = express.Router();


router.post('/',userLogin);


module.exports = router;