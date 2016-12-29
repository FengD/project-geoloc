angular.module('geolocApp')
	.config(['$routeProvider',  function($routeProvider) {
        $routeProvider
        	.when('/login', {
                templateUrl: 'app/components/login/login.html',
                controller: 'loginController'
            })
            .when('/addQuestion', {
                templateUrl: 'app/components/addQuestion/addQuestion.html',
                controller: 'addQuestionController'
            })
            .otherwise({
                redirectTo: '/'
    		});
	}]);
