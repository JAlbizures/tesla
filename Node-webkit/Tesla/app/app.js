angular.module('angularApp', [
  'ui.router',
  'ui.bootstrap',
  'ngGrid',
  'btford.socket-io'
]).config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/login');

    $locationProvider.html5Mode(false);
  }).
	run(function ($rootScope,$location,$state, $http ) {
    var data = fs.readFileSync(execPath+'\\conf.json');
    data = JSON.parse(data.toString('utf8'));
    $rootScope.estilo = data.estilo;
    var path = $rootScope.path = data.serverPath;
    $rootScope.config = [];
		$http.get(path+'/config')
      .success(function (data) {
        console.log('configuracion',data);
        for(var index in data){
        	var temp = {};
          temp.idConfig = data[index].idConfig;
        	temp.nombre = data[index].nombre;
        	temp.tipo = data[index].tipo;
          temp.titulo = data[index].titulo;
        	if(data[index].tipo == 'number'){
        		temp.dato = parseInt(data[index].dato);
        	} else if(data[index].tipo == 'checkbox'){
        		console.log(data[index].dato);
        		
        		temp.dato = 'true' == data[index].dato;
        	} else if(data[index].tipo == 'text'){
             temp.dato = data[index].dato
          }

          if(data[index].nombre == "tituloVentana"){

            $rootScope.titulo = data[index].dato;
            document.title =  data[index].dato;
          }
          $rootScope.config.push(temp);
        }	
      })
      .error(function (data) {
        console.log(data);
        alert(data);
        });

		$rootScope.$watch('currentUser', function(currentUser) {
			if (!currentUser  && (['/login'].indexOf($location.path()) == -1 )) {
				console.log("cambio a login");
				$state.go("login");
			}
		});
	})
	.filter('titleCase', function() {
    	return function(input) {
      input = input || '';
      return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    	};
  	})
  .factory('Config', function ($rootScope) {	
  	   var list = $rootScope.config;
  		return {
        'list' :list,
        'path' : $rootScope.path,
        'update' : function  (configuracion) {
          console.log('cambio',list);
          list = configuracion;
        }
      };
  	})
  // 	.factory('socket', function (socketFactory , $rootScope) {
  // 		//console.log($rootScope.path);
  // 		mySocket = socketFactory({
		//     ioSocket: io.connect($rootScope.path)
		//   });
  // 		return mySocket;
		// })
    .factory('win',function () {
      var gui = require('nw.gui');
      var win = gui.Window.get();

      return win;
    })
    .directive('capitalizeFirst', function(uppercaseFilter, $parse) {
     return {
       require: 'ngModel',
       link: function(scope, element, attrs, modelCtrl) {
          
         modelCtrl.$parsers.push(function (inputValue) {

           var transformedInput = inputValue.toLowerCase(); 
               transformedInput = transformedInput.charAt(0).toUpperCase() +
                               transformedInput.substring(1);
           if (transformedInput!=inputValue) {
             modelCtrl.$setViewValue(transformedInput);
             modelCtrl.$render();
           }         
          
           //alert(transformedInput);
           return transformedInput;         
         });
       }
     };
    }).filter('searchfilter', function() {
      return function(input, term) {
        var regex = new RegExp(term || '', 'i');
        var obj = {};
        angular.forEach(input, function(v, i){
          if(regex.test(v['nombre'] + '')){
            obj[i]=v;
          }
        });
        return obj;
      };
    });

function dateNow () {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd='0'+dd
  } 

  if(mm<10) {
      mm='0'+mm
  } 
  return yyyy+'-'+mm+'-'+dd;
}