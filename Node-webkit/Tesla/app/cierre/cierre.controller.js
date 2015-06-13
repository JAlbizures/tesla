angular.module('angularApp')
 	.controller('CierreCtrl',function (Auth, Config, $scope, $http,$rootScope) {
		Auth.currentUser();
		
 	});