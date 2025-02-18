//File name and path

console.log(__filename);  // /home/legend/dave_node/index.js
console.log(__dirname);  // /home/legend/dave_node

//Import path module (built-in node module) using common js

const path=require('path');
console.log(path.dirname(__filename)); // /home/legend/dave_node
console.log(path.basename(__filename)); // index.js
console.log(path.extname(__filename)); //.js
console.log(path.parse(__filename));

//Import os module (built-in node module)using common js
const os=require('os');
console.log(os.version());
console.log(os.type());
console.log(os.userInfo());
console.log(os.uptime()); //In seconds (precision upto mili seconds)

//local module import using common js
const {add,multiply} =require('./operator')
console.log(add(5,6)); // 11
console.log(multiply(3,4)); // 12
// console.log(divide(12,6)); //Will give error since divide is not exported 


