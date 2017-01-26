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
            .when('/howToPlay', {
                templateUrl: 'app/components/howToPlay/howToPlay.html',
                controller: 'howToPlayController'
            })
            .when('/map', {
                templateUrl: 'app/components/map/map.html',
                controller: 'mapController',
                css: 'app/components/map/map.css'
            })
            .when('/ranking', {
                templateUrl: 'app/components/ranking/ranking.html',
                controller: 'rankingController',
            })
            .otherwise({
                redirectTo: '/'
    		});
	}]).
    run(['$rootScope', '$location', 'PermissionsService', '$cookies', function($rootScope, $location, PermissionsService, $cookies) {
        // $rootScope.edit = function() {
        //   PermissionsService.setPermission('login', false);
        //   $location.path('/edit');
        // };
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            // console.log($rootScope.name);
            // console.log(next);
            // console.log(next.templateUrl);
            // console.log(current);


            if ($cookies.get('name')) {
                if("user".localeCompare($cookies.get('userType')) === 0){
                    if("app/components/login/login.html".localeCompare(next.templateUrl) === 0){
                        $location.path('/login');
                    } 
// ------------------------------------------------------------------------------------------------------- YAN ADD
                    else if("app/components/map/map.html".localeCompare(next.templateUrl) === 0){
                        $location.path('/map');
                    }
// -------------------------------------------------------------------------------------------------------- YAN ADD END
                    else if("app/components/howToPlay/howToPlay.html".localeCompare(next.templateUrl) === 0){
                        $location.path('/howToPlay');
                    }
                    else if("app/components/ranking/ranking.html".localeCompare(next.templateUrl) === 0){
                        $location.path('/ranking');
                    }
                    else{
                        $location.path('/');
                    }
                }else if("admin".localeCompare($cookies.get('userType')) === 0){
                	if("app/components/login/login.html".localeCompare(next.templateUrl) === 0){
                        $location.path('/login');
                    } 
                    else if("app/components/howToPlay/howToPlay.html".localeCompare(next.templateUrl) === 0){
                        $location.path('/howToPlay');
                    }
                    else if("app/components/map/map.html".localeCompare(next.templateUrl) === 0){
                        $location.path('/map');
                    }
                    else if("app/components/ranking/ranking.html".localeCompare(next.templateUrl) === 0){
                        $location.path('/ranking');
                    }
                    else if("app/components/addQuestion/addQuestion.html".localeCompare(next.templateUrl) === 0){
                        $location.path('/addQuestion');
                    }
                    else if("app/components/questionOverview/questionOverview.html".localeCompare(next.templateUrl) === 0){
                        $location.path('/questionOverview');
                    }
                    else if("app/components/manageQuestion/manageQuestion.html".localeCompare(next.templateUrl) === 0){
                        $location.path('/manageQuestion');
                    }
                    else if("app/components/manageUser/manageUser.html".localeCompare(next.templateUrl) === 0){
                        $location.path('/manageUser');
                    }
                    else{
                        $location.path('/');
                    }
                }
            }else{
                if("app/components/login/login.html".localeCompare(next.templateUrl) === 0){
                    $location.path('/login');

                }
                // else if ("app/components/map/map.html".localeCompare(next.templateUrl) === 0) {
                //     $location.path('/map');
                // }
                else if("app/components/howToPlay/howToPlay.html".localeCompare(next.templateUrl) === 0){
                        $location.path('/howToPlay');
                }
                else if("app/components/ranking/ranking.html".localeCompare(next.templateUrl) === 0){
                        $location.path('/ranking');
                    }
                else{
                    // console.log("2");
                    $location.path('/');
                }
                // PermissionsService.setPermission('login', false);
            }
        });
    }]).
    service('PermissionsService', [function() {
        var permissions = {
            isAdmin: false
        };
        this.setPermission = function(permission, value) {
            permissions[permission] = value;
        };
        this.getPermission = function(permission) {
            return permissions[permission] || false;
        }
    }])
    .factory('Server', function($http) {

        //10.212.117.220
        var URLServer = 'http://localhost';

        return {

            getUrl: function() {
                return URLServer;
            }

        };

    });
