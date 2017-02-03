'use strict';
//Data
var questions = [
    {
        questionId : '01'
    },
    {
        questionId : '02'
    },
    {
        questionId : '03'
    }
];
var users = [
              {
                  userId : 'user01',
                  userName : 'DING Feng',
                  lat : 23.200000,
                  long : 79.225487,
                  questionId : '01'
              },
              {
                  userId : 'user02',
                  userName : 'YAN Zhengqin',
                  lat : 28.500000,
                  long : 77.250000,
                  questionId : '01'
              },
              {
                  userId : 'user03',
                  userName : 'YU Kaiwen',
                  lat : 19.000000,
                  long : 72.90000,
                  questionId : '02'
              },
              {
                  userId : 'user04',
                  userName : 'Thibault',
                  lat : 22.500000,
                  long : 88.400000,
                  questionId : '02'
              },
              {
                  userId : 'user05',
                  userName : 'Peter Sander',
                  lat : 13.000000,
                  long : 80.250000,
                  questionId : '03'
              }
          ];
          //Angular App Module and Controller
angular.module('geolocApp',[]).controller('MapCtrl', function ($scope) {

              var mapOptions = {
                  zoom: 4,
                  center: new google.maps.LatLng(25,80),
                  mapTypeId: google.maps.MapTypeId.TERRAIN
              }

              $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

              $scope.questions = [];
    
              for(var i = 0; i < questions.length; i++) {
                  var qid = questions[i].questionId;
                  $scope.questions.push(qid);
              }
                
              $scope.markers = [];
              
              var infoWindow = new google.maps.InfoWindow();
              
              var createMarker = function (info){
                  
                  var marker = new google.maps.Marker({
                      map: $scope.map,
                      position: new google.maps.LatLng(info.lat, info.long),
                      title: info.userId,
                      questionTitle : info.questionId
                  });
                  marker.content = '<div class="infoWindowContent">' + info.userName + '</div>';
                  
                  google.maps.event.addListener(marker, 'click', function(){
                      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
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
                  for (var i = 0; i < users.length; i++){
                      if(users[i].questionId == selectedQuestion) {
                          createMarker(users[i]);
                          console.log("createMarker(users["+i+"]);");
                      }
                  }
                  console.log("selectedQuestion : "+selectedQuestion);
                  console.log("$scope.markers.length : "+$scope.markers.length);
              }

          });