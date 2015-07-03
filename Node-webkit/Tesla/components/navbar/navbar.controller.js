angular.module('angularApp')
  .controller('NavbarCtrl', function ($scope, $location,$rootScope, $modal) {
    $scope.menu = [];
    // $
    // $scope.$watch(function () {
    //   return $rootScope.load;
    // },function (newV,oldV) {
    //
    // });
    
    $rootScope.$watch('currentUser',function (currentUser) {
      //console.log('currentUser',currentUser);
      if(currentUser){
        $scope.menu = []
        if(currentUser.rol == 'cajero' || currentUser.rol == 'root' || currentUser.rol == 'admin'){
          $scope.menu.push({
            'name': 'factura',
            'path' : '/factura'
          });
          $scope.menu.push({
            'name': 'facturas',
            'path' : '/facturas'
          });
          $scope.menu.push({
            'name': 'cierre',
            'path' : '/cierre'
          });
        }
        if(currentUser.rol == 'tecnico' || currentUser.rol == 'root' || currentUser.rol == 'admin'){
           $scope.menu.push({
            'name': 'pulmon',
            'path' : '/pulmon'
          });
        }
        if(currentUser.rol == 'admin' || currentUser.rol == 'root'){
          $scope.menu.push({
            'name': 'usuarios',
            'path' : '/usuarios'
          });
          $scope.menu.push({
            'name': 'Forma Pago',
            'path' : '/formaPago'
          });
          $scope.menu.push({
            'name': 'servicios',
            'path' : '/servicios'
          });
          $scope.menu.push({
            'name': 'reportes',
            'path' : '/reportes'
          });
          $scope.menu.push({
            'name' : 'configuracion',
            'path' : '/configuracion'
          })
        }

        // $scope.menu.push({
        //     'name': 'estilo',
        //     'path' : '/estilo'
        //   });

      }
    });
    // $scope.menu = [{
    //   'usuarios': '/usuarios',
    // }];

    $scope.cambiarEstilo = function () {
      var modalServicios = $modal.open({
        templateUrl : 'estilo.html',
        controller : 'EstiloCtrl',
        // size :'sm',
        resolve : {
          servicios : function () {
            return $scope.servicios;
          }
        }

      });
      modalServicios.result.then(function (servicio) {
        $scope.newServicio = servicio;
        console.log($scope.newServicio);
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
      });
    }
    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      //console.log(route);
      //console.log($location.path());
      return route === $location.path();
    };
    $scope.cerrarSesion = function () {
      //alert(0);
      console.log('salio');
      win.reload();
    }
  });
