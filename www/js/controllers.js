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
          $state.go('create-event');
        } else {
          console.log("User logged in through Facebook!");
           $state.go('create-event');
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

.controller('EventCtrl', ['$scope','$state','getEvent', function($scope, $state, getEvent){
  //console.log($state.params.eventID)
  getEvent.list($state.params.eventID)
  .then(function(value){
      var item = {}
      item.id = value.id;
      item.date = value.get('date');
      item.name = value.get('name');
      item.gender = value.get('gender');
      $scope.event = item;
      console.log($scope.event);
  })
  $scope.goBack = function(){
    $state.go('list-events');
  }

  $scope.editEvent = function(){
    getEvent.list($state.params.eventID)
    .then(function(value){
      $state.go('edit')
    });
  }

}])

.controller('ListEventsCtrl', ['$scope','$state','getEvents', function($scope, $state, getEvents){
  $scope.events = [];
  getEvents.list().then(function(events){
   // $scope.events = events;
    console.log(events);
    angular.forEach(events, function(value, key) {
      var item = {}
      item.id = value.id;
      item.date = value.get('date');
      item.name = value.get('name');
      item.gender = value.get('gender');
      //console.log(item);
      $scope.events.push(item);
    });
     console.log($scope.events);
  });

}])

.controller('CreateEventCtrl', ['$scope','FbUserSvc', '$state', function($scope, FbUserSvc, $state){
  //console.log(FbUserSvc.public());

  $scope.createEvent = function(task) {
    console.log(task);

    var BirthdayEvent = Parse.Object.extend("event");
    var birthdayEvent = new BirthdayEvent();

    angular.forEach(task, function(value, key) {
      birthdayEvent.set(key, value);
    });

    birthdayEvent.save(null, {
      success: function(birthdayEvent) {
        // Execute any logic that should take place after the object is saved.
        console.log('New object created with objectId: ' + birthdayEvent.id);
      },
      error: function(birthdayEvent, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        console.log('Failed to create new object, with error code: ' + error.message);
      }
    });
  };

}])

.controller('EditEventsCtrl', ['$scope','getEvent','$state', function($scope, getEvent, $state){
    console.log($state);
    getEvent.list($state.params.eventID)
    .then(function(value){
        var item = {}
        //item.id = '<span style="display:none;">'+value.id+'</span>';
        item.date = value.get('date');
        item.name = value.get('name');
        item.gender = value.get('gender');
        $scope.event = item;
        console.log($scope.event);
    })
}])
;