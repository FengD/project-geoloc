'use strict';
angular.module('geolocApp', []).controller('questionnaireController', ["$scope", "$http",  function ($scope, $http) {
    $scope.allQuestion = [];
    $scope.oneQuestion = [];
    $scope.oneQuestion.choices = [];
    $scope.oneQuestion.hasChoices = [];
    $scope.oneQuestion.comments = [];
    $scope.oneQuestion.hasComments = [];
    $scope.questionSideBar = false;
    
    $scope.getAllQuestion = function() {
        $http({
            method : "GET",
            url : "http://10.212.117.220:8081/questions/allQuestion",
        }).then(function mySucces(response) {
            $scope.allQuestion = response.data;
            console.log("Get All Questions Successful");
        }, function myError(response) {
            $scope.questions = response.statusText;
        });
    };
    
    $scope.getOneQuestion = function(id) {
        $http({
            method : "POST",
            url : "http://10.212.117.220:8081/questions/" + id,
        }).then(function mySucces(response) {
            $scope.oneQuestion = response.data;
            // oneQuestion.choices
            $scope.oneQuestion.choices = response.data.choices;
            if($scope.oneQuestion.choices != null) {
                $scope.oneQuestion.hasChoices = true;
            }else {
                $scope.oneQuestion.hasChoices = false;
            }
            // oneQuestion.comments
            $scope.oneQuestion.comments = response.data.comments;
            if($scope.oneQuestion.comments.length != 0) {
                $scope.oneQuestion.hasComments = true;
            }else {
                $scope.oneQuestion.hasComments = false;
            }
            $scope.questionSideBar = true;
            console.log("Get Question 01 Successful");
        }, function myError(response) {
            $scope.questions = response.statusText;
        });
    };
}]);