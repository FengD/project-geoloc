'use strict';
angular.module('geolocApp')
    .controller('manageUserController',  function ($scope, $cookies, $http, $window, $location, $rootScope,NgTableParams) {
    	$scope.allUser=[];
        $scope.isDelete = [];
    	$scope.getAllUser = function(){
            $http({
                method: 'GET',
                url: 'http://localhost:8080/users/allUser'
            }).then(function successCallback(success) {
                // console.log(success);
                $scope.allUser = success.data;
                for(var i = 0; i < success.data.length; i++){
                    $scope.isDelete[i] = false;
                }
                $scope.manageUserTable = new NgTableParams({count: 5 }, { data:$scope.allUser});
                
            }, function errorCallback(error) {
            	$location.path("/");
                console.log("error");
                console.log(error);
            });
        };

        $scope.deleteUser = function(id){
        	$http({
                method: 'DELETE',
                url: 'http://localhost:8080/users/' + id
            }).then(function successCallback(success) {
                // console.log(success);
                $scope.getAllUser();
            }, function errorCallback(error) {
                console.log("error");
                console.log(error);
            });
        };

    });