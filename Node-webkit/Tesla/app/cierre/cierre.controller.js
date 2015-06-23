angular.module('angularApp')
 	.controller('CierreCtrl',function (Auth, Config, $scope, $http,$rootScope) {
		Auth.currentUser();
		$scope.activasCierre;
		$http.get(Config.path+'/facturas/activas')
			.success(function (data) {
				console.log(data);
				$scope.activas = data;
				for (var i = $scope.activas.length - 1; i >= 0; i--) {
					$scope.activas[i].fecha = new Date($scope.activas[i].fecha);
				};
				$scope.fechaInicial = $scope.activas[0].fecha.yyyymmdd();
				$scope.fechaFinal = $scope.activas[data.length-1].fecha.yyyymmdd();
				// $scope.efectivo = 0;
				// $scope.deposito = 0;
				$scope.activasCierre = angular.copy(data);
			})
			.error(function (data) {
				console.log(data);
				alert('Error al obtener fechas');
			});
		$scope.$watch('fechaInicial',cambioFecha);
		$scope.$watch('fechaFinal',cambioFecha);

		function cambioFecha (newVal,oldVal) {
			if(newVal !== oldVal){
				$scope.activasCierre = [];
				//console.log(new Date($scope.fechaInicial.replace(/-/g, "/")),$scope.fechaInicial,new Date($scope.fechaInicial).getTime());
				//console.log(new Date($scope.fechaFinal.replace(/-/g, "/")),$scope.fechaFinal,new Date($scope.fechaFinal).getTime());
				for (var i = $scope.activas.length - 1; i >= 0; i--) {
				//debugger;
					if($scope.activas[i].fecha >= new Date($scope.fechaInicial.replace(/-/g, "/")) && $scope.activas[i].fecha <= new Date($scope.fechaFinal.replace(/-/g, "/"))){
							$scope.activasCierre.push($scope.activas[i]);
					}
				};
				
			}	
		}
		$scope.terminarCierre = function () {
			var facturado = 0,
				idIni = Infinity,
				idFin = 0;

			for (var i = $scope.activasCierre.length - 1; i >= 0; i--) {
				facturado += $scope.activasCierre[i].monto;
				if($scope.activasCierre[i].idFactura < idIni){
					idIni = $scope.activasCierre[i].idFactura;
				}
				if($scope.activasCierre[i].idFactura > idFin){
					idFin = $scope.activasCierre[i].idFactura;
				}
			};
			var cierre = {
				'fecha_i' : $scope.fechaInicial,
				'fecha_f' : $scope.fechaFinal,
				'idUsuario' : $rootScope.currentUser.idUsuarios,
				'montoEfectivo' : $scope.efectivo,
				'montoDeposito' : $scope.deposito,
				'montoFacturado' : facturado,
				'numero_ini' : idIni,
				'numero_fin' : idFin,
				'detalle' : $scope.activasCierre
			}
			$http.post(Config.path+'/facturas/cierre',cierre)
				.success(function(data) {
					console.log(data);
				})
				.error(function  (data) {
					alert('Error al crear el cierre');
					console.log(data);
				})
		}
 	});