angular.module('angularApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('factura', {
        url: '/factura',
        templateUrl: 'app/factura/factura.html',
        controller: 'FacturaCtrl'
      });
  });