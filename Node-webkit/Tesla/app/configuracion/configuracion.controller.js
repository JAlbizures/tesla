
angular.module('angularApp')
 	.controller('configuracionCtrl',function (Auth, Config, $scope, $http,$rootScope, $timeout) {
 		Auth.currentUser();
 		$scope.guardado = false;
 		$scope.configuracion = {};
 		console.log(Config.list);
 		
 		$scope.configuracionOrder = function  () {
	 		for(var index in Config.list){
	 			$scope.configuracion[Config.list[index].nombre] = {};
	 			$scope.configuracion[Config.list[index].nombre].dato = Config.list[index].dato;
	 			$scope.configuracion[Config.list[index].nombre].titulo =  Config.list[index].titulo;
	 			$scope.configuracion[Config.list[index].nombre].idConfig =  Config.list[index].idConfig;
	 		}	
 		}
 		$scope.configuracionOrder();
 		console.log(Config.list)

 		$scope.config = Config.list;
 		console.log($scope.config);

 		$scope.guardarConfiguracion = function  (config) {
 			$http.put(Config.path+'/config',config)
 				.success(function (data) {
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
							console.log(data[index].dato);
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
					Config.update($rootScope.config);
					$scope.configuracionOrder();
					$scope.guardado = true;
					$timeout(function () {
						$scope.guardado = false;
					}, 500);	
				})
 				.error(function (data) {
 					alert(data);
 					console.log(data);
 				});
 		}
 	});