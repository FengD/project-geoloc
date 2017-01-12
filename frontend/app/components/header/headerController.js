'use strict';
angular.module('geolocApp')
    .controller('headerController',  function ($scope, $rootScope, $location, $cookies) {
        $scope.logout = function(){
            $rootScope.name = null;
            $rootScope.password = null;
            $rootScope.userType = null;

            $cookies.remove('nickname');
            $cookies.remove('password');
            $cookies.remove('userType');
            $cookies.remove('question_step');
            $location.path('/');
        };
    });
