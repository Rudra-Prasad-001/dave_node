const express = require('express');
const path = require('path');

const app = express();

const PORT = 3500 || process.env.PORT ;

app.get('^/$|index(.html)?', (req,res)=> {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/old-page(.html)?', (req,res)=> {
    res.redirect(301,path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/new-page(.html)?', (req,res)=> {
    // res.sendFile('./views/new-page.html', {root: __dirname});   //not suitable but works
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/image/img1.jpg', (req,res)=> {
    res.sendFile(path.join(__dirname, 'image', 'img1.jpg'));
});

// app.get('^/*', (req,res,next) => {
//     console.log('hey');
//     next();
// }, (req,res,next) => {
//     console.log('hmm');
//     next();
// }, (req,res,next) => {
//     res.send('got it!');
// }
// )

//Below code is more frequently used(like a middleware)
// const one = (req,res,next) => {
//     console.log('one');
//     next();
// }

// const two = (req, res, next) => {
//     console.log('two');
//     next();
// }

// const three = (req,res) => {
//     console.log('three! final');
// }

// app.get('/fall', [two,one,two,three,one]);

app.get('/subdir/index(.html)?', (req,res)=> {
    res.sendFile(path.join(__dirname, 'views', 'subdir', 'index.html'));
});

app.get('/subdir/test(.html)?', (req,res)=> {
    res.sendFile(path.join(__dirname, 'views', 'subdir', 'test.html'));
});

app.get('/*', (req,res)=> {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Server is listining on ${PORT}`);
})