const {User} = require('../model/User');

const logoutHandle = async (req,res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt;
    
    const verifiedUser = await User.findOne({refreshToken: refreshToken}).exec();
    //is refreshToken in db?
    if(!verifiedUser) {
        res.clearCookie('jwt',{httpOnly: true, maxAge:24*60*60*1000});
        res.sendStatus(204);
    }

    //Delete the refreshToken
    verifiedUser.refreshToken = '';
    await verifiedUser.save();

    res.clearCookie('jwt', {httpOnly:true, maxAge: 24*60*60*1000});
    res.sendStatus(204);
   
}

module.exports = {logoutHandle};