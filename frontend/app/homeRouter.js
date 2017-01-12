angular.module('geolocApp')
	.config(['$routeProvider',  function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/homepage.html',
                controller: 'HomeController'
            })
        	.when('/login', {
                templateUrl: 'app/components/login/login.html',
                controller: 'loginController'
            })
            .when('/addQuestion', {
                templateUrl: 'app/components/addQuestion/addQuestion.html',
                controller: 'addQuestionController'
            })
            .when('/manageQuestion', {
                templateUrl: 'app/components/manageQuestion/manageQuestion.html',
                controller: 'manageQuestionController'
            })
            .when('/manageUser', {
                templateUrl: 'app/components/manageUser/manageUser.html',
                controller: 'manageUserController'
            })
            .when('/questionOverview', {
                templateUrl: 'app/components/questionOverview/questionOverview.html',
                controller: 'questionOverviewController'
            })
            .when('/map', {
                templateUrl: 'app/components/map/map.html',
                controller: 'mapController',
                css: "app/components/map/map.css"
            })
            .otherwise({
                redirectTo: '/'
    		});
	}]);
