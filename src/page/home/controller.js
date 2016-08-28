// require('./home.less');
// require('./refs');
// angular.module('app').controller('homeController', function ($scope, $templateCache) {
//     $scope.treeData = require('./refs/sidebar/sidebar-data');
//     $templateCache.put('sidebar.html', require('./refs/sidebar/sidebar.html'));
//     $scope.layout = {
//         sidebar: false
//     };
//     $scope.config = {
//         flow: 'column'
//     };
//     $scope.toggle = function (which) {
//         console.log($scope.layout[which]);
//         $scope.layout[which] = !$scope.layout[which];
//     };
//     $scope.close = function (which) {
//         $scope.layout[which] = true;
//     };
//     $scope.open = function (which) {
//         $scope.layout[which] = false;
//     };
// });