/******** Dependencies ************/
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override');
var http = require('http');
var socketIo = require('socket.io');
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

/******** Database Configuration  **********/
require('./models/message')
var Message = mongoose.model('Message');
mongoose.connect('mongodb://localhost/deep')

/******** Run Server **********/
server.listen(port, function () {
      var host = server.address().address;
      console.log('Example app listening at http://%s:%s', host, port);
});


var userlist = {};

//Chat room
io.on('connection', function (socket) {

    // when the client emits 'new message', this listens and executes
    socket.on('new message', function (data) {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
            username: socket.username,
            body: data
        });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (username) {
        
        if(username){
            //Store the username
            socket.username = username;
            //Tell everyone a new user connected
            socket.broadcast.emit('add user', {
                username: socket.username,
            });
            userlist[username] = username;
            
            //Message.find({}, {body: true, username: true})
            //.sort({_id:-1}).limit(10)
            //.exec(function(err, messageList){
            Message.find({})
            .exec(function(err, messages){
                    if(!err)
                        io.sockets.emit('welcome', 
                        {messages: messages, userlist: userlist});
                });
            
            //Reply to the new joiner with the list of users
            //socket.emit('welcome', {userlist:userlist, messages:[]});
        }
    });


});

