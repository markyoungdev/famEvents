// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('famEvents', ['ionic', 'famEvents.controllers', 'famEvents.services', 'famEvents.factories', 'ngFacebook'])

.run(['$ionicPlatform','$rootScope', '$window', function($ionicPlatform, $rootScope, $window) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

   
  });

   /**
    *
    * Add in fb code.
    *
    **/
    
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
}])

.config([ '$stateProvider','$urlRouterProvider','$facebookProvider', function($stateProvider, $urlRouterProvider, $facebookProvider) {

  /**
  *
  * Initialize facebook plugin
  *
  **/
  $facebookProvider.setAppId('571791002962232');  
  $facebookProvider.setPermissions('email','user_likes','public_profile','user_location','read_stream','user_photos');  

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
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