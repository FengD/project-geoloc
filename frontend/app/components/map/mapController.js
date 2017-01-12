'use strict';

angular.module('geolocApp')
    .controller('mapController',  function ($scope, $cookies, $http, $window, NgMap) {

        function initPage() {

            $scope.map_zoom = 16;
            $scope.showModal = false;

            updateCurrentQuestion(function(data) {
                $scope.current_question = data;
                $scope.center_lat = $scope.current_question.position.latitude;
                $scope.center_lon = $scope.current_question.position.longitude;
                $scope.marker_lat = $scope.current_question.position.latitude;
                $scope.marker_lon = $scope.current_question.position.longitude;
                $scope.question_text = $scope.current_question.question;
                $scope.question_type = $scope.current_question.type;
                $scope.answers = $scope.current_question.answers;
                $scope.choices = $scope.current_question.choices;
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
            $scope.showModal = !$scope.showModal;
        }



        /* Set click event on the Submit button */
        mctrl.submitAnswer = function() {
            var isCorrect = false;
            switch($scope.question_type) {
                case 'essay':
                    for (var i = 0; i < $scope.answers.length; i++) {
                        //To add, check if question step is 5!
                        if (mctrl.userAnswer == $scope.answers[i]) {
                            updateQuestionStep(updateCookies ,initPage);
                            isCorrect = true;
                            break;
                        }
                    }
                    break;
                case 'single-choice':

                    break;
                case 'multi-choices':

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
                            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                            '<h4 class="modal-title">{{ question_text }}</h4>' +
                        '</div>' +
                        '<div class="modal-body" ng-transclude></div>' +
                    '</div>' +
                '</div>' +
            '</div>',
            restrict: 'A',
            transclude: true,
            replace:true,
            scope:true,
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
