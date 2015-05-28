
angular.module('angularApp')
 	.controller('ReportesCtrl',function (Auth, Config, $scope,$http) {
 		Auth.currentUser();
 		$scope.reporte = {};
 		$scope.reporte.fecha1 = dateNow();
 		$scope.reporte.fecha2 = dateNow();
 		$scope.reporte.tipo = 'facturas';

 		$scope.generarReporte = function () {
 			$http.get(Config.path+'/reportes?tipo='+$scope.reporte.tipo+'&fecha1='+$scope.reporte.fecha1+'&fecha2='+$scope.reporte.fecha2)
	 			.success(function (data) {

	 				if(data.length > 0){
	 					
		 				sessionStorage.setItem('data',JSON.stringify(data));
		 				sessionStorage.setItem('host',Config.path);
		 				var reporte = {};

		 				reporte.fecha1 = $scope.reporte.fecha1;
						reporte.fecha2 = $scope.reporte.fecha2;
						reporte.tipo = $scope.reporte.tipo;
		 				sessionStorage.setItem('reporte',JSON.stringify(reporte));
		 				window.open('printReporte.html',{
		 					"width" : 900,
		 					"min_width" : 500,
		 					"max_width" : 1000,
		 					"toolbar": false,
  							"frame": true
		 				});
	 				}
	 				console.log(data);
	 			}).error(function (data) {
					console.log(data);
					alert('error',data);
				});
 		}
 	});
