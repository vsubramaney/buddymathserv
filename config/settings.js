/**
 * Configuration settings
 */

module.exports = {
    development: {
        mongooseUri : '127.0.0.1:27017/Game',
        port : '3000'
    },
    production: {
        mongooseUri : 'mongodb://admin:BBn3FgnV6ys7@127.8.190.130:27017/buddymathserv',
        port : '3000'
    }
}
