// This is a super simple Hello World AngularJS App
(function() {
  angular
    .module('geolocApp', [])
    .controller('HomeController', ['$scope', function($scope) {         
      $scope.hello = 'Hello World';
    }]);
})();