'use strict';
angular.module('geolocApp')
    .controller('manageQuestionController',  function ($scope, $cookies, $http, $window, $location, $rootScope) {
    	$scope.allQuestion=[];
    	$scope.questionImage=[];
        $scope.isModify = [];
    	$scope.getAllQuestion = function(){
            $http({
                method: 'GET',
                url: 'http://localhost:8081/questions/allQuestion'
            }).then(function successCallback(success) {
                // console.log(success);
                $scope.allQuestion = success.data;
                for(var i = 0; i < success.data.length; i++){
                    $scope.isModify[i] = false;
                }
            }, function errorCallback(error) {
            	$location.path("/addQuestion");
                console.log("error");
                console.log(error);
            });
        };

        $scope.deleteQuestion = function(id){
        	$http({
                method: 'DELETE',
                url: 'http://localhost:8081/questions/' + id
            }).then(function successCallback(success) {
                // console.log(success);
                $scope.getAllQuestion();
            }, function errorCallback(error) {
                console.log("error");
                console.log(error);
            });
        };

        $scope.wantDeleteQuestion = function(index,bool){
            $scope.isModify[index] = bool;
        }

    });