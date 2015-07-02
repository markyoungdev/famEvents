angular.module('famEvents.factories', [])

	.factory('$exceptionHandler', function ($injector) {
		return function (exception, cause) {
		    var $rootScope = $injector.get('$rootScope');
		    $rootScope.errors = $rootScope.errors || [];
		    $rootScope.errors.push(exception.message);
		    console.dir($rootScope.errors);
		}
	})

	.factory('FbUserSvc', ['$q', function($q){
		return {
			public: function() {
				var deferred = $q.defer();
				 FB.api('/me', function(data) {
					deferred.resolve(data);
				});
				 return deferred.promise;
			},
			friends: function() {
				var deferred = $q.defer();
				 FB.api('/me/friends', function(data) {
					deferred.resolve(data);
				});
				 return deferred.promise;
			}

		}

	}])

	.factory('getEvents', ['$q', function($q){
		return {
			list: function() {
				var deferred = $q.defer();
				var Events = Parse.Object.extend("event");
				var query = new Parse.Query(Events);
				query.find({
				  success: function(events) {
				    // The object was retrieved successfully.
				    deferred.resolve(events);
				  },
				  error: function(object, error) {
				    // The object was not retrieved successfully.
				    // error is a Parse.Error with an error code and message.
				  }
				});
				return deferred.promise;
			}
		}
	}])

	.factory('getEvent', ['$q', function($q){
		return {
			list: function(eventID) {
				var deferred = $q.defer();
				var Events = Parse.Object.extend("event");
				var query = new Parse.Query(Events);
				query.get(eventID,{
				  success: function(events) {
				    // The object was retrieved successfully.
				    deferred.resolve(events);
				  },
				  error: function(object, error) {
				    // The object was not retrieved successfully.
				    // error is a Parse.Error with an error code and message.
				  }
				});
				return deferred.promise;
			}
		}
	}])
	;