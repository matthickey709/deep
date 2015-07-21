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

    //Array of all messages
    $scope.messages = [
      {sender: 'Alice', body:'Hello, how are you?', side:'left'},
      {sender: 'Bob', body:'I am fine, how are you?', side: 'right'},
      {sender: 'Alice', body:'Never been better', side: 'left'}
    ];
    
    //Function to add new messages
    $scope.add_new_message = function(){
        //Add new message to list of existing messages
        $scope.messages.push({
                sender: 'Bob',
                body: $scope.message_body,
                side:'right'
            });
        //Clear existing message
        $scope.new_message = null;
    }
}).controller('loginCtrl', 
    function($scope, $rootScope, $location){
       
       $scope.login = function(){
            $rootScope.username = $scope.username;
            $location.url('/chat');
       }

});


