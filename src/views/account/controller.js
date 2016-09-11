require('./account.less');
angular.module('app').controller('homeaccountController', function ($scope, uiGridConstants, customDialog) {
	$scope.open = function (size) {
		customDialog.open({
			title: '1111AAAAB',
			animation: true,
			content: require('./showdetail.html'),
			ctrl: function ($scope, $uibModalInstance) {
				$scope.save = function () { alert('save') }
			},
			size: size,
			onLoad: function (selectedItem) {
			},
			onClose: function () {
			}
		});
	};
	$scope.gridOptions = {
		totalItems: 60,
		enableGridMenu: false,
		paginationChanged: function () {
			alert('paginationChanged')
		}
	};
	$scope.gridOptions.data = [
		{ accountName: 'abcd2011', userName: '张三', job: '销售', mobilePhone: '13789873643', teamName: '前线组', isOverTime: '是' },
		{ accountName: 'abcd2012', userName: '张三', job: '销售', mobilePhone: '13789873643', teamName: '前线组', isOverTime: '是' },
		{ accountName: 'abcd2013', userName: '张三', job: '销售', mobilePhone: '13789873643', teamName: '前线组', isOverTime: '是' },
		{ accountName: 'abcd2014', userName: '张三', job: '销售', mobilePhone: '13789873643', teamName: '前线组', isOverTime: '是' },
		{ accountName: 'abcd2015', userName: '张三', job: '销售', mobilePhone: '13789873643', teamName: '前线组', isOverTime: '是' },
		{ accountName: 'abcd2016', userName: '张三', job: '销售', mobilePhone: '13789873643', teamName: '前线组', isOverTime: '是' },
		{ accountName: 'abcd2017', userName: '张三', job: '销售', mobilePhone: '13789873643', teamName: '前线组', isOverTime: '是' },
		{ accountName: 'abcd2018', userName: '张三', job: '销售', mobilePhone: '13789873643', teamName: '前线组', isOverTime: '是' }

	];
	$scope.gridOptions.data = $scope.gridOptions.data.concat(angular.copy($scope.gridOptions.data));
	$scope.open = function ($event) {
		customDialog.open({
			title: '用户列表',
			content: require('./newsessiontemplate.html'),
			ctrl: function (dialogScope, $uibModalInstance) {
			},
			size: 'lg'   
		});
		$event.stopPropagation();
	}
	$scope.gridOptions.columnDefs = [
		{ displayName: '账号名称', field: 'accountName' },
		{ displayName: '姓名', field: 'userName' },
		{ displayName: '职务', field: 'job' },
		{ displayName: '手机号', field: 'mobilePhone' },   
		{ displayName: '组别', field: 'teamName' },
		{ displayName: '是否加班', field: 'isOverTime' },
		{
			displayName: '操作',
			field: 'operation',
			enableColumnMenu: false,
			cellTemplate: '<button type="button" class="btn btn-default" ng-click="grid.appScope.$parent.open($event)">查看</button>'
			//	cellTemplate: '<button id="editBtn" type="button" class="btn-small" ng-click="grid.appScope.edit(row.entity)" >Edit</button> '
		}
	];
});

