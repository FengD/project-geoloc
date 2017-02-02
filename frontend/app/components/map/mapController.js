'use strict';

angular.module('geolocApp')
    .controller('mapController', function ($scope, $cookies, $http, $window, NgMap, Server) {

        /* Set animations and customization on the marker */
        var marker;
        var mctrl = this;
        NgMap.getMap('game-map').then(function(map) {
            mctrl.map = map;
        });

        function initPage() {
        	var mysrclat= 0;
        	var mysrclong =0;
		    if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition(function (position) {
			        mysrclat = position.coords.latitude;
			        mysrclong = position.coords.longitude;
			        $scope.userlat = mysrclat;
                    $scope.userlon = mysrclong;
			    });      
			}
            $scope.isSuccess = false;
            $scope.current_card = 'map';
            $scope.navigation = false;
            $scope.mapTypeId = 'ROADMAP';
            $scope.map_zoom = 16;
            $scope.showModal = false;
            $scope.showCommentsPanel = false;
            $scope.server_adresse = Server.getUrl();
            $scope.files = [];
            $scope.photoPath;

            $scope.highlight_marker = {
                url: 'app/resources/images/icons_game/highlight_marker.png',
                size: [40, 32],
                origin: [0,0],
                anchor: [0, 32]
            };

            updateCookies(function() {
                if ($cookies.get('current_chance') == '0') {
                    $scope.isFail = true;
                } else {
                    $scope.isFail = false;
                }

                updateCurrentQuestion(function(data) {
                    $scope.current_question = data;
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

                    getAllQuestions(function(data) {
                        $scope.questions = [];
                        var markers = [];
/*                        var marker_zero = {url: 'app/resources/images/google-map-icon/number_0.png',
                            size: [30, 35],
                            origin: [0,0],
                            anchor: [0, 32]
                        };
                        markers.push(marker_zero);*/
                        for (var i = 0; i < data.length; i++) {
                            if (data[i]._id < $scope.current_question._id) {
                                $scope.questions.push(data[i]);
                                var marker = {url: 'app/resources/images/google-map-icon/number_' + data[i]._id + '.png',
                                    size: [30, 35],
                                    origin: [0,0],
                                    anchor: [0, 32]
                                };
                                markers.push(marker);
                            }
                        }
                        $scope.markers = markers;
                    })
                });
            })
        }

        function getAllQuestions(callback) {
            $http({
                method: 'GET',
                url: Server.getUrl() + ':8081/questions/allQuestion'
            }).then(function successCallback(success) {
                callback(success.data);
            }, function errorCallback(error) {
                console.log("error");
                console.log(error);
            });
        }

        function updateCurrentQuestion(callback) {

            $scope.question_step = $cookies.get('question_step');

            $http({
                method: 'POST',
                url: Server.getUrl() + ':8081/questions/' + $scope.question_step
            }).then(function successCallback(success) {
                callback(success.data);
            }, function errorCallback(error) {
                console.log("error");
                console.log(error);
                if (error.status == '400') {
                    $scope.isSuccess = true;
                    console.log('Well done, you have finished all the questions!');
                }
                $scope.showMap = false;
            });

        }

        function updateCookies(cb) {
            $http({
                method: 'POST',
                url: Server.getUrl() + ':8080/users/' + $cookies.get('name'),
                data: {
                    password: $cookies.get('password')
                }
            }).then(function successCallback(success) {
                console.log(success);
                var now = new $window.Date(),
                    // this will set the expiration to 6 months
                    exp = new $window.Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
                $cookies.put('question_step', success.data.question_step, {expires: exp});
                $cookies.put('current_chance', success.data.current_chance, {expires: exp});
                cb();

            }, function errorCallback(error) {
                console.log("error");
                console.log(error);
            });
        }

        function updateCurrentChance(current_chance, cb_updateCookies, cb2) {
            $http({
                method: 'POST',
                url: Server.getUrl() + ':8080/users/updateCurrentChance/' + $cookies.get('name'),
                data: {
                    chance: current_chance
                }
            }).then(function successCallback(success) {
                console.log(success);
                cb_updateCookies(cb2);
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
                url: Server.getUrl() + ':8080/users/updateQuestionStep/' + $cookies.get('name'),
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


        mctrl.returnMarker = function () {
            var normal_marker = {
                url: 'app/resources/images/icons_game/smile.svg',
                size: [20, 32],
                origin: [0,0],
                anchor: [0, 32]
            };
            return normal_marker;
        }

        /* Set click event on the map marker */
        mctrl.toggleNavigation = function() {
            if ($scope.navigation == true) {
                $scope.navigation = false;
            } else {
                $scope.navigation = true;
            }
        };

        /* Check checkbox and return false if any choice is selected */
        mctrl.noChoiceSelected = function(choices) {
            var noChoiceSelected = true;
            for (var i = 0; i < choices.length; i++) {
                if (choices[i][1] == true)
                    noChoiceSelected = false;
            }
            return noChoiceSelected;
        }

        /* Set click event on the Submit button */
        mctrl.submitAnswer = function() {
            var isCorrect = false;
            //To add, check if question step is 5!
            switch($scope.question_type) {
                case 'essay':
                    for (var i = 0; i < $scope.answers.length; i++) {
                        if (mctrl.userAnswer.toLowerCase() == $scope.answers[i]) {
                            updateQuestionStep(updateCookies ,initPage);
                            isCorrect = true;
                            mctrl.userAnswer = null;
                            break;
                        }
                    }
                    mctrl.userAnswer = null;
                    break;
                case 'single-choice':
                    for (var i = 0; i < $scope.answers.length; i++) {
                        if (mctrl.userAnswer == $scope.answers[i]) {
                            updateQuestionStep(updateCookies ,initPage);
                            isCorrect = true;
                            mctrl.userAnswer = null;
                            break;
                        }
                    }
                    mctrl.userAnswer = null;
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
                    //Clear the check box
                    for (var i = 0; i < $scope.choices.length; i++) {
                        $scope.choices[i][1] = false;
                    }
                    break;
                default:
                    console.log('Error: unknown current question type');
            }
            if (!isCorrect) {
                var num_newChance = parseInt($cookies.get('current_chance')) - 1;
                var str_newChance = num_newChance.toString();
                updateCurrentChance(str_newChance, updateCookies, function () {
                    if ($cookies.get('current_chance') == '0') {
                        $scope.isFail = true;
                    } else {
                        $scope.isFail = false;
                    }
                });
                alert("Oops, not correct, please retry!");
            } else {
                $scope.current_card = 'map';
            }
        };


        /* Set submit listener on love button in comment panel */
        mctrl.submitLove = function(comment_id) {
                $http({
                    method: 'POST',
                    url: Server.getUrl() + ':8081/questions/vote/' + $scope.current_question._id,
                    data: {
                        commentId: comment_id,
                        userId: $cookies.get('name')
                    }
                }).then(function successCallback(success) {
                    console.log(success);
                    updateCurrentQuestion(function(data) {
                        var comment_index;
                        for (var i = 0; i < $scope.current_question.comments.length; i++) {
                            if ($scope.current_question.comments[i]._id == comment_id) {
                                comment_index = i;
                            }
                        }
                        console.log(comment_index);
                        $scope.current_question.comments[comment_index].votes = data.comments[comment_index].votes;
                    });
                }, function errorCallback(error) {
                    console.log("error");
                    console.log(error);
                });

        };

        /* set submit listener on submit button in comment panel */
        mctrl.submitComment = function() {
            if (mctrl.userComment != '' || mctrl.userComment != null) {
                $http({
                    method: 'POST',
                    url: Server.getUrl() + ':8081/questions/comment/' + $scope.current_question._id,
                    data: {
                        text: mctrl.userComment,
                        userId: $cookies.get('name'),
                        photoPath:$scope.photoPath
                    }
                }).then(function successCallback(success) {

                    angular.element("input[type='file']").val(null);
                    console.log(success);
                    mctrl.userComment = '';
                    mctrl.modalStyle = {display:'none'};
                    updateCurrentQuestion(function(data) {
                        $scope.current_question.comments.push(data.comments[data.comments.length-1]);
                    });
                    $scope.photoPath = null;
                }, function errorCallback(error) {
                    console.log("error");
                    console.log(error);
                    $scope.photoPath = null;
                });
            } else {
                alert('Comment that you entered is empty');
            }
        };

        /* Toggle var current_card to switch cards */
        mctrl.switchToMap = function () {
            $scope.current_card = 'map';
        };
        mctrl.switchToQuestion = function () {
            $scope.current_card = 'question';
        };
        mctrl.switchToComment = function () {
            $scope.current_card = 'comment';
        };


        $scope.uploadFile = function(element) {
            // console.log(element.files);
            $scope.photoPath = null;
            // $scope.progressVisible = true
            for (var i = 0; i < element.files.length; i++) {
              $scope.files.push(element.files[i]);
              $scope.photoPath = element.files[i].name;
            }
            var fd = new FormData();
            for (var i in $scope.files) {
                fd.append("commentPhoto", $scope.files[i])
            }
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener("progress", uploadProgress, false);
            xhr.addEventListener("load", uploadComplete, false);
            xhr.addEventListener("error", uploadFailed, false);
            xhr.addEventListener("abort", uploadCanceled, false);
            xhr.open("POST", Server.getUrl() + ":8082/img/comment");
            // $scope.progressVisible = true
            xhr.send(fd)
        };

        function uploadProgress(evt) {
            $scope.$apply(function(){
                if (evt.lengthComputable) {
                    $scope.progress = Math.round(evt.loaded * 100 / evt.total)
                } else {
                    $scope.progress = 'unable to compute'
                }
            })
        }

        function uploadComplete(evt) {
            /* This event is raised when the server send back a response */
            // alert(evt.target.responseText)
            $scope.files = [];
        }

        function uploadFailed(evt) {
            $scope.photoPath = null;
            alert("There was an error attempting to upload the file.")
        }

        function uploadCanceled(evt) {
            $scope.$apply(function(){
                $scope.progressVisible = false
            });
            $scope.photoPath = null;
            alert("The upload has been canceled by the user or the browser dropped the connection.")
        }

    });