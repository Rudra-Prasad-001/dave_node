const router = require('express').Router();
const path = require('path');

router.get('^/$|index(.html)?', (req,res)=> {
    res.sendFile(path.join(__dirname, '..', 'views' , 'subdir', 'index.html'));
});

router.get('/test(.html)?', (req,res)=> {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'));
})

router.all('*' , (req,res)=> {
    res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'));
})


module.exports = router;