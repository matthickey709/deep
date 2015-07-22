//Master Server
var server = require('http').createServer();
var io = require('socket.io')(server);
var port = process.env.PORT || 8000;

server.listen(port, function (){
    console.log("MASTER server listening on port %d", port);
});

io.on('connection', function(socket){
      socket.on('add user', function(username){
          console.log("In add user: " + username);
          socket.username = username;
          socket.broadcast.emit('add user',
            {username: username});
      });
      socket.on('new message', function(data){
          console.log("New message: " + data.username + " sent " + data.body);
          socket.broadcast.emit('new message', data);
      });


      socket.on('disconnect', function(){});
});
