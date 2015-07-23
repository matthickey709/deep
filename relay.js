/******** Constants ************/
var MASTER_URL= process.env.MASTER_IP ? "http://" + process.env.MASTER_IP + ":8000" : "http://localhost:8000";

/******** Dependencies ************/
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override');
var http = require('http');
var socketIo = require('socket.io');
var socketIoClient = require('socket.io-client');
var mongoose = require('mongoose');

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

var master = socketIoClient(MASTER_URL);

/******** Database Configuration  **********/
require('./models/message')
var Message = mongoose.model('Message');
mongoose.connect('mongodb://localhost/deep')
/******** Run Server **********/

server.listen(port, function () {
      
      var host = server.address().address;
      
      console.log('Example app listening at http://%s:%s', host, port);
});


//Connection with Client
io.on('connection', function (socket) {

    // when the client emits 'new message', this listens and executes
    socket.on('new message', function (data) {
        var msg = {
                username: socket.username,
                body: data
            };
        
        //Save in database
        //Insert code here

        //Relay the new message to the master
        master.emit('new message', msg);
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (username) {
        // we store the username in the socket session for this client
        socket.username = username;

        //Reply to new user- return upto 10 most recent messages
        Message.find({}, {body: true, username: true})
            .sort({_id:-1}).limit(10)
            .exec(function(err, messageList){
                    if(!err)
                        socket.emit('welcome', {messages: messageList});
                });

        //Relay the 'add user' event to the master
        master.emit('add user', username);
    });
});

//Connection with Master
master.on('add user', function(data){
    console.log("Received 'add user' from master: " + data.username);
    //broadcast 'add user' event to all clients 
    io.sockets.emit('add user', data);
});

master.on('new message', function(data){
    //Save message in the database
    //Insert code here

    console.log("Received 'new message' from master: " + data.username + ": " + data.body);
    //broadcast 'new message' event to all clients 
    io.sockets.emit('new message', data);
});
