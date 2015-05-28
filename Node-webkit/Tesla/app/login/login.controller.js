angular.module('angularApp')
  .controller('LoginCtrl',function (Config,$scope, $rootScope, $http, $state) {
    $scope.error = null;
  	$scope.login = function (usuario,pass) {
  		$http.post(Config.path+'/usuarios/auth',{'usuario' : usuario, 'pass' : pass})
  			.success(function (data) {
          
  				console.log(data !== []);
  				if(data && data.length !== 0){
  					$rootScope.currentUser = data[0];
            if($rootScope.currentUser.rol == 'cajero'){
              $state.go("factura");  
            }else if($rootScope.currentUser.rol == 'admin' || $rootScope.currentUser.rol == 'root'){
              $state.go("usuarios");  
            }else if($rootScope.currentUser.rol == 'tecnico'){
              $state.go("pulmon");  
            }
  				}else{
            $scope.error = "Datos incorrectos";
          }
  			})
  			.error(function (data) {
  				console.log(data);
  				alert(data);
  			});
  	}
  });