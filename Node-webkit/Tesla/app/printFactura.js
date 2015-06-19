angular.module('app',[])
	.controller('appCtrl',function ($scope,$timeout) {
			//NumeroALetras
		$scope.estado = true;
		$scope.data = JSON.parse(localStorage.dataFactura);//JSON.parse(sessionStorage.getItem('dataFactura'));
		console.log($scope.data);
		$scope.data.montoLetras = NumeroALetras($scope.data.monto);
		$scope.data.fecha = $scope.data.fecha.split('-');
		console.log($scope.data.fecha);
		$scope.imprimir = function () {
			$scope.estado = false;
			/*$timeout(function  () {
				window.print();
				$timeout(function  () {
					//$scope.estado = true;
				},100);
			},100);*/
			
			
			data = "    Nombre: " + pad($scope.data.nombre,30," ") + "          Fecha: " + $scope.data.fecha[2] + "/" + $scope.data.fecha[1] +"/" + $scope.data.fecha[0] + chr(13) + chr(10);
			if($scope.data.nit.lenght > 20){
				$scope.data.nit.substring(0,20);
			}
			data += "    Direccion: " + pad($scope.data.direccion,30," ") + "          NIT:" + $scope.data.nit + chr(13) + chr(10);
			data += "                                                                                    " + chr(13) + chr(10)  + chr(13) + chr(10);
			for(var index in $scope.data.faturaDetalle){
				
				if($scope.data.faturaDetalle[index].nombre.lenght > 50){
					$scope.data.faturaDetalle[index].nombre.substring(0,50);
				}
				data += "     " + pad($scope.data.faturaDetalle[index].nombre,45," ") + "  " + pad("Q."+($scope.data.faturaDetalle[index].precio * $scope.data.faturaDetalle[index].cantidad).formatMoney(2),13," ",1) + chr(13) + chr(10);
			}
			if($scope.data.montoLetras > 79){
				$scope.data.montoLetras.substring(0,79);
			}
			data +=" "+ chr(13)+chr(10);
			data +="                                     *" + $scope.data.montoLetras +'*'+ chr(13) + chr(10);
			data +="    "+$scope.data.serie + " " + $scope.data.numero;
			var fs = require("fs");
			fs.writeFile('c:/sistesla/impresion.txt',data);
			
			var exec = require('child_process').execFile;
		exec('c:/sistesla/Imprimir01_vb.exe'); 
		}
	});