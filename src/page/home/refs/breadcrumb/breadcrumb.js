var templateStr = require('./breadcrumb.html');
require('./breadcrumb.less');
angular.module('app').directive('frameBreadcrumb', function ($rootScope, $templateCache) {
    return {
        replace: true,
        restrict: 'A',
        template: templateStr,
        controller: function ($scope) {
            $rootScope.$watch('sideBarSelectedNames', function () {
                $scope.items = $rootScope.sideBarSelectedNames || [];
            });
        }
    };
});