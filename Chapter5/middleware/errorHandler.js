const {logger} = require('./logEvent');

const errorHandler = (err, req, res, next) => {
    logger(`${err.name}:${err.message}`, 'errorLog.txt');
    console.log(err.stack);
    res.status(500).send("Internal server error");
    next();
}

module.exports = errorHandler;