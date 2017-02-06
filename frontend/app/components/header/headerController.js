'use strict';
angular.module('geolocApp')
    .controller('headerController',  function ($scope, $rootScope, $location, $cookies,$http, Server, socket,$mdDialog, $document) {
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



        $scope.allChart = [];
        $scope.newMessage = 0;
        $scope.message = "";

        if($cookies.get('name')){
            $rootScope.name = $cookies.get('name');
            $rootScope.password = $cookies.get('password');
            $rootScope.userType = $cookies.get('userType');
            $rootScope.question_step = $cookies.get('question_step');
            $rootScope.userPhoto = $cookies.get('photo_path');
            
            socket.on('connect', function(){
                // var lat = 0,long = 0;
                // if (navigator.geolocation) {
                //     navigator.geolocation.getCurrentPosition(function (position) {
                //         lat = position.coords.latitude;
                //         long = position.coords.longitude;
                        socket.emit('adduser', $cookies.get('name'), $cookies.get('question_step'));
                        // socket.emit('toAdminInfo', $cookies.get('name'), $cookies.get('question_step'),"("+lat + "," + long + ")",date);
                //     });      
                // }
                console.log( $cookies.get('name'));
                // call the server-side function 'adduser' and send one parameter (value of prompt)
               
                socket.on('updatechat', function (username, data, date) {
                    // console.log(username + ":" + data + "position:" + position + "date:" + date);
                    var messageInfo = {
                        "username" : username,
                        "message" : data,
                        "date" : date
                    };
                    $scope.allChart.push(messageInfo);
                    if(username != $cookies.get('name')){
                        $scope.newMessage = $scope.newMessage + 1;
                    }
                });
            });
        }

        setInterval(function(){
            $http({
                method: 'GET',
                url: Server.getUrl() + ':8080/users/allUser'
            }).then(function successCallback(success) {
                for(var i = 0; i < success.data.length; i++){
                    var user = success.data[i];
                    if(user.current_chance < 5){
                        $http({
                            method: 'POST',
                            url: Server.getUrl() + ':8080/users/updateCurrentChance/' + user.name,
                            data:{
                                chance : (user.current_chance + 1)
                            }
                        }).then(function successCallback(success) {
                            console.log(success);
                        }, function errorCallback(error) {
                            console.log("error");
                            console.log(error);
                        });
                    }
                }               
            }, function errorCallback(error) {
                $location.path("/");
                console.log("error");
                console.log(error);
            });
        }, 60000);

        $scope.sendMessage = function(){
                // var lat = 0,long = 0;
                // if (navigator.geolocation) {
                //     navigator.geolocation.getCurrentPosition(function (position) {
                //         lat = position.coords.latitude;
                //         long = position.coords.longitude;
                        socket.emit('sendchat',$cookies.get('name'), $scope.message);
                        // socket.emit('toAdminInfo', $cookies.get('name'), $cookies.get('question_step'),"("+lat + "," + long + ")",date);
                        // $scope.message = "";
                //     });      
                // }
                $scope.message = "";
        }

        $scope.showChart = function(){
            $scope.modalStyle = 'block';
            $scope.newMessage = 0;
        }

        $scope.modalStyleFunction = function() {
            return {
                display  : $scope.modalStyle
            }
        }

    });
