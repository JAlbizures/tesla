angular.module('app',[])
	.controller('appCtrl',function ($scope,$timeout) {
			//NumeroALetras
		$scope.estado = true;
		$scope.data = JSON.parse(sessionStorage.getItem('dataPulmon'));
		console.log($scope.data);
		$scope.imprimir = function () {
			$scope.estado = false;
			$timeout(function  () {
				window.print();
				$timeout(function  () {
					//$scope.estado = true;
				},100);
			},100);
		}
	});