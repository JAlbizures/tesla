angular.module('angularApp')
  .controller('UsuariosCtrl',function ($state,Auth,$http,$scope,Config) {
    $scope.estado = true;
    $scope.usuarioValido = true;
  	$scope.usuarios = [];
  	Auth.currentUser();
  	$http.get(Config.path+'/usuarios/')
  		.success(function (data) {
        //console.log(data);
  			$scope.usuarios = data;
  		})
  		.error(function (data) {
  			console.log(data);
  			alert(data);
  		});

    $scope.terminarEdit = function (usuario) {
      
      $scope.estado = false;
      $http.put(Config.path+'/usuarios/',usuario)
        .success(function (data) {
          //console.log(data);
          $scope.usuarios = data; 
          $scope.estado = true;
        })
        .error(function (data) {
          console.log(data);
          alert(data);
           $scope.estado = false;
        });
    }
    $scope.editar = function (usuario) {
      $scope.updateUsuario = usuario;
      $scope.estado = false;
    }
    $scope.eliminar = function (id) {
      $http.delete(Config.path+'/usuarios/:id?id='+id)
        .success(function (data) {
          //console.log(data);
          $scope.usuarios = data;
        })
        .error(function (data) {
          console.log(data);
          alert(data);
        });
    }
  	$scope.agregarUsuario = function (usuario) {
  		$scope.usuario = {rol : 'cajero'};
  		$http.post(Config.path+'/usuarios/crear',usuario)
  			.success(function (data) {
  				console.log(data);
          $scope.usuarios = data;
  			})
  			.error(function  (data) {
  				console.log(data);
  				alert(data);
  			})
  	}
    $scope.$watch('usuario.usuario',function(newV){

      $scope.usuarioValido = true;
      for (var i = $scope.usuarios.length - 1; i >= 0; i--) {
        if($scope.usuarios[i].usuario.toLocaleLowerCase() == newV.toLocaleLowerCase()){
          //alert('');
          $scope.usuarioValido = false;
        }
      };
    });
    $scope.$watch('updateUsuario.usuario',function(newV){

      $scope.usuarioValido = true;
      for (var i = $scope.usuarios.length - 1; i >= 0; i--) {
        if($scope.usuarios[i].usuario.toLocaleLowerCase() == newV.toLocaleLowerCase() && $scope.usuarios[i].idUsuarios != $scope.updateUsuario.idUsuarios){
          //alert('');
          $scope.usuarioValido = false;
        }
      };
    });
  });