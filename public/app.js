var app = angular.module('myMessenger', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('chat',{
        url:'/chat',
        templateUrl:'views/chat.html',
        controller:'chatCtrl'
    })
    .state('login',{
        url:'/login',
        templateUrl:'views/login.html',
        controller:'loginCtrl'
    })
    .state('users',{
        url:'/users',
        templateUrl:'views/users.html',
        controller:'userCtrl'
    });

    $urlRouterProvider.otherwise('/login');

});

app.controller('chatCtrl',
    function($scope, $rootScope, $state){
    
    if(!$rootScope.username){
        //If not logged in- redirect to login page
        $state.go('login'); 
     }

     var socket = io();
     socket.emit('add user', $rootScope.username);

    //Array of all messages
    $scope.messages = [];
    //Array of all users
    $scope.users = {}; 

    //Function to add new messages
    $scope.add_new_message = function(){
        //Add new message to list of existing messages
        $scope.messages.push({
                username: $rootScope.username,
                body: $scope.message_body
            });
        
        //Send message to server
        socket.emit('new message', $scope.message_body);
        
        //Clear existing message
        $scope.message_body = null;
    }

    socket.on('welcome', function(data){
        console.log("Received 'welcome' event");
        console.log(data);    
        for(var i=data.messages.length-1; i>=0; i--){
            $scope.messages.push(data.messages[i]);    
        }
        $scope.$apply();
    });
    
    //When a new user logs in
    socket.on('add user', function(data){
           console.log('add user: ' + data.username);
           if(data.username){
               $scope.users[data.username] = data.username;
           }
    });

    //When new message received
    socket.on('new message', function(data){
        console.log('new message: ' + data.body + " from " + data.username);
        $scope.messages.push(data);
        $scope.$apply();
    });

    socket.on('remove user', function(data){
        console.log('remove user: ' + data.username);
        delete $scope.users[data.username]
    });

    //If we received a bye, goto login page
    socket.on('bye', function(data){
        console.log('client already connected');
        $state.go('login');
    });

}).controller('loginCtrl', 
    function($scope, $rootScope, $state){
       
       $scope.login = function(){
            $rootScope.username = $scope.username;
            $state.go('chat');
       }
});


