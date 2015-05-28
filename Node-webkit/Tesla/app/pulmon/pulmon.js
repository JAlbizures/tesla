angular.module('angularApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pulmon', {
        url: '/pulmon',
        templateUrl: 'app/pulmon/pulmon.html',
        controller: 'PulmonCtrl'
      });
  });