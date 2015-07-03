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
        fecha = new Date(fecha);
        var fecha1 = new Date($scope.fecha1 + " 00:00:00");
        var fecha2 = new Date($scope.fecha2 + " 23:59:59");
        //console.log(fecha,fecha1,fecha2);
        if(fecha == fecha1 || fecha == fecha2){
          return true;
        }
        if(fecha >= fecha1 && fecha <= fecha2){
          return true;
        }else{

          return false;
        }
      }else{
        return true;
      }

    }
 	});
