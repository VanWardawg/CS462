'use strict';

angular.module('Lab2App').controller('UserCtrl', ['$scope','$routeParams','$rootScope','$http', function ($scope, $routeParams, $rootScope, $http) {


	$scope.howMany = function() {
		if($scope.isMe){
			return 100;
		}
		return 1;
	}

	$scope.sendGossipMessage = function() {
		$rootScope.user.messages = $rootScope.user.messages || [];
		var message = {
			"Text":$scope.gossipMessage,
			"Originator":$rootScope.user.username,
			"MessageID": $rootScope.user.id + ":" + $rootScope.user.messages.length
		};
		$http.post("https://52.0.11.73/backend/users/"+$rootScope.user.id+"/message",message).success(function(data){
			$rootScope.user = data;
			$scope.user = $rootScope.user;
			$scope.gossipMessage = '';
		});
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

		if($scope.user.messages){
			for(var i = 0; i< $scope.user.messages.length;i++){
				var mId = $scope.user.messages[i].MessageID.split(":")[0];
				if(mId === $scope.user.id){
					$scope.user.messages[i].isUser = true;
				}
				else {
					$scope.user.messages[i].isUser = false;
				}
			}
		}
	}
	if(!$rootScope.users){
		$rootScope.getUsers($scope.setUser);
	}
	else {
		$scope.setUser();
	}

}]);

angular.module('Lab2App').filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
