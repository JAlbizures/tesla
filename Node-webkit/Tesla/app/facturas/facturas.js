angular.module('angularApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('facturas', {
        url: '/facturas',
        templateUrl: 'app/facturas/facturas.html',
        controller: 'FacturasCtrl'
      });
  });