
const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
};

const path = require('path');
const fsPromises = require('fs').promises;



const logoutHandle = async (req,res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt;
    
    const verifiedUser = userDB.users.find(person => person.refreshToken === refreshToken);
    //is rrefreshToken in db?
    if(!verifiedUser) {
        res.clearCookie('jwt',{httpOnly: true, maxAge:24*60*60*1000});
        res.sendStatus(204);
    }

    //Delete the refreshToken
    const otherUsers = userDB.users.filter((person)=> person.refreshToken !== refreshToken);
    const currentUser = {...verifiedUser, refreshToken: ''};
    userDB.setUsers([...otherUsers,currentUser])
    await fsPromises.writeFile(path.join(__dirname,'..','model','users.json'), JSON.stringify(userDB.users));

    res.clearCookie('jwt', {httpOnly:true, maxAge: 24*60*60*1000});
    res.sendStatus(204);
   
}

module.exports = {logoutHandle};