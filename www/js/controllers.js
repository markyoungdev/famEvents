angular.module('famEvents.controllers', [])

.controller('LoginCtrl', ['$scope','$q','$state','$ionicLoading','FACEBOOK_APP_ID', function($scope, $q, $state, $ionicLoading, FACEBOOK_APP_ID) {
  var fbLogged = $q.defer();


//This is the success callback from the login method
  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }
    var expDate = new Date(
      new Date().getTime() + response.authResponse.expiresIn * 1000
    ).toISOString();

    var authData = {
      id: String(response.authResponse.userID),
      access_token: response.authResponse.accessToken,
      expiration_date: expDate
    }
    fbLogged.resolve(authData);
  };

  //This is the fail callback from the login method
  var fbLoginError = function(error){
    fbLogged.reject(error);
    alert(error);
    $ionicLoading.hide();
  };

  //this method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function () {
    var info = $q.defer();
    facebookConnectPlugin.api('/me', "",
      function (response) {
        info.resolve(response);
      },
      function (response) {
        info.reject(response);
      }
    );
    return info.promise;
  }


  $scope.login = function(){
    console.log(Parse.FacebookUtils);
    Parse.FacebookUtils.logIn("user_likes,email", {
      success: function(user) {
        console.log(user);
        if (!user.existed()) {
          console.log("User signed up and logged in through Facebook!");
          $state.go('profile');
        } else {
          console.log("User logged in through Facebook!");
        }
      },
      error: function(user, error) {
        alert("User cancelled the Facebook login or did not fully authorize.");
      }
    });
  }



}])

.controller('ProfileCtrl', ['$scope', '$q', 'FbUserSvc', function($scope, $q, FbUserSvc ){
  console.log('here');
  var deferred = $q.defer();

  console.log(FbUserSvc.public());
  //console.log(getFacebookProfileInfo());



}])


.controller('CalendarCtrl', ['$scope', function($scope){

}])


.controller('FamilyMembersCtrl', ['$scope', function($scope){

}])


.controller('FamilyGroupsCtrl', ['$scope', function($scope){

}])
;