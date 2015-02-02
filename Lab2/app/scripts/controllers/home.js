'use strict';

angular.module('Lab2App').controller('HomeCtrl', ['$scope','$http', function ($scope, $http) {

	$http.get('http://54.174.221.222/CS462/Lab1/cgi-bin/usersget.cgi').success(function(data){
		$scope.users = data;
	});
	$scope.stuff = 3;
	$scope.users =[
	{
		name:'bob',
		id:'123'
	},{
		name:'bob',
		id:'123'
	},{
		name:'bob',
		id:'123'
	},{
		name:'bob',
		id:'123'
	}
	]

	$scope.register = function() {
		$http.post($scope.users)
	}

	$scope.signIn = function() {
		$scope.user
	}
}]);
