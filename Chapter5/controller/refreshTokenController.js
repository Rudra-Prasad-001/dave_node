const jwt = require('jsonwebtoken');
const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
};
require('dotenv').config();

const refreshTokenHandle = (req,res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    if(!refreshToken) return res.sendStatus(401);
    const verifiedUser = userDB.users.find(person => person.refreshToken === refreshToken);
    const roles = Object.values(verifiedUser.roles)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,decoded)=> {
        if(err || verifiedUser.username !== decoded.username) return res.sendStatus(403);
        const accessToken = jwt.sign(
            {
                'UserInfo':{
                    "username":decoded.username,
                    "roles":roles
            }
        }, 
            process.env.ACCESS_TOKEN_SECRET, {expiresIn: '60s'});
        res.json({accessToken});
    })
}

module.exports = {refreshTokenHandle};