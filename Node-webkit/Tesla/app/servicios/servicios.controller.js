angular.module('angularApp')
  .controller('ServiciosCtrl',function ($state,Auth,$http,$scope,Config, $modal) {
	$scope.estado = true;
  	$scope.servicios = [];
  	Auth.currentUser();
  	$http.get(Config.path+'/servicios/')
  		.success(function (data) {
        //console.log(data);
  			$scope.servicios = data;
  		})
  		.error(function (data) {
  			console.log(data);
  			alert(data);
  		});
  	$scope.terminarEdit = function (servicio) {
       $scope.updateServicio = {};
      $scope.estado = false;
      $http.put(Config.path+'/servicios/',servicio)
        .success(function (data) {
          //console.log(data);
          $scope.servicios = data; 
          $scope.estado = true;
        })
        .error(function (data) {
          console.log(data);
          alert(data);
           $scope.estado = false;
        });
    };
    $scope.editarPrecio = function (servicio) {
      var modalServicios = $modal.open({
        templateUrl : 'modalServicePrecio.html',
        controller : 'ModalServiciosPrecioCtrl',
        // size :'sm',
        resolve : {
        servicio : function () {
          return servicio;
          }
        }

        });
      modalServicios.result.then(function (servicio) {
        $scope.newServicio = servicio;
        //console.log($scope.newServicio);
        }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
      });
      return false;
    };
    $scope.editar = function (servicio) {
      $scope.updateServicio = angular.copy(servicio);
      $scope.estado = false;
    };
    $scope.eliminar = function (id) {
      $http.delete(Config.path+'/servicios/:id?id='+id)
        .success(function (data) {
          //console.log(data);
          $scope.servicios = data;
        })
        .error(function (data) {
          console.log(data);
          alert(data);
        });
    };
  	$scope.agregarServicio = function (servicio) {
  		$scope.servicio = {};
  		//console.log(servicio);
  		$http.post(Config.path+'/servicios/crear',servicio)
  			.success(function (data) {
  				$scope.servicios = data;
          $scope.servicio.tecnico = false;
  				console.log(data);
  			})
  			.error(function  (data) {
  				console.log(data);
  				alert(data);
  			})
  	}


  });