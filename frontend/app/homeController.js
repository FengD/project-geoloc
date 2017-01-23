angular
	.module('geolocApp')
	.controller('HomeController', function($scope, $rootScope, $location, $cookies) {
		$scope.startToPlay = function(){
			if($rootScope.name){
				$location.path('/map');
			}
		};

		// console.log($cookies.get("name"));
	});

