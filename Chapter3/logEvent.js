const {format} = require('date-fns');
const {v4:uuid} = require('uuid');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logger = async(msg) => {
    const dateTime = format(new Date(), "dd/MM/yyyy\tHH:mm:ss");
    const logItem = `${dateTime}\t${uuid()}\t${msg}\n`
    
    try {
        if(!fs.existsSync(path.join(__dirname, 'log'))){
            await fsPromises.mkdir(path.join(__dirname, 'log'));
        }
        await fsPromises.appendFile(path.join(__dirname, 'log', 'log.txt'), logItem ,'utf8');
    } catch(err){
        console.error(err)
    }
}

module.exports = logger;

