'use strict';
angular.module('geolocApp')
    .controller('usersPositionController',  function ($scope, $cookies, $http, $window, $location, $rootScope,socket) {
       var mapOptions = {
                center: new google.maps.LatLng(43.615629, 7.071949),
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
              }

              $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
                
              $scope.markers = [];
              
              var infoWindow = new google.maps.InfoWindow();
              
              var createMarker = function (name,lat,long,date){
                  
                  var marker = new google.maps.Marker({
                      map: $scope.map,
                      position: new google.maps.LatLng(lat, long),
                      title: name,
                      // questionTitle : info.questionId
                  });
                  marker.content = '<div class="infoWindowContent">' + name + '</div>';
                  
                  google.maps.event.addListener(marker, 'click', function(){
                      infoWindow.setContent('<h2>' + marker.title + '</h2>' + date);
                      infoWindow.open($scope.map, marker);
                  });
                
                  $scope.markers.push(marker);    
              }  

              $scope.openInfoWindow = function(e, selectedMarker){
                  e.preventDefault();
                  google.maps.event.trigger(selectedMarker, 'click');
              }
              
              $scope.createMarkerForOneQuestion = function(e, selectedQuestion){
                  e.preventDefault();
                  if ($scope.markers.length > 0) {
                      for (var i = 0; i < $scope.markers.length; i++) {
                          $scope.markers[i].setMap(null);
                      }
                  }
                  $scope.markers = [];
                  // for (var i = 0; i < users.length; i++){
                  //     if(users[i].questionId == selectedQuestion) {
                  //         createMarker(users[i]);
                  //         console.log("createMarker(users["+i+"]);");
                  //     }
                  // }
                  // console.log("selectedQuestion : "+selectedQuestion);
                  // console.log("$scope.markers.length : "+$scope.markers.length);
              }
            // socket.on('connect', function(){

                socket.on('toAdmin', function (username, data, position, date) {
                        // console.log(username + ":" + data + "position:" + position + "date:" + date);
                        var messageInfo = {
                            "username" : username,
                            "message" : data,
                            "position" : position,
                            "date" : date
                        };
                        createMarker(messageInfo.username,messageInfo.position.split(/\,|\(|\)/)[1],messageInfo.position.split(/\,|\(|\)/)[2],messageInfo.date);
                        // $scope.allChart.push(messageInfo);
                        console.log(messageInfo);
                });
            // });
    });
    