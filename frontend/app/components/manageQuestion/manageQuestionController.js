'use strict';
angular.module('geolocApp')
    .controller('manageQuestionController',  function (NgTableParams,$scope, $cookies, $http, $window, $location, $rootScope, Server) {
    	$scope.allQuestion=[];
    	$scope.questionImage=[];
        $scope.isModify = [];
        $scope.isDelete = [];

    	$scope.getAllQuestion = function(){
            $http({
                method: 'GET',
                url: Server.getUrl() + ':8081/questions/allQuestion'
            }).then(function successCallback(success) {
                // console.log(success);
                $scope.allQuestion = success.data;
                for(var i = 0; i < success.data.length; i++){
                    $scope.isModify[i] = false;
                    $scope.isDelete[i] = false;
                }
                $scope.manageQuestionTable = new NgTableParams({count: 5 }, { data:$scope.allQuestion});
                // console.log($scope.defaultConfigTableParams);
            }, function errorCallback(error) {
            	$location.path("/addQuestion");
                console.log("error");
                console.log(error);
            });
        };

        $scope.deleteQuestion = function(id){
        	$http({
                method: 'DELETE',
                url: Server.getUrl() + ':8081/questions/' + id
            }).then(function successCallback(success) {
                // console.log(success);
                $scope.getAllQuestion();
            }, function errorCallback(error) {
                console.log("error");
                console.log(error);
            });
        };

        $scope.wantModify = function(index){
            $scope.isModify[index] = true;
        };

        $scope.cancelModify = function(index){
            $scope.isModify[index] = false;
        };

        $scope.confirmModify = function(index){
            $scope.isModify[index] = false;
        }

    });