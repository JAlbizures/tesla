angular.module('angularApp')
 	.controller('EstiloCtrl',function ($scope, $modalInstance,$rootScope) {
 		//Auth.currentUser();
 		$scope.estilo = $rootScope.estilo;
 		var data = fs.readFileSync(execPath+'\\conf.json');
    	data = JSON.parse(data.toString('utf8'));
    	$scope.tamanoTitulo = data.tamanoTitulo;
    	$scope.colorFondo = data.colorFondo;
    	$scope.colorFuente = data.colorFuente;
 		$scope.cambiarCss = function () {
 			
 			var estilo = '	.navbar-nav>li>a{'+
						    'font-size: '+$scope.tamanoTitulo+'px;'+
						'}'+
						'body{'+
						 '    background: '+$scope.colorFondo+';'+
						 '    color: '+$scope.colorFuente+';'+
						'font-size: '+$scope.tamanoTitulo+'px;'+
						'}'+
						'button{'+
						// 'font-size: '+$scope.tamanoTitulo+'px !important;'+
						'}'+
						// 'button.btn:{'+
						// '    color: '+$scope.colorFuente+';'+
						// '}'+
						'input,select{'+
							'padding-top: 0 !important;'+
							'padding-bottom: 0 !important;'+
							'font-size: '+$scope.tamanoTitulo+'px !important;'+
						'}'+
						'.modal-content{'+
						//'    background: '+$scope.colorFondo+';'+
						'}';
	 		fs.writeFile(execPath+'\\estilo.especial.css',estilo,function (err) {
	 			if(err){
	 				return console.log(err);
	 			}
	 			data.tamanoTitulo = $scope.tamanoTitulo;
				data.colorFondo = $scope.colorFondo;
				data.colorFuente = $scope.colorFuente;
				fs.writeFile(execPath+'\\conf.json',JSON.stringify(data),function (err) {
					if(err){
	 					return console.log(err);
	 				}
				});
	 			$('input').css('font-size',$scope.tamanoTitulo+'px', '!important');
	 			$('body,select,button').css('font-size',$scope.tamanoTitulo+'px', '!important');
	 			$modalInstance.close();
	 			console.log("The file was saved!");
 			});
 		}
 		$scope.$watch('colorFuente',function (nVal) {
 			//alert(1);
 			$('body').css('color',nVal);
 		});
 		$scope.$watch('colorFondo',function (nVal) {
 			$('body').css('background',nVal);
 		});
 		$scope.$watch('tamanoTitulo',function (nVal) {
 			//alert('a');

 			$('input').css('font-size',nVal+'px', '!important');
	 		$('body,select,button').css('font-size',nVal+'px', '!important');
 		})
 		$scope.ok = function () {
 			$scope.cambiarCss();
			
		};

		$scope.cancel = function () {
			$scope.tamanoTitulo = data.tamanoTitulo;
			$scope.colorFondo = data.colorFondo;
			$scope.colorFuente = data.colorFuente;
			$modalInstance.dismiss();
		};
 	});