'use strict';

angular.module('Lab2App').controller('HomeCtrl', ['$scope','$rootScope','$http','$window', function ($scope, $rootScope, $http, $window) {

	if(!$rootScope.users){
		$rootScope.getUsers();
	}

	$scope.register = function() {
		for(var i = 0; i < $rootScope.users.length; i++){
			if($rootScope.users[i].username === $scope.newuser.username){
				alert("Invalid Username");
				return;
			}
		}
		$http.post("https://52.0.11.73/backend/users",$scope.newuser).success(function(data){
			$rootScope.users.push($scope.newuser);
			$window.sessionStorage.username = $scope.newuser.username;
			$rootScope.user = $scope.newuser;
			$scope.navigateTo($rootScope.user.username);
		}).error(function(){
			$rootScope.users.push($scope.newuser);
			$rootScope.user = $scope.newuser;
			$scope.navigateTo($rootScope.user.username);
		});
	}

	$scope.signIn = function() {
		for(var i = 0; i < $rootScope.users.length; i++){
			if($rootScope.users[i].username === $scope.newuser.username){
				$window.sessionStorage.username = $scope.newuser.username;
				$rootScope.user = $scope.users[i];
				$scope.navigateTo($rootScope.user.username);
			}
		}
	}
}]);
