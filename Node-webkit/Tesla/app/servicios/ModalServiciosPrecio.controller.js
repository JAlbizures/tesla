angular.module('angularApp')
 	.controller('ModalServiciosPrecioCtrl',function ($scope, $modalInstance, servicio , $http, Config) {
 		$scope.servicio = servicio;

 		$scope.cambio = false;
 		$http.get(Config.path+'/servicios/precios?id='+servicio.idServicio)
  			.success(function (data) {
	        //console.log(data);
	  			$scope.precios = data;
	  			$scope.tempPrecios = angular.copy($scope.precios);
	  			$scope.$watch('precios',function (nV , oV) {
	  				if(nV != oV){
	  					$scope.cambio = true;
	  				}
	  			},true);
	  		})
	  		.error(function (data) {
	  			console.log(data);
	  			alert(data);
	  		});
	  	$scope.ok = function () {
			if($scope.cambio && $scope.tempPrecios != $scope.precios){
				 $http.put(Config.path+'/servicios/precios',$scope.precios)
			        .success(function (data) {
			          console.log(data);
			          //$scope.servicios = data; 
			          //$scope.estado = true;
			          $modalInstance.close();
			        })
			        .error(function (data) {
			          console.log(data);
			          alert(data);
			           $scope.estado = false;
			        });
			}else{
				alert('no guardar');
			}
			//$modalInstance.close();
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
 	});