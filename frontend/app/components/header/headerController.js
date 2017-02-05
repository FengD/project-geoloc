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

        if($cookies.get('name')){
            $rootScope.name = $cookies.get('name');
            $rootScope.password = $cookies.get('password');
            $rootScope.userType = $cookies.get('userType');
            $rootScope.question_step = $cookies.get('question_step');
            $rootScope.userPhoto = $cookies.get('photo_path');
            
            socket.on('connect', function(){
                var lat = 0,long = 0;
                var date = new Date();
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        lat = position.coords.latitude;
                        long = position.coords.longitude;
                        socket.emit('adduser', $cookies.get('name'), $cookies.get('question_step'),"("+lat + "," + long + ")",date);
                    });      
                }
                // call the server-side function 'adduser' and send one parameter (value of prompt)
               
                socket.on('updatechat', function (username, data, position, date) {
                    console.log(username + ":" + data + "position:" + position + "date:" + date);
                    $scope.allChart.push(username + ":" + data + "position:" + position + "date:" + date);
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

          $scope.showAdvanced = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.prompt()
              // .title('Chart')
              // .textContent('What do you want to say?')
              // .textContent('What do you want to say?')
              // .textContent('What do you want to say?')
              // .textContent('What do you want to say?')
              .placeholder('Send message to your frinds.')
              // .ariaLabel('Dog name')
              .targetEvent(ev)
              .ok('SEND')
              .cancel('CANCEL');

            

            $mdDialog.show(
                {
                    parent: angular.element(document.body),
                    clickOutsideToClose:true,
                    template:
                    '<md-dialog md-theme="mytheme">' +
                    '  <md-dialog-content>'+
                         "<div><div><p><span>2</span></p><ul class=\"chartMessage\"><li ng-repeat='chart in allChart'><p>{{chart}}</p></li></ul></div><h4>Leave a Comment:</h4><form><div><textarea></textarea></div><button >Submit</button></form></div>"+
                    '        <md-button ng-click="closeDialog();">CANCEL</md-button>'+
                    '        <md-button ng-click=";">SEND</md-button>'+
                      '  </md-dialog-content>' +
                      '</md-dialog>',
                    locals: {
                    
                    },
                    controller: DialogController
                  }

                ).then(function(result) {
                var lat = 0,long = 0;
                var date = new Date();
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        lat = position.coords.latitude;
                        long = position.coords.longitude;
                        socket.emit('sendchat', result,"("+lat + "," + long + ")",date);
                    });      
                }
                
            }, function() {
                
            });

            function DialogController($scope, $mdDialog) {
                $scope.closeDialog = function() {
                  $mdDialog.hide();
                };
            };

        };

    });
