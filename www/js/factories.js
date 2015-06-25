angular.module('famEvents.factories', [])

	.factory('$exceptionHandler', function ($injector) {
		return function (exception, cause) {
		    var $rootScope = $injector.get('$rootScope');
		    $rootScope.errors = $rootScope.errors || [];
		    $rootScope.errors.push(exception.message);
		    console.dir($rootScope.errors);
		}
	});