var templateStr = require('./sidebar.html');
require('./sidebar.less');
angular.module('app').directive('frameSidebar', function ($templateCache, $timeout) {
    $templateCache.put('treeItemTemplate', $(templateStr).filter('#treeItemTemplate').html());
    return {
        restrict: 'C',
        template: $(templateStr).filter('#treeViewTemplate').html(),
        scope: {
            treeData: '=',
            canChecked: '=',
            textField: '@',
            itemClicked: '&',
            itemCheckedChanged: '&'
        },
        link: function (scope, iElem, iAttr) {
            $timeout(function () {
                $('[data-level]', iElem).each(function (i, n) {
                    if ($(n).attr('data-level')) {
                        $(n).css('text-indent', parseInt($(n).css('font-size')) * $(n).attr('data-level'));
                    }
                });
            }, 10);
        },
        controller: ['$scope', '$templateCache', "$rootScope", function ($scope, $templateCache, $rootScope) {
            if ($scope.treeData) {
                angular.forEach($scope.treeData, function (item, i) {
                    setItemParentList(item);
                });
                function setItemParentList(item, parents) {
                    parents = parents || [];
                    item.parents = parents;
                    if (item.children) {
                        for (var i = 0; i < item.children.length; i++) {
                            var tempParents = parents.concat([item]);
                            setItemParentList(item.children[i], tempParents);
                        }
                    }
                }
            }

            $scope.itemExpended = function (item, $event) {
                $rootScope.preItem && ( $rootScope.preItem.active = false);
                item.active = true;
                $rootScope.preItem = item;
                item.$$isExpend = !item.$$isExpend;
                var selects = [];
                for (var i = 0; i < item.parents.length; i++) {
                    if (item.parents[i].name) {
                        selects.push(item.parents[i].name);
                    }
                }
                selects.push(item.name);
                if ($scope.isLeaf(item)) {
                    $rootScope.sideBarSelectedNames = selects;
                    $rootScope.sideBarSelectedData = item.parents.concat(item);
                }
                $event.stopPropagation();
            };

            $scope.getItemIcon = function (item) {
                var isLeaf = $scope.isLeaf(item);
                if (isLeaf) {
                    return 'fa fa-leaf';
                }
                return item.$$isExpend ? 'minus' : 'plus';
            };
            $scope.isLeaf = function (item) {
                return !item.children || !item.children.length;
            };

            $scope.warpCallback = function (callback, item, $event) {
                ($scope[callback] || angular.noop)({
                    $item: item,
                    $event: $event
                });
            };
        }]
    };
});