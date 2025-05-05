
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../model/User');

const userLogin = async (req,res) => {
    const {username,pwd} = req.body;
    const verifiedUser = await User.findOne({username: username});
    if(verifiedUser) {
        //match password
        const verifiedPwd = verifiedUser.password;
        const match = await bcrypt.compare(pwd,verifiedPwd);
    
        if(match) {
            const roles = Object.values(verifiedUser.roles);
            const accessToken = jwt.sign(
                {
                    UserInfo:{
                        "username": verifiedUser.username,
                        'roles': roles
                    }
                },
                
                process.env.ACCESS_TOKEN_SECRET,{expiresIn: '60s'});
            const refreshToken = jwt.sign({username: verifiedUser.username},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1d'});
            //Save the Refresh Token in the Users DB
            verifiedUser.refreshToken = refreshToken;
            await verifiedUser.save();
            res.cookie('jwt', refreshToken, {httpOnly:true,maxAge: 24*60*60*1000});
            res.status(200).json({accessToken});
        } else {
            //unauthorised access
            res.status(401).json({mesaage:`incorrect password`});
        }
    }else {
        res.status(401).json({message:`${username} does not exist in our data base`});
    }
}


module.exports = {userLogin};