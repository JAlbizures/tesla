angular.module('angularApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('estilo', {
        url: '/estilo',
        templateUrl: 'app/estilo/estilo.html',
        controller: 'EstiloCtrl'
      });
  });