'use strict';

angular.module('geolocApp')
    .controller('questionOverviewController',  function ($scope, $cookies, $http, $window, $location, $rootScope) {
       
    })
    .directive('myMap', function($http) {

        
             // directive link function
        var link = function(scope, element, attrs) {
            var map, infoWindow;
            var markers = [];
            
            // map config
            var mapOptions = {
                center: new google.maps.LatLng(43.615629, 7.071949),
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            };
            
            // init the map
            function initMap() {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8081/questions/allQuestion'
                }).then(function successCallback(success) {
                    var questions = success.data;
                    console.log(questions);
                    for(var i = 0; i < questions.length; i++){
                        console.log(questions[i]);
                        setMarker(map, new google.maps.LatLng(questions[i].position.latitude, questions[i].position.longitude), questions[i]._id, questions[i].question);
                    }
                }, function errorCallback(error) {
                    console.log("error");
                    console.log(error);
                });
                if (map === void 0) {
                    map = new google.maps.Map(element[0], mapOptions);
                }
            }    
            
            // place a marker
            function setMarker(map, position, title, content, choices, type) {
                var marker;
                var markerOptions = {
                    position: position,
                    map: map,
                    title: title,
                    icon: 'app/resources/images/google-map-icon/number_' + title + ".png"
                };

                marker = new google.maps.Marker(markerOptions);
                markers.push(marker); // add marker to array
                
                google.maps.event.addListener(marker, 'click', function () {
                    // close window if not undefined
                    if (infoWindow !== void 0) {
                        infoWindow.close();
                    }
                    // create new window
                    var infoWindowOptions = {
                        content: content
                    };
                    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                    infoWindow.open(map, marker);
                });
            }
            
            // show the map and place some markers
            initMap();
            
            // setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
            // setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
            // setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
        };
        
        return {
            restrict: 'A',
            template: '<div id="qmaps"></div>',
            replace: true,
            link: link
        };
    });
