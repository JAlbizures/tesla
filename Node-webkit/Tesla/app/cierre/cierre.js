angular.module('angularApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cierre', {
        url: '/cierre',
        templateUrl: 'app/cierre/cierre.html',
        controller: 'CierreCtrl'
      });
  });