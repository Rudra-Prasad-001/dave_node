const express = require('express');
const path = require('path');
const cors = require('cors');
const originOption = require('./middleware/cors');
const {logEvent} = require('./middleware/logEvent');
const errorHandler = require('./middleware/errorHandler');
const {jwtVerify} = require('./middleware/jwtVerify');
const cookieParser = require('cookie-parser');


const app = express();


const PORT = process.env.PORT || 3500;

//middleware (something that is in between req and res)

//builtin middleware
//serve all the static files like image, css ,txt which are in the public folder
app.use(express.static('public'));
app.use('/subdir', express.static('public'));
//use to handel form data
app.use(express.urlencoded({extended : false}));

app.use(express.json());

//use to parse cookie data
app.use(cookieParser());

//Custom middleware (user defined)

// app.use('/',(req,res,next)=> {
//     console.log('hey ya');
//     next();
// });

app.use(logEvent);

app.get('/test-error', (req,res,next)=> {
    const error = new Error('Intentional error')
    next(error);
})


//Third party middleware

//use cors for all routes
// app.use(cors());

//allow only whitelist domains to access your data


app.use(cors(originOption));

app.use('/', require('./Routes/root'));
app.use('/subdir',require('./Routes/subdir'));
app.use('/register',require('./Routes/userRegister'));
app.use('/auth',require('./Routes/userAuth'));
app.use('/refresh',require('./Routes/refreshToken'));
app.use('/logout',require('./Routes/logout'));

app.use(jwtVerify);
app.use('/employees(.js)?', require('./Routes/api/employees'));





// app.get('/image/img1.jpg', (req,res)=> {
//     res.sendFile(path.join(__dirname, 'image', 'img1.jpg'));
// });

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


// app.get('/*', (req,res)=> {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });


app.all('*', (req,res)=> {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

//always use error handlers at the end

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is listining on ${PORT}`);
})