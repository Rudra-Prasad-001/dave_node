const logger = require('./logEvent');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const http = require('http');

const Event = require('events');

//Create an event class

class Emitter extends Event {};

//Initialize the object

const myEmitter = new Emitter();

myEmitter.on('log', (msg,fileName)=> logger(msg,fileName));

PORT = process.env.PORT || 3800;

//Function to serve files

const serveFile = async (filePath, ContentType, response) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath, 
            !ContentType.includes('image') ? 'utf8' : ''
        );
        const data = ContentType === 'application/json' 
            ? JSON.parse(rawData) : rawData;

        // Corrected header name here 👇
        response.writeHead(200, { 'Content-Type': ContentType });
        response.end(
            ContentType === 'application/json' 
                ? JSON.stringify(data) 
                : data
        );
    } catch (err) {
        myEmitter.emit('log', `${err.name}:${err.message}`, 'errorLog.txt');
        console.error(err);
        response.statusCode = 404;
        response.end();
        
    }
};

const server = http.createServer((req,res) => { 
    console.log(req.url, req.method);
    myEmitter.emit('log', `${req.url}\t${req.method}`,'reqLog.txt');

    // res.writeHead(200, "I am live!");
    // res.end("ok");
    // if(req.url == '/') {
    //     res.statusCode = 200
    //     res.setHeader('Content-type', 'text/html');
    //     let filePath = path.join(__dirname,'views', 'index.html');
    //     fs.readFile(filePath, 'utf8', (err,data) => {
    //         res.end(data);
    //     });
    // }

    let extention = path.extname(req.url);
    let ContentType

    switch(extention) {
        case '.png':
            ContentType = 'image/png';
            break;
        case '.css':
            ContentType = 'text/css';
            break;
        case '.js':
            ContentType = 'text/javascript';
            break;
        case '.json':
            ContentType = 'application/json';
            break;
        case '.jpg':
        case '.jpeg':
            ContentType = 'image/jpeg';
            break;
        case '.txt':
            ContentType = 'text/plain';
            break;
        default:
            ContentType = 'text/html';
    }

    let filePath = 
                ContentType === 'text/html' && req.url === '/'
                   ? (path.join(__dirname, 'views' , 'index.html'))
                    : ContentType === 'text/html' && req.url.slice(-1) === '/'
                     ?(path.join(__dirname, 'views', req.url , 'index.html'))
                      : ContentType === 'text/html'
                       ? (path.join(__dirname, 'views', req.url))
                         : (path.join(__dirname, req.url))




    if(!extention && req.url.slice(-1) != '/') {
        filePath += '.html';
    }
    //Return boolean
    const fileExist = fs.existsSync(filePath);

    if(fileExist) {
        //Serve The file
        serveFile(filePath, ContentType, res);
    }
    else {
        //301 redirect
        if(path.parse(filePath).base === 'old-page.html') {
            res.writeHead(301, {'Location': '/new-page.html'});
            res.end();
        }
        else if(path.parse(filePath).base === 'www-page.html') {
            res.writeHead(301, {'Location' : '/'});
            res.end();
        }
        else {
            //404 file not found
            serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res)
        }
    }
});

server.listen(PORT, () => console.log(`Server is listining on PORT ${PORT}`));

