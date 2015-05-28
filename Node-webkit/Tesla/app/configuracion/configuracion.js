angular.module('angularApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('configuracion', {
        url: '/configuracion',
        templateUrl: 'app/configuracion/configuracion.html',
        controller: 'configuracionCtrl'
      });
  });