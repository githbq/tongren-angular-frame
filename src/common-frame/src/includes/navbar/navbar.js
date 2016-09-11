var template = require('./navbar.html');
require('./navbar.less');

angular.module('common.frame').directive('frameNavbar', ['genericRequests', '$rootScope', function (genericRequests, $rootScope) {
    return {
        restrict: 'AE',
        replace: true,
        template: template,
        link: function (scope) {
            // scope.$on('loadingMenus', function () {
            //     getMenus();
            // });
            // function getMenus() {
            //     genericRequests.getMenus(function (data) {
            //         scope.menus = data;
            //     });
            // }

            scope.display = function (item, $event) {
                if (item.children) {
                    item.collapsed = !item.collapsed;
                    $event.stopPropagation();
                }      
            };
            if ($rootScope.menus) {
                scope.menus = $rootScope.menus;

            }
        }
    };
}]);