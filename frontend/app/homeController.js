angular
	.module('geolocApp')
	.controller('HomeController', function($scope, $rootScope, $location) {
		$scope.startToPlay = function(){
			if($rootScope.name){
				$location.path('/map');
			}
		};
	});

