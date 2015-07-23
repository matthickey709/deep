//Master Server
var server = require('http').createServer();
var io = require('socket.io')(server);
var port = process.env.PORT || 8000;

server.listen(port, function (){
    console.log("MASTER server listening on port %d", port);
});

//List of all users
var userlist = {};

io.on('connection', function(socket){
      socket.on('add user', function(username){
          console.log("In add user: " + username);
          socket.username = username;
          userlist[username] = username;  
          //Broadcast to other relays that 'add user' event occured
          socket.broadcast.emit('add user',
            {username: username});

          //Send to joiner, list of all users
          socket.emit('welcome', {userlist:userlist});
      });
      socket.on('new message', function(data){
          console.log("New message: " + data.username + " sent " + data.body);
          socket.broadcast.emit('new message', data);
      });

      socket.on('remove user', function(data){
          delete userlist[data.username];
          socket.broadcast.emit('remove user', {username: socket.username});      
      });  

      //When client quits
      socket.on('disconnect', function(){
          //Remove user
          delete userlist[socket.username]
          socket.broadcast.emit('remove user', {username: socket.username});      
      });
});
