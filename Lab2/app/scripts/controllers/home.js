'use strict';

angular.module('Lab2App').controller('HomeCtrl', ['$scope','$rootScope','$http','$window', function ($scope, $rootScope, $http, $window) {

	if(!$rootScope.users){
		$rootScope.getUsers();
	}

	$scope.register = function() {
		for(var i = 0; i < $rootScope.users.length; i++){
			if($rootScope.users[i].username === $scope.user.username){
				alert("Invalid Username");
				return;
			}
		}
		$http.post("https://52.0.11.73/backend/users",$scope.user).success(function(data){
			$rootScope.users.push($scope.user);
			$window.sessionStorage.username = $scope.user.username;
			$rootScope.user = $scope.user;
			$scope.navigateTo($rootScope.user.username);
		}).error(function(){
			$rootScope.users.push($scope.user);
			$rootScope.user = $scope.user;
			$scope.navigateTo($rootScope.user.username);
		});
	}

	$scope.signIn = function() {
		for(var i = 0; i < $rootScope.users.length; i++){
			if($rootScope.users[i].username === $scope.user.username){
				$window.sessionStorage.username = $scope.user.username;
				$rootScope.user = $scope.users[i];
				$scope.navigateTo($rootScope.user.username);
			}
		}
	}
}]);
