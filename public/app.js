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
    });

    $urlRouterProvider.otherwise('/login');

});

app.controller('chatCtrl',
    function($scope, $rootScope, $location){
    
    if(!$rootScope.username){
        //If not logged in- redirect to login page
        $location.url('/login'); 
     }

     var socket = io();
     socket.emit('add user', $rootScope.username);

    //Array of all messages
    $scope.messages = [];
    
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

    //When a new user logs in
    socket.on('add user', function(data){
           console.log(data);
    });

    //When new message received
    socket.on('new message', function(data){
        console.log(data);
        $scope.messages.push(data);
        $scope.$apply();
    });

}).controller('loginCtrl', 
    function($scope, $rootScope, $location){
       
       $scope.login = function(){
            $rootScope.username = $scope.username;
            $location.url('/chat');
       }

});


