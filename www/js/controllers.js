angular.module('famEvents.controllers', [])

.controller('LoginCtrl', ['$scope','$facebook','$state', function($scope, $facebook, $state) {
	

	$scope.$on('fb.auth.authResponseChange', function() {
      $scope.status = $facebook.isConnected();
      if($scope.status) {
        $facebook.api('/me').then(function(user) {
          $scope.user = user;
        });

         $scope.getFriends();
       
		
		//$state.go('profile');

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
      	//console.log(friends);
        $scope.friends = friends.data;        
      });
    }

  


}])

.controller('ProfileCtrl', ['$scope','$facebook', function($scope, $facebook){

}])


.controller('CalendarCtrl', ['$scope','$facebook', function($scope, $facebook){

}])


.controller('FamilyMembersCtrl', ['$scope','$facebook', function($scope, $facebook){

}])


.controller('FamilyGroupsCtrl', ['$scope','$facebook', function($scope, $facebook){

}])
;