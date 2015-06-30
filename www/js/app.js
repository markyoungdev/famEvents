 // Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('famEvents', ['ionic', 'famEvents.controllers', 'famEvents.services', 'famEvents.factories'])

.run(['$ionicPlatform','$rootScope', '$window', '$state', function($ionicPlatform, $rootScope, $window, $state) {

  $ionicPlatform.on("deviceready", function(){
    facebookConnectPlugin.getLoginStatus(function(success){
      if(success.status === 'connected'){
        $state.go('profile');
      }else{
        $state.go('login');
      }
    });

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleLightContent();
    }

    /**
    *
    * Add in fb code.
    *
    **/

     // Initialize Parse
  Parse.initialize("8C4o9Oo9RW1Ly9zskJ7DvKtOPFrTXZCnMUq6d6iY", "QgIVqEWckKbya6YCgG11OyUtTVefVLyshV7Fam5g");
  window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({ // this line replaces FB.init({
      appId      : '571791002962232', // Facebook App ID
      status     : true,  // check Facebook Login status
      cookie     : true,  // enable cookies to allow Parse to access the session
      xfbml      : true,  // initialize Facebook social plugins on the page
      version    : 'v2.3' // point to the latest Facebook Graph API version
    });
        // Run code after the Facebook SDK is loaded.
  };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    $rootScope.$on('fb.load', function() {
      $window.dispatchEvent(new Event('fb.load'));
    });


  });<!--// end device ready -->


  /**
  *
  * onResume functions
  *
  **/
  $ionicPlatform.on("resume", function(){
    facebookConnectPlugin.getLoginStatus(function(success){
      if(success.status != 'connected'){
        $state.go('login');
      }
    });

  });

   /**
   *
   * UI Router Authentication Check
   *
   **/

  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if (toState.data.authenticate) {
      facebookConnectPlugin.getLoginStatus(function(success){
        if(success.status === 'connected'){

        }else{
          event.preventDefault();
          $state.go('login');
        }
      },
      function(fail){
      });
    }
  });

}])

.config([ '$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider

  // setup an abstract state for the tabs directive
  .state('login', {
    url: "/",
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl',
    data: {
      authenticate: false
    }
    /*views: {
      'menuContent': {
        templateUrl: "templates/index.html",
        controller: 'ProfileCtrl'
    }*/
  })

  .state('feeds', {
    url: "/feeds",
    templateUrl: "templates/feeds.html",
    controller: 'ProfileCtrl',
    data: {
      authenticate: true
    }
    /*views: {
      'menuContent': {
        templateUrl: "templates/index.html",
        controller: 'ProfileCtrl'
    }*/
  })

  .state('calendar', {
    url: "/calendar",
    templateUrl: "templates/calendar.html",
    controller: 'CalendarCtrl',
    data: {
      authenticate: true
    }
    /*views: {
      'menuContent': {
        templateUrl: "templates/index.html",
        controller: 'ProfileCtrl'
    }*/
  })

  .state('members', {
    url: "/family-members",
    templateUrl: "templates/family-members.html",
    controller: 'FamilyMembersCtrl',
    data: {
      authenticate: true
    }
    /*views: {
      'menuContent': {
        templateUrl: "templates/index.html",
        controller: 'ProfileCtrl'
    }*/
  })

  .state('groups', {
    url: "/family-groups",
    templateUrl: "templates/family-groups.html",
    controller: 'FamilyGroupsCtrl',
    data: {
      authenticate: true
    }
    /*views: {
      'menuContent': {
        templateUrl: "templates/index.html",
        controller: 'ProfileCtrl'
    }*/
  })

  .state('profile', {
    url: "/profile",
    templateUrl: "templates/profile.html",
    controller: 'ProfileCtrl',
    data: {
      authenticate: true
    }
    /*views: {
      'menuContent': {
        templateUrl: "templates/index.html",
        controller: 'ProfileCtrl'
    }*/
  })


  ;



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

}]);

window.ionic.Platform.ready(function() {
  //console.log(facebookConnectPlugin);
    angular.bootstrap(document, ['famEvents']);
});