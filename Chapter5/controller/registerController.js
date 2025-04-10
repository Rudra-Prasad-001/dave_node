const path = require('path');
const fsPromise = require('fs').promises;
const bcrypt = require('bcrypt');

const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
};

const handelNewUser = async (req,res) => {
    const {username, pwd} = req.body;
    if(!username || !pwd) {
        res.status(400).json({message: `Can't create the user Please check username:${username}
        password:${pwd}`});
    }else {
       const duplicate = userDB.users.find(person => person.username === username);

       if(duplicate){
        //conflict
        res.status(409).json({message:`${username} already exist please choose other username`});
       } else {
        try{
            //10 is default standard salt
            const hasedPwd = await bcrypt.hash(pwd,10);
            const newUser = {
             'username': username,
             'roles': req.body.roles,
             'password': hasedPwd
            }
            userDB.setUsers([...userDB.users, newUser]);
            await fsPromise.writeFile(path.join(__dirname,'..','model', 'users.json'), JSON.stringify(userDB.users,null,2));
            res.status(201).json({user: `${username} created`});
            console.log(newUser);
    
           } catch(err) {
             res.status(500).json({message:`${err.message}`});
           }
        }
    }
       
}

module.exports = {handelNewUser};