'use strict';

angular.module('Lab2App').controller('UserCtrl', ['$scope','$routeParams','$rootScope','$oauth2','$http', function ($scope, $routeParams, $rootScope, $oauth2, $http) {


	$scope.authenticate = function() {
		$oauth2.authenticate();
	}

	$scope.isAuthenticated = function() {
		return $oauth2.isAuthenticated();
	}

	$scope.setUser = function() {
		for(var i = 0; i < $rootScope.users.length;i++){
			if($rootScope.users[i].username === $routeParams.id){
				$scope.user = $rootScope.users[i];
			}
		}

		if($scope.user === $rootScope.user){
			$scope.isMe = true;
		}
		else {
			$scope.isMe = false;
		}
	}
	if(!$rootScope.users){
		$rootScope.getUsers($scope.setUser);
	}
	else {
		$scope.setUser();
	}

	$scope.connectToApp = function() {
		$http.get('https://api.foursquare.com/v2/users/self/').success(function(data){
			$scope.user.id = data.response.user.id;
			console.log(data);
			$http.put('https://52.0.11.73/backend/users',$scope.user).success(function() {
				
			});
		});
	}

	$scope.getMyCheckins = function() {
		$http.get('https://api.foursquare.com/v2/users/self/checkins').success(function(data){
			$scope.user.checkins = data.response.checkins.items;
			console.log(data);
			$http.put('https://52.0.11.73/backend/users',$scope.user).success(function() {

			});
		});
	}
}]);
