'use strict';
angular.module('geolocApp')
    .controller('loginController',  function ($scope, $cookies, $http, $window, $location, $rootScope, Server) {
    	$scope.usericonhide = true;
    	$scope.passiconhide = true;
    	$scope.name = "";
    	$scope.password = "";

    	$scope.isLogin = true;

        $scope.init = function () {
        };

    	$scope.userIconChange = function(bool){
    		$scope.usericonhide = bool;
    	};

    	$scope.passIconChange = function(bool){
    		$scope.passiconhide = bool;
    	};

    	$scope.signUp = function(){
            $http({
                method: 'POST',
                url: Server.getUrl() + ':8080/users',
                data: {
                    name: $scope.name,
                    password: $scope.password
                }
            }).then(function successCallback(success) {
                    //coucou soloe
                console.log(success);
                $scope.isLogin = true;
            }, function errorCallback(error) {
                console.log("error");
                console.log(error);
            });
        };

       $scope.login = function(){
            $http({
                method: 'POST',
                url: Server.getUrl() + ':8080/users/' + $scope.name,
                data: {
                    password: $scope.password
                }
            }).then(function successCallback(success) {
                console.log(success);
                var now = new $window.Date(),
                // this will set the expiration to 6 months
                exp = new $window.Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
                $cookies.put('name', success.data.name, {expires: exp});
                $cookies.put('password', success.data.password, {expires: exp});
                $cookies.put('question_step', success.data.question_step, {expires: exp});
                $cookies.put('current_chance', success.data.current_chance, {expires: exp});
                $cookies.put('photo_path', success.data.photo_path, {expires: exp});
                console.log(success.data.question_step);
                console.log(success.data.user_type);
                $cookies.put('userType', success.data.user_type, {expires: exp});
                $rootScope.name = success.data.name;
                $rootScope.password = success.data.password;
                $rootScope.userType = success.data.user_type;
                $rootScope.question_step = success.data.question_step;
                $rootScope.userPhoto = success.data.photo_path;
                $location.path('/');

            }, function errorCallback(error) {
                console.log("error");
                console.log(error);
            });
        };

        // $scope.signOut = function(){
        //     $http({
        //         method: 'POST',
        //         url: Server.getUrl() + ':8080/users/' + $scope.name,
        //         data: {
        //             password: $scope.password
        //         }
        //     }).then(function successCallback(success) {
        //         console.log(success);
        //         var now = new $window.Date(),
        //         // this will set the expiration to 6 months
        //         exp = new $window.Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
        //         $cookies.put('name', $scope.name, {expires: exp});
        //         $cookies.put('password', $scope.password, {expires: exp});
        //     }, function errorCallback(error) {
        //         console.log("error");
        //         console.log(error);
        //     });
        // };
       
    });
