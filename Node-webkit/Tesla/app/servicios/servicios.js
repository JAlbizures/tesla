angular.module('angularApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('servicios', {
        url: '/servicios',
        templateUrl: 'app/servicios/servicios.html',
        controller: 'ServiciosCtrl'
      });
  });