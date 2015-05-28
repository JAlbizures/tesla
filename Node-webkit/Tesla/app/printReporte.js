angular.module('app',[])
	.controller('appCtrl',function ($scope,$timeout,$http , $location	) {
		$scope.estado = true;
		$scope.fecha = Date.now();
		$scope.url = sessionStorage.getItem('host');
		var reporte = $scope.reporte = JSON.parse(sessionStorage.getItem('reporte'));	
		console.log($scope.reporte);
		//if($scope.reporte.tipo == 'Contado'){
		var datos = $scope.data = JSON.parse(sessionStorage.getItem('data'))[0];	
		//}else{
		//	$scope.data = JSON.parse(sessionStorage.getItem('data'));
		//}
		
		//console.log($scope.data);
		$scope.imprimir = function () {
			// $scope.estado = false;
			// $timeout(function  () {
			// 	window.print();
			// 	$timeout(function  () {
			// 		//$scope.estado = true;
			// 	},100);
			// },100);
			// console.log(sessionStorage.getItem('host'));
			// $http.get(sessionStorage.getItem('host')+'/reportes/pdf',{'reporte' : $(document.body).html()})
			// .success(function  (data,dato,dota) {
			// 	console.log(data);
			// })
			//$location.absUrl() == $scope.url + '/reportes/pdf?reporte='+ $(document.body).html();

			if($scope.reporte.tipo == "servicios"){
				var data = {
					"services" : datos
				}
				window.location.replace($scope.url + '/reportes/servicios/pdf?reporte='+ JSON.stringify(data));	
			}else if($scope.reporte.tipo == "facturas"){
				var data = {
					"facturas" : datos,
					"dataReporte" : reporte
				}
				window.location.replace($scope.url + '/reportes/facturas/pdf?reporte='+ JSON.stringify(data));	
			}else if($scope.reporte.tipo == "serviciosNoFacturados"){
				var data = {
					"facturas" : datos,
					"dataReporte" : reporte
				}
				window.location.replace($scope.url + '/reportes/serviciosNoFacturados/pdf?reporte='+ JSON.stringify(data));	
			}
			
			//$location.path('/reportes/pdf').search({'reporte': $(document.body).html()});
		}
		$scope.setOrder = function (order) {
        	$scope.order = order;
        	$scope.revers = !$scope.revers;
    	};
    	$scope.setReverse = function () {
    		
    	}
	});