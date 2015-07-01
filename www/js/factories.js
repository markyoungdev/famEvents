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
	;