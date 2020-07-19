var express = require('express');
var app = express();
var router = express.Router();
var upload = require('./app/config/multer.config.js');
 
global.__basedir = __dirname;

app.use(express.static('resources'));

require('./app/routers/file.router.js')(app, router, upload);
 
// Create a Server
var server = app.listen(8081, () => {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port); 
})