'use strict';
angular.module('geolocApp')
    .controller('addQuestionController',  function ($scope, $cookies, $http, $window, $location, $rootScope, Server) {
    	$scope.types = {
    		type01 : {type : "multi-choice", answertitle:"Select more than one answer below", choicetitle:"Input your choice"},
    		type02 : {type : "single-choice", answertitle:"Select one answer below", choicetitle:"Input your choice"},
    		type03 : {type : "essay", answertitle:"Input answer", choicetitle:""}
    	};
    	$scope.errorSpan = null;
    	$scope.choicesInput = [];
    	$scope.choicesValue = [];
    	$scope.singleanswersBoolean = [];
    	$scope.multianswersBoolean = [];
    	$scope.essayanswersInput = [];
    	$scope.essayanswersValue = [];
    	$scope.isEssay = true;
    	$scope.files = [];
    	$scope.questionInfo = {id:'',
			position : {
				latitude:'', 
				longitude:''
			},
			question:'',
			type:'',
			answers:[],
			choices:[],
			photoPath:'',
			nextQuestion:''
		};

		



    	$scope.inputId=function(){
    		$scope.questionInfo["id"]=$scope.id;
    		$scope.errorSpan = null;
    	};

    	$scope.inputLatitude=function(){
    		$scope.questionInfo["position"]["latitude"]=$scope.latitude;
    	};

    	$scope.inputLongitude=function(){
    		$scope.questionInfo["position"]["longitude"]=$scope.longitude;
    	};

    	$scope.inputQuestion=function(){
    		$scope.questionInfo["question"]=$scope.question;
    	};

    	$scope.inputType=function(){
    		$scope.questionInfo["type"]=$scope.type.type;
    		if($scope.type.type=="essay"){
    			$scope.isEssay = true;
    			$scope.questionInfo["answers"] = $scope.essayanswersValue;
    			$scope.questionInfo["choices"]=null;
    		}else if($scope.type.type=="multi-choice"){
    			$scope.isEssay = false;
    			$scope.questionInfo["choices"]=$scope.choicesValue;
    			$scope.questionInfo["answers"] = [];
	    		angular.forEach($scope.multianswersBoolean, function(subscription, index) {
		        	if ($scope.multianswersBoolean[index] == true) {
		          		$scope.questionInfo["answers"].push($scope.choicesInput[index].value);
		          	}
		      	});
    		} else if($scope.type.type=="single-choice"){
    			$scope.isEssay = false;
    			$scope.questionInfo["choices"]=$scope.choicesValue;
    			$scope.questionInfo["answers"] = [];
	    		angular.forEach($scope.singleanswersBoolean, function(subscription, index) {
		        	if ($scope.singleanswersBoolean[index] == true) {
		          		$scope.questionInfo["answers"].push($scope.choicesInput[index].value);
		          	}
		      	});
    		}
    	};
    	
    	$scope.inputNextQuestion=function(){
    		$scope.questionInfo["nextQuestion"]=$scope.next_question;
    	};

    	$scope.inputChoice=function(i){
    		$scope.questionInfo["choices"][i]=$scope.choicesInput[i].value;
    		$scope.choicesValue[i]=$scope.choicesInput[i].value;
    	};

    	$scope.inputMultiAnswers=function(i){
    		$scope.questionInfo["answers"] = [];
    		angular.forEach($scope.multianswersBoolean, function(subscription, index) {
	        	if ($scope.multianswersBoolean[index] == true) {
	          		$scope.questionInfo["answers"].push($scope.choicesInput[index].value);
	          	}
	      	});
    	};

    	$scope.inputEssayAnswer=function(i){
    		$scope.questionInfo["answers"][i]=$scope.essayanswersInput[i].value;
    		$scope.essayanswersValue[i]=$scope.essayanswersInput[i].value;
    	};

    	




  		$scope.addChoice=function(){
    		$scope.choicesInput.push({});
    		$scope.singleanswersBoolean.push(false);
    		$scope.multianswersBoolean.push(false);
  		};
  		$scope.deleteChoice=function(i){
    		$scope.choicesInput.splice(i,1);
    		$scope.singleanswersBoolean.splice(i,1);
    		$scope.multianswersBoolean.splice(i,1);
    		// $scope.questionInfo["choices"].splice(i,1);
    		$scope.choicesValue.splice(i,1);

    		$scope.questionInfo["answers"] = [];
	    	angular.forEach($scope.singleanswersBoolean, function(subscription, index) {
		       	if ($scope.singleanswersBoolean[index] == true) {
		       		$scope.questionInfo["answers"].push($scope.choicesInput[index].value);
		      	}
		    });

		    $scope.questionInfo["answers"] = [];
	    	angular.forEach($scope.multianswersBoolean, function(subscription, index) {
		       	if ($scope.multianswersBoolean[index] == true) {
		       		$scope.questionInfo["answers"].push($scope.choicesInput[index].value);
		       	}
		    });
  		};

  		$scope.updateSelection = function(position,singleanswersBoolean) {
  			$scope.questionInfo["answers"] = [];
	      	angular.forEach(singleanswersBoolean, function(subscription, index) {
	        	if (position != index) {
	          		singleanswersBoolean[index] = false;
	          	}else{
	          		$scope.questionInfo["answers"].push($scope.choicesInput[index].value);
	          	}
	      	});
	    };

	    $scope.addEssayAnswer=function(){
    		$scope.essayanswersInput.push({});
  		};
  		$scope.deleteEssayAnswer=function(i){
    		$scope.essayanswersInput.splice(i,1);
    		$scope.essayanswersValue.splice(i,1);
  		};
  		
       	$scope.addQuestionToDB = function(){
            $http({
                method: 'POST',
                url: Server.getUrl() + ':8081/questions/',
                data: $scope.questionInfo
     //            {
     //               	id:$scope.questionInfo["id"],
					// position : {
					// 	latitude:$scope.questionInfo["position"]["latitude"], 
					// 	longitude:$scope.questionInfo["position"]["longitude"],
					// },
					// question:$scope.questionInfo["question"],
					// type:$scope.questionInfo["type"],
					// answers:$scope.questionInfo["answers"],
					// choices:$scope.questionInfo["choices"],
					// photoPath:$scope.questionInfo["photoPath"],
					// nextQuestion:$scope.questionInfo["nextQuestion"]
     //            }
            }).then(function successCallback(success) {
                console.log(success);
                $scope.errorSpan = null;
                $location.path("/manageQuestion");
            }, function errorCallback(error) {
                console.log("error");
                console.log(error);
                $scope.errorSpan = "questionId already exists.";
            });
        };

     //    var dropbox = document.getElementById("dropbox")
	    // $scope.dropText = 'Drop files here...'

	    // // init event handlers
	    // function dragEnterLeave(evt) {
	    //     evt.stopPropagation()
	    //     evt.preventDefault()
	    //     $scope.$apply(function(){
	    //         $scope.dropText = 'Drop files here...'
	    //         $scope.dropClass = ''
	    //     })
	    // }
	    // dropbox.addEventListener("dragenter", dragEnterLeave, false)
	    // dropbox.addEventListener("dragleave", dragEnterLeave, false)
	    // dropbox.addEventListener("dragover", function(evt) {
	    //     evt.stopPropagation()
	    //     evt.preventDefault()
	    //     var clazz = 'not-available'
	    //     var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0
	    //     $scope.$apply(function(){
	    //         $scope.dropText = ok ? 'Drop files here...' : 'Only files are allowed!'
	    //         $scope.dropClass = ok ? 'over' : 'not-available'
	    //     })
	    // }, false)
	    // dropbox.addEventListener("drop", function(evt) {
	    //     // console.log('drop evt:', JSON.parse(JSON.stringify(evt.dataTransfer)))
	    //     evt.stopPropagation()
	    //     evt.preventDefault()
	    //     $scope.$apply(function(){
	    //         $scope.dropText = 'Drop files here...'
	    //         $scope.dropClass = ''
	    //     })
	    //     var files = evt.dataTransfer.files[0];
	    //     console.log(files);
	        // if (files.length > 0) {
	        //     $scope.$apply(function(){
	        //         $scope.files = []
	        //         for (var i = 0; i < files.length; i++) {
	        //             $scope.files.push(files[i])
	        //         }
	        //     })
	        // }
	    // }, false)
	    //============== DRAG & DROP =============

	    // $scope.setFiles = function(element) {
	    // $scope.$apply(function($scope) {
	    //   console.log('files:', element.files);
	    //   // Turn the FileList object into an Array
	    //     $scope.files = []
	    //     for (var i = 0; i < element.files.length; i++) {
	    //       $scope.files.push(element.files[i])
	    //     }
	    //   $scope.progressVisible = false
	    //   });
	    // };

	    $scope.uploadFile = function(element) {
	    	// $scope.progressVisible = true
	        for (var i = 0; i < element.files.length; i++) {
	          $scope.files.push(element.files[i]);
	          $scope.questionInfo["photoPath"]=element.files[i].name;
	        }
	        var fd = new FormData();
	        for (var i in $scope.files) {
	            fd.append("questionPhoto", $scope.files[i])
	        }
	        var xhr = new XMLHttpRequest();
	        xhr.upload.addEventListener("progress", uploadProgress, false);
	        xhr.addEventListener("load", uploadComplete, false);
	        xhr.addEventListener("error", uploadFailed, false);
	        xhr.addEventListener("abort", uploadCanceled, false);
	        xhr.open("POST", Server.getUrl() + ":8082/img/question");
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
	        alert(evt.target.responseText)
	    }

	    function uploadFailed(evt) {
	        alert("There was an error attempting to upload the file.")
	    }

	    function uploadCanceled(evt) {
	        $scope.$apply(function(){
	            $scope.progressVisible = false
	        });
	        alert("The upload has been canceled by the user or the browser dropped the connection.")
	    }
    });
