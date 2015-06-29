angular.module('angularApp')
 	.controller('FacturasCtrl',function (Auth, Config, $scope, $http,$rootScope) {
		Auth.currentUser();
    $scope.filtro = false;

		$http.get(Config.path+'/facturas/')
  		.success(function (data) {
        	console.log(data);
  			$scope.facturas = data;
  		})
  		.error(function (data) {
  			console.log(data);
  			alert(data);
  		});
    $scope.anular = function  (idFactura) {
      $http.put(Config.path+'/facturas/anular/',{'idFactura' : idFactura, 'idUsuario' : $rootScope.currentUser.idUsuarios})
      .success(function (data) {
          console.log(data);
        $scope.facturas = data;
      })
      .error(function (data) {
        console.log(data);
        alert(data);
      });
    }
    $scope.$watch('filtro',function  (newV,oldV) {
      if(newV != oldV && newV){

      }
    });
    $scope.$watch('fecha1',function  (newV,oldV) {
      if(newV &&newV != oldV ){

      }
    });
    $scope.$watch('fecha2',function  (newV,oldV) {
      if(newV &&newV != oldV ){

      }
    });

    $scope.filtrar = function (fecha) {
      if($scope.filtro && $scope.fecha1 != null && $scope.fecha2 != null){
         console.log(fecha.substring(0,10),$scope.fecha1,$scope.fecha2);
        if(fecha.substring(0,10) == $scope.fecha1 || fecha.substring(0,10) == $scope.fecha2){
          return true;
        }
        if(fecha.substring(0,10) >= $scope.fecha1 && fecha.substring(0,10) <= $scope.fecha2){
          return true;
        }else{

          return false;
        }
      }else{
        return true;
      }

    }
 	});