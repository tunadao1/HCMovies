var app = angular.module('app', ['ngRoute']);


app.config(function($routeProvider) {

	$routeProvider

	.when('/', {
		templateUrl : 'pages/busca.html',
		controller  : 'buscaController'
	})

	.when('/buscar', {
		templateUrl : 'pages/busca.html',
		controller  : 'buscaController'
	})

	.when('/resultado', {
		templateUrl : 'pages/resultado.html',
		controller  : 'resultadoController'
	})

	.when('/movie', {
		templateUrl : 'pages/movie.html',
		controller  : 'movieController'
	})

});


app.controller('appController', function($scope, $rootScope, $http, $location) {




});

app.controller('resultadoController', function($scope, $rootScope, $http, $location, $window) {

	if(!$rootScope.palavra){
		$location.url('/buscar');
	}else{

		$scope.page = 1;

		$scope.update = function(){

			$scope.resultado = '';

			$http.get("http://www.omdbapi.com/?s=" + $rootScope.palavra + "&plot=full&type=movie&page=" + $scope.page)
			.then(function(response) {
				$scope.resultado = response.data;
				console.log(response);
			});

		}

		$scope.update();

		$scope.abrir = function(x){

			$rootScope.imdbID = x;

			$location.url('/movie');

		}

		$scope.back = function(){

			$location.url('buscar');

		}

		$scope.toTop = function(){

			$window.scrollTo(0, angular.element(document.getElementById('view')).offsetTop);
			// $window.scrollTo(0, 0);

		}

	}

});

app.controller('buscaController', function($scope, $rootScope, $location, $http) {

	$scope.buscar = function(x){

		$rootScope.palavra = x.replace(/ /g,"+");

		$location.url('/resultado');

	}

});

app.controller('movieController', function($scope, $rootScope, $location, $http) {

	if(!$rootScope.palavra){
		$location.url('/buscar');
	}else{
		$http.get("http://www.omdbapi.com/?i=" + $rootScope.imdbID + "&plot=full")
		.then(function(response) {
			$scope.filme = response.data;
			console.log(response.data);
		});

		$scope.back = function(x){

			$location.url('/resultado');

		}
	}


});

