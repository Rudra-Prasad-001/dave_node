const express = require('express');
const path = require('path');
const router = express.Router();


router.get('^/$|index(.html)?', (req,res)=> {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.get('/old-page(.html)?', (req,res)=> {
    res.redirect(301,path.join(__dirname, '..' , 'views', 'new-page.html'));
});

router.get('/new-page(.html)?', (req,res)=> {
    // res.sendFile('./views/new-page.html', {root: __dirname});   //not suitable but works
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
});

module.exports = router;