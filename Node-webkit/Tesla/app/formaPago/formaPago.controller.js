
angular.module('angularApp')
 	.controller('FormaPagoCtrl',function ($state,Auth,$http,$scope, Config,$modal,$rootScope) {
 		Auth.currentUser();
 		$scope.estado = true;
 		$scope.formaPagoValido = true;
 		$scope.formasPago = [];
 		$http.get(Config.path+'/formaPago/')
			.success(function (data) {
				//console.log('formaPago');
				//console.log(data);
				//$scope.formasPago.length = 0;
				$scope.formasPago = data;
				console.log(data);
			})
			.error(function (data) {
				console.log(data);
				alert(data);
			});
		$scope.agregarFormaPago = function (formaPago) {
			$http.post(Config.path+'/formaPago/',formaPago)
				.success(function (data) {
					$scope.formaPago = {};
					$scope.formasPago = data;
				})
				.error(function (data) {
					console.log(data);
					alert(data);
				});
		}
		$scope.eliminar = function (id) {
			$http.delete(Config.path+'/formaPago/?id='+id)
				.success(function (data) {
					$scope.formasPago = data;
				})
				.error(function (data) {
					console.log(data);
					alert(data);
				});	
		}
		$scope.editar = function (formaPago) {
			$scope.updateFormaPago = angular.copy(formaPago);
      		$scope.estado = false;
			$scope.terminarEdit = function  (formaPago) {
				$scope.formaPago = {};
		  		//console.log(servicio);
		  		$http.put(Config.path+'/formaPago/',formaPago)
		  			.success(function (data) {
		  				$scope.formasPago = data;
		          		
		  				console.log(data);
		  			})
		  			.error(function  (data) {
		  				console.log(data);
		  				alert(data);
		  			})
			}
		}
		 $scope.$watch('formaPago.nombre',function(newV){

			$scope.formaPagoValido = true;
			for (var i = $scope.formasPago.length - 1; i >= 0; i--) {
				//	alert(i);
				if($scope.formasPago[i].nombre.toLocaleLowerCase() == newV.toLocaleLowerCase()){
					//alert('');
					$scope.formaPagoValido = false;
				}
			};
		});
		$scope.$watch('updateFormaPago.nombre',function(newV){

			$scope.formaPagoValido = true;
			for (var i = $scope.formasPago.length - 1; i >= 0; i--) {
				if($scope.formasPago[i].nombre.toLocaleLowerCase() == newV.toLocaleLowerCase() && $scope.formasPago[i].idFormaPago != $scope.updateFormaPago.idFormaPago){
					//alert('');
					$scope.formaPagoValido = false;
				}
			};
		});
 	});