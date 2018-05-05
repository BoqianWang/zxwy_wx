var path = require('path');
module.exports = {
    dev: {
        outputPath: path.resolve(__dirname, '../static'),
        outputPublicPath: '/',
        port: 8080,
        host: '192.169.18.140'
    },
    prod: {
        outputPath: path.resolve(__dirname, '../static'),
        outputPublicPath: 'static/'
    }
}
