
angular.module('angularApp')
 	.controller('configuracionCtrl',function (Auth, Config, $scope, $http,$rootScope, $timeout) {
 		Auth.currentUser();
 		$scope.guardado = false;
 		$scope.configuracion = {};
 		console.log(Config.list);
 		
 		$scope.configuracionOrder = function  () {
	 		for(var index in $rootScope.config){
	 			$scope.configuracion[$rootScope.config[index].nombre] = {};
	 			$scope.configuracion[$rootScope.config[index].nombre].dato = $rootScope.config[index].dato;
	 			$scope.configuracion[$rootScope.config[index].nombre].titulo =  $rootScope.config[index].titulo;
	 			$scope.configuracion[$rootScope.config[index].nombre].idConfig =  $rootScope.config[index].idConfig;
	 		}	
 		}
 		$scope.configuracionOrder();
 		console.log(Config.list)

 		$scope.config = Config.list;
 		console.log($scope.config);

 		$scope.guardarConfiguracion = function  (config) {
 			$http.put(Config.path+'/config',config)
 				.success(function (data) {
 					console.info(data);
 					$rootScope.config = [];
 					for(var index in data){
						var temp = {};
						temp.idConfig = data[index].idConfig;
						temp.nombre = data[index].nombre;
						temp.tipo = data[index].tipo;
						temp.titulo = data[index].titulo;
						
						if(data[index].tipo == 'number'){
							temp.dato = parseInt(data[index].dato);
						} else if(data[index].tipo == 'checkbox'){
							
							temp.dato = 'true' == data[index].dato;
						} else if(data[index].tipo == 'text'){
							temp.dato = data[index].dato
						}
						if(data[index].nombre == "tituloVentana"){
							$rootScope.titulo = data[index].dato;
							document.title =  data[index].dato;
						}
						$rootScope.config.push(temp);
					}
					console.warn($rootScope.config);
					Config.update($rootScope.config);
					$scope.configuracionOrder();
					$scope.guardado = true;
					$timeout(function () {
						$scope.guardado = false;
					}, 5000);	
				})
 				.error(function (data) {
 					alert(data);
 					console.log(data);
 				});
 		}
 	});