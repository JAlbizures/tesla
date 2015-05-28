angular.module('app',[])
	.controller('appCtrl',function ($scope,$timeout) {
			//NumeroALetras
		$scope.estado = true;
		$scope.data = JSON.parse(sessionStorage.getItem('dataFactura'));
		console.log($scope.data);
		$scope.data.montoLetras = NumeroALetras($scope.data.monto);
		$scope.data.fecha = $scope.data.fecha.split('-');
		console.log($scope.data.fecha);
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