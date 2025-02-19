//Stream is a function of fs which is suitable for reading and writing large datasets or files
//it requires less resources(memory) as it does not read/write the file at once (which is the case in readFile)

const fs = require('fs');   // do not use promise
const path = require('path');
const rs = fs.createReadStream(path.join(__dirname, 'large_file.txt'), {encoding: 'utf8'});
const ws = fs.createWriteStream(path.join(__dirname, 'new_large.txt'), {encoding: 'utf8'});

// rs.on('data', (dataChunck)=> {
//     ws.write(dataChunck)
// })

rs.pipe(ws); // preferred (functionality same as previous lines of code)

