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

.run(['$rootScope', '$http', '$location','$window', function ($scope, $http, $location, $window) {
	var clientId = 'FBV5L0SGE2JI1RHUIHECPMG3CYJRA2VYNJ3005B3WR3CB5TO';

	$scope.getUsers = function(callback){
		$http.get('https://52.0.11.73/backend/users').success(function(data){
		$scope.users = data.users;
		// $scope.users =[
		// 	{
		// 		username:'bob1'
		// 	},{
		// 		username:'bob2'
		// 	},{
		// 		username:'bob3'
		// 	},{
		// 		username:'bob4'
		// 	}
		// ]
		setUser();
		if(callback)
			callback();
	});
	}
	
	function setUser() {
		if($window.sessionStorage.username){

			for(var i = 0; i < $scope.users.length;i++){
				if($scope.users[i].username === $window.sessionStorage.username){
					$scope.user = $scope.users[i];
				}
			}
		}
	}

	$scope.getUsers(setUser);

	$scope.signout = function() {
		$scope.user = null;
		$window.sessionStorage.clear()
		$scope.navigateTo('/');
	}

	
	$scope.navigateTo = function(id){
		$location.path("/user/" + id);
	}
	// Expose app version info
	$http.get('version.json').success(function (v) {
		$scope.version = v.version;
		$scope.appName = v.name;
	});
}]);
