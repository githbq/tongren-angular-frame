require('./home.less');
require('./refs');
angular.module('app').controller('homeController', function ($scope, $templateCache) {
    $scope.treeData = require('./refs/sidebar/sidebar-data');
    $templateCache.put('sidebar.html', require('./refs/sidebar/sidebar.html'));
    $scope.closeRightSidebar = function () {
        $scope.layout.leftSidebar = !$scope.layout.leftSidebar;
        console.warn('sidebar=>' + $scope.layout.leftSidebar);
    };
    $scope.showOffsidebar = function () {
        $scope.layout.one = !$scope.layout.one;
    };
    $scope.layout = {
        rightSidebar: true,
        toolbar: true,
        leftSidebar: false,
        mycontainer: false,
        one: false,
        four: false
    };
    $scope.config = {
        flow: 'column'
    };
    $scope.layout = {
        one: false,
        four: false
    };
    $scope.toggle = function (which) {
        $scope.layout[which] = !$scope.layout[which];
    };
    $scope.close = function (which) {
        $scope.layout[which] = true;
    };
    $scope.open = function (which) {
        $scope.layout[which] = false;
    };
    $scope.$on('ui.layout.loaded', function () {
        $timeout(function () {
            $scope.layout.one = true;
        });
    });
});