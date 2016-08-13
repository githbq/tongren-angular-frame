require('./info.less');
angular.module('app').controller('homeinfoController', function($scope,uiGridConstants) {
	$scope.gridOptions = {
		totalItems: 60,
		enableSorting: false,
		showGridFooter: false,
		enableGridMenu: true,
		enableFiltering: false,
		paginationPageSizes: [3, 50, 75, 100],
		paginationPageSize: 5,
		useExternalPagination: false,
		useExternalSorting: false,
		paginationChanged: function () {
			alert('paginationChanged')
		}
	};
	$scope.gridOptions.onRegisterApi = function (gridApi) {
		$scope.gridOptions.gridApi = gridApi;
		//$interval( function() {
		//    $scope.gridApi.core.handleWindowResize();
		//}, 500, 10);
	};
	$scope.gridOptions.data = [
		{name:'奥运会1',time:'2016/08/11',status:'未发布' },
		{name:'奥运会2',time:'2016/08/12',status:'未发布' },
		{name:'奥运会3',time:'2016/08/13',status:'未发布' },
		{name:'奥运会4',time:'2016/08/14',status:'未发布' },
		{name:'奥运会5',time:'2016/08/15',status:'未发布' },
		{name:'奥运会6',time:'2016/08/16',status:'未发布' },
		{name:'奥运会7',time:'2016/08/17',status:'未发布' },
		{name:'奥运会8',time:'2016/08/18',status:'未发布' }

	];
	$scope.gridOptions.data=$scope.gridOptions.data.concat($scope.gridOptions.data);
	$scope.gridOptions.columnDefs = [
		{displayName:'资讯名称',name: 'name', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'发布时间',name:'time', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'资讯状态',name:'status', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'操作',name:'operation', aggregationType: uiGridConstants.aggregationTypes.count}
	];
});

