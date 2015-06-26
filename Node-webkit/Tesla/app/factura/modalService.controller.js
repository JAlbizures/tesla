angular.module('angularApp')
 	.controller('ModalServiciosCtrl',function ($scope, $modalInstance, servicios,precios,formaPago) {
 		$scope.precios = precios;
 		$scope.formaPago = formaPago;
 		$scope.servicios = servicios;
 		$scope.seleccionado = null;
 		$scope.searchTipo = undefined;
		$scope.ok = function () {
			$modalInstance.close($scope.seleccionado);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
		$scope.filtrarPorCategoria = function  (tipo) {
			if($scope.searchTipo == tipo){
				$scope.searchTipo = undefined;
			}else{
				$scope.searchTipo = tipo;
			}
		}
		$scope.toggleServicio = function (item) {
			if($scope.seleccionado == item){
				$scope.seleccionado = null;
			}else{
				$scope.seleccionado = angular.copy(item);
			}
		}
 	});