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
    Parse.FacebookUtils.logIn(null, {
      success: function(user) {
        console.log(user);
        if (!user.existed()) {
          alert("User signed up and logged in through Facebook!");
        } else {
          alert("User logged in through Facebook!");
        }
      },
      error: function(user, error) {
        alert("User cancelled the Facebook login or did not fully authorize.");
      }
    });
  }

  //This method is executed when the user press the "Login with facebook" button
  /*$scope.login = function() {

    if (!window.cordova) {
      //this is for browser only
      facebookConnectPlugin.browserInit(FACEBOOK_APP_ID);
    }

    //check if we have user's data stored
    var user = '';

    facebookConnectPlugin.getLoginStatus(function(success){
      // alert(success.status);
     if(success.status === 'connected'){
        // the user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        $state.go('profile');

     } else {
        //if (success.status === 'not_authorized') the user is logged in to Facebook, but has not authenticated your app
        //else The person is not logged into Facebook, so we're not sure if they are logged into this app or not.

        //this is a loader
        $ionicLoading.show({
          template: 'Loging in...'
        });

        //ask the permissions you need
        //you can learn more about FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.2
        facebookConnectPlugin.login(['email',
                                    'public_profile',
                                    'user_about_me',
                                    'user_likes',
                                    'user_location',
                                    'read_stream',
                                    'user_photos'], fbLoginSuccess, fbLoginError);

        fbLogged.promise.then(function(authData) {

          var fb_uid = authData.id,
              fb_access_token = authData.access_token;

            //get user info from FB
            getFacebookProfileInfo().then(function(data) {

              var user = data;
              user.picture = "http://graph.facebook.com/"+fb_uid+"/picture?type=large";
              user.access_token = fb_access_token;

              //save the user data
              //for the purpose of this example I will store it on ionic local storage but you should save it on a database
              console.log(user);

              $ionicLoading.hide();
              $state.go('profile');
            });
        });
      }
    });
  }*/



}])

.controller('ProfileCtrl', ['$scope', '$q', 'FACEBOOK_APP_ID', function($scope, $q, FACEBOOK_APP_ID){
  console.log('here');
  var deferred = $q.defer();


         /*facebookConnectPlugin.logout(function(){
           //success

           $ionicLoading.hide();
           $state.go('login');
         },
         function(fail){
           $ionicLoading.hide();
         });*/

  var getFacebookProfileInfo = function () {
    var info = $q.defer();
    if (!window.cordova) {
      //this is for browser only
      facebookConnectPlugin.browserInit(FACEBOOK_APP_ID);
    }

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

  console.log(getFacebookProfileInfo());



}])


.controller('CalendarCtrl', ['$scope', function($scope){

}])


.controller('FamilyMembersCtrl', ['$scope', function($scope){

}])


.controller('FamilyGroupsCtrl', ['$scope', function($scope){

}])
;