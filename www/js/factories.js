angular.module('famEvents.factories', [])

	.factory('$exceptionHandler', function ($injector) {
		return function (exception, cause) {
		    var $rootScope = $injector.get('$rootScope');
		    $rootScope.errors = $rootScope.errors || [];
		    $rootScope.errors.push(exception.message);
		    console.dir($rootScope.errors);
		}
	})

	.factory('FbUserSvc', ['$q','$facebook', function($q, $facebook){
		return {
			public: function() {
				$facebook.cachedApi('/me/').then(function(data) {
					return data;
				});
			},
			friends: function() {
				$facebook.cachedApi('/me/friends').then(function(data) {
					return data;
				});
			}

		}

	}])
	;