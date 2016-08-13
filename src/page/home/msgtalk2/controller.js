require('./msgtalk2.less');
require('./refs/index');
angular.module('app').controller('homemsgtalk2Controller', function ($scope, mDialog) {
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;
    $scope.open = function (size) {
        mDialog.open({
            title: '1111AAAAB',
            animation: $scope.animationsEnabled,
            content: require('./template.html'),
            ctrl: function ($scope, $uibModalInstance) {
                $scope.items = ['item1', 'item2', 'item3'];
            },
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            },
            onLoad: function (selectedItem) {
            },
            onClose: function () {
            }
        });
    };
    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
});

