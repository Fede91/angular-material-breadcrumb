(function () {

angular
    .module('MyApp')
    .controller('homeCtrl', function ($scope,$location) {
        $scope.goToExamples = function() {
            $location.path('/example');
        }
    });

})();