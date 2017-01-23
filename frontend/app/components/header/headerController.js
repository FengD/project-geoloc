'use strict';
angular.module('geolocApp')
    .controller('headerController',  function ($scope, $rootScope, $location, $cookies) {
        $scope.logout = function(){
            $rootScope.name = null;
            $rootScope.password = null;
            $rootScope.userType = null;

            $cookies.remove('name');
            $cookies.remove('password');
            $cookies.remove('userType');
            $cookies.remove('question_step');
            $cookies.remove('photo_path');
            
            $location.path('/');
        };

        if($cookies.get('name')){
            $rootScope.name = $cookies.get('name');
            $rootScope.password = $cookies.get('password');
            $rootScope.userType = $cookies.get('userType');
            $rootScope.question_step = $cookies.get('question_step');
            $rootScope.userPhoto = $cookies.get('photo_path');
        }
    });
