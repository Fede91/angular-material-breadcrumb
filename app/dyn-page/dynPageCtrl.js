(function () {

angular
    .module('MyApp')
    .controller('dynPageCtrl', function ($scope, $location) {

        $scope.examples = [
            {
                title: 'Standard Breadcrumb',
                showCode: false,
                simulateToolbar: false,
                code: '<md-breadcrumb minify="false" show-current="false"></md-breadcrumb>',
                options: {
                    minify: false,
                    showCurrent: false
                }
            },
            {
                title: 'Breadcrumb with the current level',
                showCode: false,
                simulateToolbar: false,
                code: '<md-breadcrumb minify="false" show-current="true"></md-breadcrumb>',
                options: {
                    minify: false,
                    showCurrent: true
                }
            },
            {
                title: 'Breadcrumb standard minimized',
                subhead: 'The breadcrumb is minimized after the second level of depth',
                showCode: false,
                simulateToolbar: false,
                code: '<md-breadcrumb minify="true" show-current="false"></md-breadcrumb>',
                options: {
                    minify: true,
                    showCurrent: false
                }
            },
            {
                title: 'Breadcrumb with the current level and minimized',
                subhead: 'The breadcrumb is minimized after the second level of depth (including the current level)',
                showCode: false,
                simulateToolbar: false,
                code: '<md-breadcrumb minify="true" show-current="true"></md-breadcrumb>',
                options: {
                    minify: true,
                    showCurrent: true
                }
            },
        ];

        $scope.navigate = function() {
            var _paths = $location.path().split(/[\s/]+/);
            $location.path( $location.path() + '/sub-page-' + (_paths.length-1) );
        }

    });

})();