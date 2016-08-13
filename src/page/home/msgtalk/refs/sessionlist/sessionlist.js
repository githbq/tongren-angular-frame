var templateStr = require('./sessionlist.html');
require('./sessionlist.less');
angular.module('app').directive('sessionlist', function ($timeout) {
    return {
        replace: true,
        restrict: 'C',
        template: templateStr,
        controller: function ($scope) {
            $scope.changeTab = function (index) {
                top.document.title = 'tab' + index;
            };
            $timeout(function () {
                $scope.tooltipIsOpen = !$scope.tooltipIsOpen;
            }, 10);

        }
    };
});