
angular.module('angularApp')
	.factory('Auth', function Auth($state, $rootScope) {
		return {
			currentUser : function () {
				 if(!$rootScope.currentUser){
				 	console.log("Auth urrent");
				 	$state.go("login");
				 }
			}
		};
	});