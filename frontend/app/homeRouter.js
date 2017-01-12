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
	}]).
    run(['$rootScope', '$location', 'PermissionsService', function($rootScope, $location, PermissionsService) {
        // $rootScope.edit = function() {
        //   PermissionsService.setPermission('login', false);
        //   $location.path('/edit');
        // };
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            // console.log($rootScope.name);
            // console.log(next);
            // console.log(next.templateUrl);
            // console.log(current);
            if ($rootScope.name) {
                if("user".localeCompare($rootScope.userType) === 0){
                    if("app/components/login/login.html".localeCompare(next.templateUrl) === 0){
                        $location.path('/login');
                    }else if("app/components/map/map.html".localeCompare(next.templateUrl) === 0){
                        $location.path('/map');
                    }else{
                        $location.path('/');
                    }
                }
            }else{
                if("app/components/login/login.html".localeCompare(next.templateUrl) === 0){
                // if(!PermissionsService.getPermission('login')) {
                    $location.path('/login');
                    // console.log("1");

                // }
                }else{
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
        }
        this.getPermission = function(permission) {
            return permissions[permission] || false;
        }
    }]);
