angular
	.module('geolocApp')
	.controller('HomeController', function($scope, $rootScope, $location, $cookies, Server) {
		$scope.startToPlay = function(){
			if($rootScope.name){
				$location.path('/map');
			}
		};

		$scope.serverUrl = Server.getUrl();
		console.log($scope.serverUrl);

		// console.log($cookies.get("name"));
	});

