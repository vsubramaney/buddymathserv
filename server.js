/**
 * Created by vsubramaney on 1/21/14.
 */

/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');
var app = express();
var env = app.get('env');
var settings = require('./config/settings')['production'];

var dbOptions = {
    server:{
        'auto_reconnect': true,
        'poolSize': 20,
        socketOptions: {keepAlive: 1}
    }
}

// Bootstrap db connection
mongoose.connect(settings.mongooseUri, dbOptions, function(err, db) {
    if (err) {
        console.log(err);
    }
})

// Bootstrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf('.js')) require(models_path + '/' + file)
})

// all environments
//app.set('port', settings.port);
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser())
app.use(express.bodyParser())

// development only
if ('development' == env) {
    app.use(express.errorHandler());
}

// rout the request to appropriate controller from routes.js
require('./router/routes')(app)

console.log(env);

var server = http.createServer(app);
server.listen(process.env.OPENSHIFT_NODEJS_PORT || 3000, process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1", function(){
    console.log('Express server listening on port 3000');
});
