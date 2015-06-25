angular.module('famEvents.controllers', [])

.controller('LoginCtrl', ['$scope','$facebook', function($scope, $facebook) {

	$scope.$on('fb.auth.authResponseChange', function() {
      $scope.status = $facebook.isConnected();
      if($scope.status) {
        $facebook.api('/me').then(function(user) {
          $scope.user = user;
        });
      }
    });

	$scope.login = function(){
		console.log('clicked');
		if($scope.status) {
        	$facebook.logout();
      } else {
        	$facebook.login();
      }
	}

	$scope.refresh = function() {
    $facebook.api("/me").then( 
      function(response) {
        $scope.welcomeMsg = "Welcome " + response.name;
      },
      function(err) {
	        $scope.welcomeMsg = "Please log in";
	  });
	}

	$scope.getFriends = function() {
      if(!$scope.status) return;
      $facebook.cachedApi('/me/friends').then(function(friends) {
        $scope.friends = friends.data;
      });
    }


}])
