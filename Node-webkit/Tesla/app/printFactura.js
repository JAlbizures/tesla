angular.module('app',[])
	.controller('appCtrl',function ($scope,$timeout,$http) {
			//NumeroALetras
		$scope.estado = true;
		$scope.data = JSON.parse(localStorage.dataFactura);//JSON.parse(sessionStorage.getItem('dataFactura'));
		console.log($scope.data);
		$scope.data.montoLetras = NumeroALetras($scope.data.monto);
		$scope.data.fecha = $scope.data.fecha.split('-');
		console.log($scope.data.fecha);
		$scope.imprimir = function () {
			if($scope.data.formaPago.nombre.toLocaleLowerCase() == 'contado'.toLocaleLowerCase() || $scope.data.formaPago.nombre.toLocaleLowerCase() == 'tarjeta de credito'.toLocaleLowerCase()){
				texto = "Desea imprimir factura con:\n Serie: "+ $scope.data.serie +" No.: "+$scope.data.numero + "\nAsegurese de tener papel en la impresora";
			}else{
				texto = "Desea terminar";
			}
			if(confirm(texto)){
				$http.post($scope.data.path+'/facturas/crear',$scope.data)
		  			.success(function (result) {
		  				$scope.estado = false;
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
						data +="     " + "Por atención al paciente: "+$scope.data.paciente + chr(13) + chr(10);
						if($scope.data.montoLetras > 79){
							$scope.data.montoLetras.substring(0,79);
						}
						var f=new Date();
						var hora= f.getHours();
						if (hora<10) { hora='0'+hora}
						var min = f.getMinutes();
						if (min<10) { min='0'+min}
						var sec = f.getSeconds();
						if (sec<10) { sec='0'+sec}
						var now = hora+":"+min+":"+sec;

						data +=" "+ chr(13)+chr(10);
						data +="                    *" + $scope.data.montoLetras +'*'+ chr(13) + chr(10);
						data +="    "+$scope.data.serie + "-" + $scope.data.numero+" ("+$scope.data.nUsuario+")-"+now;
						var fs = require("fs");
						fs.writeFile('c:/sistesla/impresion.txt',data);
						
						var exec = require('child_process').execFile;
						//exec('c:/sistesla/Imprimir01_vb.exe'); 

						var gui = require('nw.gui');
						var win = gui.Window.get();
						localStorage.dataFactura = "";
						win.close(); 

		  			}).error(function  (data) {
		  				console.log(data);
		  				alert(data);
		  			});
		  	}
		}
	});