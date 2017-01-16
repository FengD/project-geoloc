'use strict';

angular.module('geolocApp')
    .controller('mapController', function ($scope, $cookies, $http, $window, NgMap) {

        function initPage() {

            $scope.map_style = 'map-fullscreen';
            $scope.map_zoom = 15;
            $scope.showModal = false;
            $scope.tilt = 45;
            $scope.mapTypeId = 'ROADMAP';

            updateCurrentQuestion(function(data) {
                $scope.current_question = data;
                $scope.center_lat = $scope.current_question.position.latitude;
                $scope.center_lon = $scope.current_question.position.longitude;
                $scope.marker_lat = $scope.current_question.position.latitude;
                $scope.marker_lon = $scope.current_question.position.longitude;
                $scope.question_text = $scope.current_question.question;
                $scope.question_type = $scope.current_question.type;
                $scope.answers = $scope.current_question.answers;
                if ($scope.question_type == 'multi-choice') {
                    $scope.choices = [];
                    for (var i = 0; i < $scope.current_question.choices.length; i++) {
                        $scope.choices.push([$scope.current_question.choices[i], false]);
                    }
                } else if ($scope.question_type == 'single-choice' || $scope.question_type == 'essay') {
                    $scope.choices = $scope.current_question.choices;
                }
            });

        }

        function updateCurrentQuestion(callback) {

            $scope.question_step = $cookies.get('question_step');

            $http({
                method: 'POST',
                url: 'http://localhost:8081/questions/' + $scope.question_step
            }).then(function successCallback(success) {
                callback(success.data);
            }, function errorCallback(error) {
                console.log("error");
                console.log(error);
                if (error.status == '400') {
                    console.log('Well done, you have finished all the questions!');
                }
                $scope.showMap = false;
            });

        }

        function updateCookies(cb_initPage) {
            $http({
                method: 'POST',
                url: 'http://localhost:8080/users/' + $cookies.get('name'),
                data: {
                    password: $cookies.get('password')
                }
            }).then(function successCallback(success) {
                console.log(success);
                var now = new $window.Date(),
                    // this will set the expiration to 6 months
                    exp = new $window.Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
                $cookies.put('question_step', success.data.question_step, {expires: exp});
                console.log(success.data.question_step);
                cb_initPage();

            }, function errorCallback(error) {
                console.log("error");
                console.log(error);
            });
        }

        function updateQuestionStep(cb_updateCookies, cb_initPage) {
            var num_newStep = parseInt($cookies.get('question_step')) + 1;
            var str_newStep = num_newStep.toString();
            $http({
                method: 'POST',
                url: 'http://localhost:8080/users/updateQuestionStep/' + $cookies.get('name'),
                data: {
                    step: str_newStep
                }
            }).then(function successCallback(success) {
                console.log(success);
                cb_updateCookies(cb_initPage);
            }, function errorCallback(error) {
                console.log("error");
                console.log(error);
            });
        }


        $scope.initPage = initPage();

        /* Set animations and customization on the marker */
        var marker;
        var mctrl = this;
        NgMap.getMap().then(function(map) {
            mctrl.map = map;
            marker = map.markers[0];
            // marker.setAnimation(google.maps.Animation.BOUNCE);
        });
        /* Set click event on the marker */
        mctrl.click = function(event) {
            $scope.map_zoom = 22;
            $scope.mapTypeId = 'SATELLITE';
            $scope.map_style = 'map-sidescreen';
            $scope.showModal = !$scope.showModal;

        }

        /* Set click event on the Modal close */
        $scope.closeModal = function() {
            $scope.map_zoom = 15;
            $scope.map_style = 'map-fullscreen';
            $scope.mapTypeId = 'ROADMAP';
        }


        /* Set click event on the Submit button */
        mctrl.submitAnswer = function() {
            var isCorrect = false;
            //To add, check if question step is 5!
            switch($scope.question_type) {
                case 'essay':
                    for (var i = 0; i < $scope.answers.length; i++) {
                        if (mctrl.userAnswer == $scope.answers[i]) {
                            updateQuestionStep(updateCookies ,initPage);
                            isCorrect = true;
                            break;
                        }
                    }
                    break;
                case 'single-choice':
                    for (var i = 0; i < $scope.answers.length; i++) {
                        if (mctrl.userAnswer == $scope.answers[i]) {
                            updateQuestionStep(updateCookies ,initPage);
                            isCorrect = true;
                            break;
                        }
                    }
                    break;
                case 'multi-choice':
                    var nb_rightChoices = 0;
                    for (var i = 0; i < $scope.choices.length; i++) {
                        if ($scope.answers.includes($scope.choices[i][0]) && $scope.choices[i][1])
                            nb_rightChoices++;
                    }
                    if (nb_rightChoices == $scope.answers.length) {
                        updateQuestionStep(updateCookies ,initPage);
                        isCorrect = true;
                    }
                    break;
                default:
                    console.log('Error: unknown current question type');
            }
            if (!isCorrect) {
                alert("Oops, not correct, please retry!");
            }
        }

    })
    .directive('questionModal', function () {
        return {
            template:
            '<div class="modal fade">' +
                '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<button type="button" class="close" data-dismiss="modal"ng-click="closeModal()">&times;</button>' +
                            '<h4 class="modal-title">{{ question_text }}</h4>' +
                        '</div>' +
                        '<div class="modal-body" ng-transclude></div>' +
                    '</div>' +
                '</div>' +
            '</div>',
            restrict: 'A',
            transclude: true,
            replace: true,
            scope: true,
            link: function postLink(scope, element, attrs) {
                scope.title = attrs.title;

                scope.$watch(attrs.visible, function(value){
                    if(value == true)
                        $(element).modal('show');
                    else
                        $(element).modal('hide');
                });

                $(element).on('shown.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on('hidden.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = false;
                    });
                });
            }
        };
    });
