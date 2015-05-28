angular.module('angularApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('reportes', {
        url: '/reportes',
        templateUrl: 'app/reportes/reportes.html',
        controller: 'ReportesCtrl'
      });
  });