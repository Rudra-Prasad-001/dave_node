const logger = require('./logEvent');

const Event = require('events');

//Create an event class

class MyEmitter extends Event {};

//Initialize the object

const myEmitter = new MyEmitter();

//Add event listener

myEmitter.on('log', (msg) => logger(msg));

//Emit the event
setTimeout(()=>
    {
        myEmitter.emit('log', 'First event emmited');
    },5000)


setTimeout(()=> {
    myEmitter.emit('log', 'second event emmited');
},6000)



