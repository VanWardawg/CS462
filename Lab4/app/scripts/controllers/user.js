'use strict';

angular.module('Lab2App').controller('UserCtrl', ['$scope','$routeParams','$rootScope','$http', function ($scope, $routeParams, $rootScope, $http) {


	$scope.howMany = function() {
		if($scope.isMe){
			return 100;
		}
		return 1;
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

}]);
