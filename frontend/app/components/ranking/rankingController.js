'use strict';
angular.module('geolocApp')
    .controller('rankingController',  function ($scope, $cookies, $http, $window, $location, $rootScope,NgTableParams, Server) {
    	$scope.allUser=[];
    	$scope.getAllUser = function(){
            $http({
                method: 'GET',
                url: Server.getUrl() + ':8080/users/allUser'
            }).then(function successCallback(success) {
                // console.log(success);
                $scope.allUser = success.data;
                $scope.manageUserTable = new NgTableParams({count: 5 ,sorting: { question_step: "desc", timeUse : "asc" }}, { data:$scope.allUser});
                
                for(var i=0;i < $scope.allUser.length;i++){
                    // console.log($scope.allUser[i]);
                    $scope.allUser[i].timeUse = $scope.timeUse($scope.allUser[i].first_create_time,$scope.allUser[i].last_modified_time);
                    console.log($scope.allUser[i].timeUse);
                }
            }, function errorCallback(error) {
            	$location.path("/");
                console.log("error");
                console.log(error);
            });
        };

        $scope.timeUse = function(createTime, lastModificationTime){
            var hourUse = $scope.hourUse(createTime,lastModificationTime);
            if(hourUse < 24){
                return "" + hourUse + " hours";
            } else{
                return "" + (hourUse / 24) + " days";
            }
        }

        $scope.formatString = function(format) {
            var day   = parseInt(format.substring(8,10));
            var month  = parseInt(format.substring(5,7));
            var year   = parseInt(format.substring(0,4));
            var hour = parseInt(format.substring(11,13));
            var minute = parseInt(format.substring(14,16));
            var second = parseInt(format.substring(17,19));
            var millesecond = parseInt(format.substring(20,23));

            var date = new Date(year, month-1, day,hour,minute,second,millesecond);
            // console.log(day);
            // console.log(month);
            // console.log(year);
            // console.log(hour);
            // console.log(minute);
            // console.log(second);
            // console.log(millesecond);
            // console.log(date);

            return date;
        }

        $scope.hourUse = function(firstDate,secondDate){
            var date2 = new Date($scope.formatString(secondDate));
            var date1 = new Date($scope.formatString(firstDate));
            // console.log(date2.getTime());
            // console.log(date1.getTime());
            
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());   
            var diffhours = Math.ceil(timeDiff / (1000 * 3600)); 
            return diffhours;
        }

    });