const express = require('express');
const { handelNewUser } = require('../controller/registerController');
const router = express.Router();


router.post('/',handelNewUser);


module.exports = router;