
const jwt = require('jsonwebtoken');
require('dotenv').config();



const jwtVerify = (req,res,next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log(authHeader); //Bearer token
    if(!authHeader?.startsWith('Bearer ')) {
        res.sendStatus(401);
    }
    const token = authHeader.split(' ')[1];

    if(!token) return res.sendStatus(401);

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=> {
        if(err) return res.sendStatus(403); //Forbidden access
        req.user = decoded.UserInfo.username;
        req.roles = decoded.UserInfo.roles;
        next();
    })
}

module.exports = {jwtVerify};
