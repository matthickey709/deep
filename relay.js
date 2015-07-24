/******** Constants ************/
var MASTER_URL= "http://localhost:8000";
//var MASTER_URL= "http://142.150.208.248:8000";
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

//There should only be one client
var clientExists = false; 

//Connection with Client
io.on('connection', function (socket) {

    // when the client emits 'new message', this listens and executes
    socket.on('new message', function (data) {
        var msg = {
                username: socket.username,
                body: data
            };
        
        //Save in database
        var message = new Message(msg);
        message.save();

        //Relay the new message to the master
        master.emit('new message', msg);
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (username) {
        console.log("Received 'add user' event from client. username is " + username); 
        //Only allow one client per server
        
        if(clientExists){
            socket.emit('bye', {});
        }else if(username){
            socket.username = username;
            clientExists = true;
            //Relay the 'add user' event to the master
            master.emit('add user', username);
        }
    });

    socket.on('disconnect', function(){
        clientExists = false;
        console.log("Received 'disconnect' event from client");
        master.emit('remove user', {username: socket.username});   
    });
});


//Events sent by Master
master.on('welcome', function(data){
    console.log("Received 'welcome' from master");
    Message.find({}, {body: true, username: true})
        .sort({_id:-1}).limit(10)
        .exec(function(err, messageList){
                if(!err)
                    io.sockets.emit('welcome', 
                    {messages: messageList, userlist: data.userlist});
            });

});

master.on('add user', function(data){
    console.log("Received 'add user' from master: " + data.username);
    //broadcast 'add user' event to all clients 
    io.sockets.emit('add user', data);
});

master.on('new message', function(data){
    //Save message in the database
    var message = new Message(data);
    message.save();
    
    console.log("Received 'new message' from master: " + data.username + ": " + data.body);
    //broadcast 'new message' event to all clients 
    io.sockets.emit('new message', data);
});

master.on('remove user', function(data){
    io.sockets.emit('remove user', data);
});
