(function () {

  angular.module('MyApp', ['ngRoute', 'ngMaterial']);

  angular
    .module('MyApp')
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/angular-material-breadcrumb/app/home/home.view.html',
                controller : 'homeCtrl'
            })
            .when('/example', {
                templateUrl: '/angular-material-breadcrumb/app/dyn-page/dyn-page.view.html',
                controller : 'dynPageCtrl'
            })
            .when('/example/:path*', {
                templateUrl: '/angular-material-breadcrumb/app/dyn-page/dyn-page.view.html',
                controller : 'dynPageCtrl'
            })
            /*.otherwise({redirectTo: '/'})*/
            ;

        $locationProvider.html5Mode(true);
    }])
    .run();
})();