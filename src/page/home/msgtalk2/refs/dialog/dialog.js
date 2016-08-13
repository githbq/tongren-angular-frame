angular.module('app').factory('mDialog', function ($uibModal) {
    return {
        open: function (option) {
            var modalInstance = $uibModal.open({
                        animation: angular.isDefined(option.animationsEnabled) ? option.animationsEnabled : true,
                        template: option.templdate || require('./template.html'),
                        controller: function ($scope, $uibModalInstance) {
                            $scope.title = option.title;
                            $scope.content = option.content;
                            $scope.ok = function () {
                                $uibModalInstance.close($scope.selected.item);
                            };
                            $scope.cancel = function () {
                                $uibModalInstance.dismiss('cancel');
                            };
                            option.ctrl && option.ctrl($scope, $uibModalInstance);
                        },
                        size: option.size
                    }
                )
                ;
            option.ok = function () {
                $uibModalInstance.close($scope.selected.item);
            };

            option.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            modalInstance.result.then(option.onLoad || angular.noop, option.onClose || angular.noop);
            return modalInstance;
        }
    }
})
;