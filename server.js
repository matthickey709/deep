/******** Dependencies ************/
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override');
var http = require('http');
var socketIo = require('socket.io');

/******** Configuration  **********/
var app = express();

app.use(bodyParser.urlencoded({
        extended: true
    }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app);
var io = socketIo(server);

var port = process.env.PORT || 3000;

/******** Run Server **********/

server.listen(port, function () {
      
      var host = server.address().address;
      
      console.log('Example app listening at http://%s:%s', host, port);
});


//Chat room
io.on('connection', function (socket) {

    //Add event for when 'new message' received
    //Similar to 'add user' event
    //Insert code here

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (username) {
        // we store the username in the socket session for this client
        socket.username = username;
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('add user', {
            username: socket.username,
        });
    });


});

