
const {User} = require('../model/User');
const bcrypt = require('bcrypt');


const handelNewUser = async (req,res) => {
    const {username, pwd} = req.body;
    if(!username || !pwd) {
        res.status(400).json({message: `Can't create the user Please check username:${username}
        password:${pwd}`});
    }else {
       const duplicate = await User.findOne({username: username}).exec();

       if(duplicate){
        //conflict
        res.status(409).json({message:`${username} already exist please choose other username`});
       } else {
        try{
            //10 is default standard salt
            const hasedPwd = await bcrypt.hash(pwd,10);
            const result = await User.create({
             'username': username,
             'password': hasedPwd
            })

            res.status(201).json({user: `${username} created`});
            console.log(result);
    
           } catch(err) {
             res.status(500).json({message:`${err.message}`});
           }
        }
    }
       
}

module.exports = {handelNewUser};