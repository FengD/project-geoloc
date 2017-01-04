'use strict';
angular.module('geolocApp')
    .controller('headerController',  function ($scope, $rootScope, $cookies) {

        $scope.logout = function(){
            $rootScope.name = null;
            $rootScope.password = null;
            $cookies.remove('nickname');
            $cookies.remove('password');
        };
    });
