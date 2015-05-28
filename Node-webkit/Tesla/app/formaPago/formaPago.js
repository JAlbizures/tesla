angular.module('angularApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('formaPago', {
        url: '/formaPago',
        templateUrl: 'app/formaPago/formaPago.html',
        controller: 'FormaPagoCtrl'
      });
  });