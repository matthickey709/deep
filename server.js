/******** Dependencies ************/
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override');

/******** Configuration  **********/
var app = express();

app.use(bodyParser.urlencoded({
        extended: true
    }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 3000;

/******** Run Server **********/
var server = app.listen(port, function () {
      
      var host = server.address().address;
      
      console.log('Example app listening at http://%s:%s', host, port);
});
