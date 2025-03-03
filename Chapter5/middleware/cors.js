const whitelist = ['http://localhost:3500']

const originOption = {
    origin: (origin, callback) => {
        //allow only whitelist and undefined
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error(`${origin} is not allowed by CORS`), false);
        }
    }
}

module.exports = originOption