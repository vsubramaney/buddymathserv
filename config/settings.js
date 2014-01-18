/**
 * Configuration settings
 */

module.exports = {
    development: {
        mongooseUri : '127.0.0.1:27017/Game',
        port : '3000'
    },
    production: {
        mongooseUri : '',
        port : ''
    }
}
