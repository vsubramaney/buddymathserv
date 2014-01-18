
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
var settings = require('./config/settings')[env];

// Bootstrap db connection
mongoose.connect(settings.mongooseUri)

// Bootstrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf('.js')) require(models_path + '/' + file)
})

// all environments
app.set('port', settings.port);
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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
