'use strict';

angular
    .module('MyApp')
    .directive('mdBreadcrumb', ['$location', function(location) {
        return {
            restrict: 'EA',
            templateUrl: '/app/directives/md-breadcrumb/md-breadcrumb.template.html',
			scope: {
				minify: '&',
				showCurrent: '&'
			},
			controller: function() {
				var vm = this;
				var _getBCObj = function(bCText, bCPath) {
					return {
						text: bCText,
						path: bCPath
					};
				}; // _getBCObj

				vm.breadcrumbs = [];
				
				vm.isMinimized = vm.minify();
				vm.showCurrent = vm.showCurrent();
				
				if(typeof vm.isMinimized === 'undefined') {
					vm.isMinimized = false;
				}

				if(typeof vm.showCurrent === 'undefined') {
					vm.showCurrent = false;
				}

				vm.generateBreadcrumb = function() {
					vm.breadcrumbs = [];

					var _paths = location.path().split(/[\s/]+/);
					_paths[0] = '/';

					// hack url end with '/'
					if(_paths[_paths.length-1] === "") {
						_paths.pop();
					}

					// If the last element is not required, delete it
					if(!vm.showCurrent) {
						_paths.pop();
					}

					for(var i = 0; i < _paths.length; i++) {
						if(i === 0) { // home element
							vm.breadcrumbs.push( _getBCObj('Home', _paths[i]) );
						} else { // all others elements
							vm.breadcrumbs.push( _getBCObj(_paths[i], (vm.breadcrumbs[i-1].path === '/') ? vm.breadcrumbs[i-1].path + _paths[i] : vm.breadcrumbs[i-1].path + '/' + _paths[i]) );
						}
					} // for
				};

				vm.generateBreadcrumb();

				vm.changeLocation = function(path) {
					location.path(path);
				}; // changeLocation

				vm.showAllBreadcrumbs = function() {
					vm.isMinimized = false;
				}; // showAllBreadcrumbs

			},
			controllerAs: 'MdBreadcrumbCtrl',
			bindToController: true,
			link: function(scope, element, attrs, ctrl) {
				scope.$on('$routeChangeSuccess', function(next, current) {
					ctrl.generateBreadcrumb();
				});
			}
        };
    }]);