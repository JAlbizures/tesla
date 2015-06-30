
angular.module('angularApp')
 	.controller('FacturaCtrl',function ($state,Auth,$http,$scope, Config,$modal,$rootScope) {
		Auth.currentUser();
		$scope.numeroValido = false;
		$scope.factura = {};
		$scope.factura.fecha = dateNow();
		$scope.factura.numero;
		$scope.factura.serie;
		$scope.serviciosFactura = [];
		$scope.servicios = [];
		$scope.formaPago = [];
		$scope.editando = false;
		$scope.correlativo = {};
		
		for(index in Config.list){
			if(Config.list[index].tipo == 'checkbox'){
				$scope[Config.list[index].nombre] = Config.list[index].dato;
			}
		}
		console.log('$scope',$scope);
		//$scope.factura.fecha = Date.now();
		$scope.newServicio = {};
		$http.get(Config.path+'/servicios/precios/all')
			.success(function (data) {

				$scope.precios = data;
				//console.log($scope.precios);
			})
			.error(function (data) {
				console.log(data);
				alert(data);
			});
		$http.get(Config.path+'/facturas/correlativo')
			.success(function (data) {
				console.log(data);
				$scope.factura.numero = data[0].numero_actual;
				$scope.factura.serie = data[0].serie;
				//$scope.correlativo  = data;
			})
			.error(function (data) {
				console.log(data);
				alert(data);
			})
		$http.get(Config.path+'/formaPago/')
			.success(function (data) {
				//console.log('formaPago');
				//console.log(data);
				$scope.formaPago.length = 0;
				$scope.formaPago = data;
				$scope.factura.formaPago = $scope.formaPago[0];
			})
			.error(function (data) {
				console.log(data);
				alert(data);
			})
		$http.get(Config.path+'/servicios/')
			.success(function (data) {
	    		//console.log(data);
				prueba = $scope.servicios = data;
			})
			.error(function (data) {
				console.log(Config);

				alert(data);
			});
		$scope.$watch('factura.numero',function (newV) {
			
			// for(item in $scope.correlativo){
			// 	if($scope.correlativo[item].numero == newV && $scope.correlativo[item].serie == $scope.factura.serie ){
			// 		$scope.numeroValido = true;
			// 		break;
			// 	}else if($scope.correlativo.length == (parseInt(item)+1)){
			// 		$scope.numeroValido = false;
			// 	}
			// }
		});
		$scope.$watch('factura.serie',function (newV) {
			
			// for(item in $scope.correlativo){
			// 	if($scope.correlativo[item].numero ==  $scope.factura.numero && $scope.correlativo[item].serie == newV ){
			// 		$scope.numeroValido = true;
			// 		break;
			// 	}else if($scope.correlativo.length == (parseInt(item)+1)){
			// 		$scope.numeroValido = false;
			// 	}
			// }
		});
		$scope.$watch('factura.formaPago',function (newV, oldV) {
			if(newV !== oldV){
				if($scope.newServicio.precio != null){
					$scope.newServicio.precio = parseFloat($scope.precios[$scope.newServicio.idServicio][$scope.factura.formaPago.idFormaPago]);
				}
				for (var i = $scope.serviciosFactura.length - 1; i >= 0; i--) {
					$scope.serviciosFactura[i].precio =  parseFloat($scope.precios[$scope.serviciosFactura[i].idServicio][$scope.factura.formaPago.idFormaPago]);
					if(isNaN($scope.serviciosFactura[i].precio)){
						$scope.serviciosFactura.splice(i,1);
					}
				};
				$scope.factura.monto = 0;
				for(var index in $scope.serviciosFactura){
					console.log($scope.factura.monto);	
					$scope.factura.monto += ($scope.serviciosFactura[index].precio*$scope.serviciosFactura[index].cantidad);
				}
				
				$scope.factura.monto = parseFloat($scope.factura.monto.toFixed(2));
			}
		});
		$scope.$watch('newServicio.idServicio',function (idServicio,old) {
			
			if(idServicio !== old){
				
				for(var item in $scope.servicios){
				if($scope.servicios[item].idServicio == idServicio){
					$scope.newServicio.idServicio = $scope.servicios[item].idServicio;
					$scope.newServicio.cantidad = 1;
					$scope.newServicio.nombre = $scope.servicios[item].nombre;
					$scope.newServicio.precio = parseFloat($scope.precios[$scope.newServicio.idServicio][$scope.factura.formaPago.idFormaPago]);
					break;
				}else{
					$scope.newServicio.nombre = null;
					$scope.newServicio.precio = null;
				}
			}
		}});



		$scope.agregar = function (servicio) {
			console.log('agregar',$scope.serviciosFactura);
			for(var index in $scope.serviciosFactura){
				//console.log($scope.serviciosFactura[index]);
				if($scope.serviciosFactura[index].idServicio == servicio.idServicio){
					$scope.serviciosFactura[index].cantidad += servicio.cantidad;
					$scope.factura.monto = 0;
					for(var index in $scope.serviciosFactura){
						$scope.factura.monto += ($scope.serviciosFactura[index].precio*$scope.serviciosFactura[index].cantidad);
					}
					$scope.factura.monto = parseFloat($scope.factura.monto.toFixed(2));
					$scope.newServicio = {};
					return; 
				}
			}
			//console.log(Config.list[0].dato);
			if($scope.serviciosFactura.length < parseInt(Config.list[0].dato)){

				//console.log('paso');
				// $scope.serviciosFactura.push({
				// 		idServicio : servicio.idServicio,
				// 		nombre : servicio.nombre,
				// 		precio : servicio.precio,
				// 		cantidad : servicio.cantidad
				// 	});
				$scope.serviciosFactura.push(angular.copy(servicio));
				$scope.factura.monto = 0;
				for(var index in $scope.serviciosFactura){
					$scope.factura.monto += ($scope.serviciosFactura[index].precio*$scope.serviciosFactura[index].cantidad);
				}
				$scope.factura.monto = parseFloat($scope.factura.monto.toFixed(2));
				$scope.newServicio = {};
			}
		}
		$scope.editar = function (index) {
			console.log('angular',index);
			$scope.editando = true;
			$scope.editServicio =  angular.copy($scope.serviciosFactura[index]);
			$scope.editServicio.index = index;
			$scope.cancelarEdit =function () {
				
				$scope.editando = false;
				$scope.editServicio =  {};	
			}
			$scope.aceptarEdit = function (index) {
				console.log($scope.editServicio, index,$scope.serviciosFactura,$scope.serviciosFactura[index]);
				$scope.serviciosFactura[index].cantidad = $scope.editServicio.cantidad;
				
				$scope.editando = false;
				$scope.factura.monto = 0;
				for(var index in $scope.serviciosFactura){
					console.log($scope.serviciosFactura[index]);
					$scope.factura.monto += ($scope.serviciosFactura[index].precio*$scope.serviciosFactura[index].cantidad);
					$scope.factura.monto = parseFloat($scope.factura.monto.toFixed(2));
				}
				$scope.editServicio =  {};	

			}
		}

		$scope.eliminar = function (index) {
			
			//for(var index in $scope.servicios){
			//	if($scope.servicios[index].idServicio == idServicio){
					
			$scope.serviciosFactura.splice(index,1);
			console.log($scope.serviciosFactura);
			$scope.factura.monto = 0;
			for(var index in $scope.serviciosFactura){
				console.log($scope.serviciosFactura[index]);
				$scope.factura.monto += ($scope.serviciosFactura[index].precio*$scope.serviciosFactura[index].cantidad);
				$scope.factura.monto = parseFloat($scope.factura.monto.toFixed(2));
			}
			//	}
			//}
		}
		$scope.terminarFactura = function (factura) {
			var texto = "";
			factura.faturaDetalle = $scope.serviciosFactura;
			factura.usuario = $rootScope.currentUser.idUsuarios;
				//console.log(data);
			if($scope.factura.formaPago.nombre.toLocaleLowerCase() == 'contado'.toLocaleLowerCase() || $scope.factura.formaPago.nombre.toLocaleLowerCase() == 'tarjeta de credito'.toLocaleLowerCase()){

					//sessionStorage.setItem('dataFactura',JSON.stringify(factura));
 				var win = gui.Window.open('printFactura.html',{
 					"width" : 800,
 					"min_width" : 800,
 					"max_width" : 800,
 					"toolbar": true,
						"frame": true
 				});
 				factura.path = Config.path;
 				factura.nUsuario = $rootScope.currentUser.usuario;
 				localStorage.dataFactura = JSON.stringify(factura);
 				//win.eval(null,'sessionStorage.setItem(\'dataFactura\', \''+JSON.stringify(factura)+'\');')
 				win.on('close', function() {
					this.hide(); // Pretend to be closed already
					this.close(true);
					console.log(localStorage.dataFactura);
	  				if(localStorage.dataFactura == ""){
						//$scope.correlativo  = data;
	  					$scope.limpiar();
	  					$http.get(Config.path+'/facturas/correlativo')
							.success(function (data) {
								console.log(data);
								$scope.factura.numero = data[0].numero_actual;
								$scope.factura.serie = data[0].serie;
							})
						.error(function (data) {
							console.log(data);
							alert('error al traer la nueva serie y numero de factura');
						});
	  				}
	  				
				});
			}else if(confirm("Desea terminar")){
				factura.nUsuario = $rootScope.currentUser.usuario;
				$http.post(Config.path+'/facturas/crear',factura)
		  			.success(function (result) {
						$scope.limpiar();
	  					$http.get(Config.path+'/facturas/correlativo')
							.success(function (data) {
								console.log(data);
								$scope.factura.numero = data[0].numero_actual;
								$scope.factura.serie = data[0].serie;
							})
					})
					.error(function(data){
						alert("Error al guardar");
						console.log(data);
					});
			}
		}
		$scope.limpiar = function  () {
			$scope.serviciosFactura = [];
			$scope.factura = {};
			$scope.factura.fecha = dateNow();
			$scope.factura.formaPago = $scope.formaPago[0];
			$scope.factura.telefono = -10;
			$scope.factura.edad = -10;
		}
		$scope.showServicios = function () {
			var modalServicios = $modal.open({
				templateUrl : 'modalService.html',
				controller : 'ModalServiciosCtrl',
				// size :'sm',
				resolve : {
					servicios : function () {
						return $scope.servicios;
					},
					precios : function () {
						return $scope.precios;
					},
					formaPago : function () {
						return $scope.factura.formaPago;
					}
				}

			});
			modalServicios.result.then(function (servicio) {
				servicio.precio = parseFloat($scope.precios[servicio.idServicio][$scope.factura.formaPago.idFormaPago]);
				//$scope.newServicio = angular.copy(servicio);
				var newServicio = angular.copy(servicio);
				newServicio.cantidad = 1;
				$scope.agregar(newServicio);
				//console.log($scope.newServicio);
				//$scope.newServicio.precio = 
				//console.log($scope.newServicio);
			}, function () {
				//$log.info('Modal dismissed at: ' + new Date());
			});
			return false;
		}
		$scope.$watch('factura.paciente',function (newVal) {
			$scope.factura.nombre = $scope.factura.paciente;
		});
		$scope.imprimir = function  () {
			var doc = new pdf({
				// size : [600,400],
				margins: {
					top: 0, 
					bottom: 0,
					left: 0,
					right: 0
				}
			});
			doc.pipe(fs.createWriteStream('output.pdf'));
			
			doc.text($scope.factura.nombre,0,0);
			doc.text($scope.factura.direccion,0,10);
			doc.text($scope.factura.fecha,0,20);
			doc.text($scope.factura.nit,0,30);
			doc.text($scope.factura.monto,0,40);
			//doc.text('.',600,400);
			console.log(doc.end);
			doc.end();
			setTimeout(function () {
				var print = edge.func(function() {/*
					using System;
				    using System.Threading.Tasks;
					using System.Diagnostics;
				    public class Startup
				    {
				        public async Task<object> Invoke(dynamic path)
				        {
				            Process p = new Process();
				            p.StartInfo = new ProcessStartInfo()
				            {
				               	CreateNoWindow = true,
				                Verb = "print",
				                WindowStyle = ProcessWindowStyle.Hidden,
				                FileName = @"D:\\webkit\\node-webkit-v0.8.6-win-ia32\\webkit\\output.pdf"
				            };
				           	p.Start();
				           	p.WaitForInputIdle();
							System.Threading.Thread.Sleep(5000);
							if (false == p.CloseMainWindow())
								p.Kill();
				            return 0;//(string)path;
				        }
				    }
				*/});
				print(function (error,result) {
					if (error) throw error;
	    			console.log(result);
				});
			},100);
		
		}
  	});

