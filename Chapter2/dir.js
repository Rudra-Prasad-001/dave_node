//create a dir if it does not exist and remove it if it exist

const fs = require('fs')

if(fs.existsSync('./exp_dir')) {  //check if exp_dir exist
   fs.rmdir('./exp_dir', (err) => {
    if (err) throw err;
    console.log('Directory removed');
   });
}

if(!fs.existsSync('./exp_dir')) {
    fs.mkdir('./exp_dir', (err)=> {
        if(err) throw err;
        console.log('Directory Created');
    });
}