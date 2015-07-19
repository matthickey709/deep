var app = angular.module('myMessenger', []);

app.controller('myController',
    function($scope){
        $scope.messages = [
          {sender: 'Alice', body:'Hello, how are you?', side:'left'},
          {sender: 'Bob', body:'I am fine, how are you?', side: 'right'},
          {sender: 'Alice', body:'Never been better', side: 'left'}
        ];
});


