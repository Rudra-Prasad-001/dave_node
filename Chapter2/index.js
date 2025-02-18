//Use fs (file-system is a built-in node module) using common js
const fs=require('fs');
const path=require('path');
const { toNamespacedPath } = require('path/win32');

fs.writeFile(path.join(__dirname, 'test_write.txt'), "Hey I am written programatically!" , (error) => {
    if(error) {
        console.log('error occured while writing the file!');
    }
});

//Use readFile (async function)

fs.readFile(path.join(__dirname, 'test_write.txt'), 'utf8', (error,data)=> {  //By default encoding is buffer
    if(error) throw error;
    else {
        console.log(data);
    }
    fs.appendFile(path.join(__dirname, 'test_write.txt') , `\n\n I will be appended in a new line!` , 'utf8', (error)=> {
        if(error) throw error;
        fs.rename(path.join(__dirname, 'test_write.txt'), path.join(__dirname, 'updated_test_file.txt'), (err)=> {
            if (error) throw error;
            else {
                /*This will control the flow like first read, then append and finnaly rename the file but this
                will create the Call Back Hell(like this) */
                console.log("Rename success");
            }
        })
    })
});

console.log('hello'); // This will print first (proabaly) due to async nature of readFile
