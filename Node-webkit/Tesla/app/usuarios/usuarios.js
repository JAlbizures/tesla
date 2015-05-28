angular.module('angularApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('usuarios', {
        url: '/usuarios',
        templateUrl: 'app/usuarios/usuarios.html',
        controller: 'UsuariosCtrl'
      });
  });