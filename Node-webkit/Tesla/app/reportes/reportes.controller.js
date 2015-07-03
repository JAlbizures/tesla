
angular.module('angularApp')
 	.controller('ReportesCtrl',function (Auth, Config, $scope,$http) {
 		Auth.currentUser();
 		$scope.reporte = {};
 		$scope.reporte.fecha1 = dateNow();
 		$scope.reporte.fecha2 = dateNow();
 		$scope.reporte.tipo = 'facturas';

 		$scope.generarReporte = function () {
 			$http.get(Config.path+'/reportes?tipo='+$scope.reporte.tipo+'&fecha1='+new Date($scope.reporte.fecha1 + " 00:00:00")+'&fecha2='+new Date($scope.reporte.fecha2 + " 23:59:59"))
	 			.success(function (data) {

	 				if(data.length > 0){

		 				//sessionStorage.setItem('data',JSON.stringify(data));
		 				//sessionStorage.setItem('',Config.path);
            localStorage.data = JSON.stringify(data);
            localStorage.host = JSON.stringify(Config.path);
		 				var reporte = {};

		 				reporte.fecha1 = $scope.reporte.fecha1;
						reporte.fecha2 = $scope.reporte.fecha2;
						reporte.tipo = $scope.reporte.tipo;
		 				localStorage.reporte = JSON.stringify(reporte);
            //sessionStorage.setItem('reporte',JSON.stringify(reporte));
            var win = gui.Window.open('printReporte.html',{
              "width" : 800,
              "min_width" : 800,
              "toolbar": true,
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
