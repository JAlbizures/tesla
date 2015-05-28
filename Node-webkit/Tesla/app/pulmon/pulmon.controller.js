
angular.module('angularApp')
 	.controller('PulmonCtrl',function (Auth, Config, $scope,socketFactory,win,$rootScope,$http, $timeout) {
 		Auth.currentUser();

 		//$scope.cola = [];

 		console.log($rootScope.path);
 		
		// socket = socketFactory({
		// 	ioSocket: io.connect(Config.path)
		// });
		socket = io.connect(Config.path);
		socket.on('servicios',function (data) {
		
			//data[0].open = true;
			$scope.cola = angular.copy(data);
			$scope.$digest();
			//console.log('servicios',$scope.cola);
			//console.log($scope.cola);
		});

 		socket.on('nuevoServicio',function  (data) {
 			win.focus();
 			//win.maximize();
 			console.info('nuevoServicio');
 			$scope.cola.push(data);
 			$scope.$digest();

 			//alert('adsf');
 		});
 		$rootScope.$on('$stateChangeStart',function (evet,toState,toParams,formState, fromParams) {
 			//console.log('toState',toState);
 			if(toState.name=="pulmon"){
 				console.log('emitio');
 				socket.emit('getServicios',{});
 			}
 		})
 		$scope.terminarServicio = function (index) {
 			//console.log($scope.cola);
 			//$scope.cola.splice(index,1);
 			$http.put(Config.path+'/facturas/cambiarEstado/',$scope.cola[index])
 				.success(function(data) {
 					sessionStorage.setItem('dataPulmon',JSON.stringify($scope.cola[index]));
		 				window.open('printPulmon.html',{
		 					"width" : 1700,
		 					"min_width" : 1700,
		 					"max_width" : 1700,
		 					"toolbar": false,
  							"frame": true
		 				});
 					//$scope.cola = data;
 					console.log(data);
 				})
 				.error(function  (data) {
 					alert(data);
 					console.log(data);
 				});
 			//console.log($scope.cola);
 		}
 		$scope.refrescar = function () {
 			socket.emit('getServicios',{});
 		};
 		//$scope.refrescar();
 	});