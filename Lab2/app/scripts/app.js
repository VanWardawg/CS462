'use strict';

angular.module('Lab2App', [
	'ngSanitize',
	'ngRoute'
])

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'views/home.html',
		controller: 'HomeCtrl'
	})
	.when('/user/:id', {
		templateUrl: 'views/user.html',
		controller: 'UserCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
}])

.run(['$rootScope', '$http', '$location', function ($scope, $http, $location) {

	$scope.navigateTo = function(id){
		$location.path("/user/" + id);
	}
	// Expose app version info
	$http.get('version.json').success(function (v) {
		$scope.version = v.version;
		$scope.appName = v.name;
	});
}]);
