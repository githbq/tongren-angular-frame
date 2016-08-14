require('./meeting.less');

angular.module('app').controller('homemeetingController', function($scope,uiGridConstants) {
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
			alert('paginationChanged');
		}
	};
	$scope.gridOptions.onRegisterApi = function (gridApi) {
		$scope.gridOptions.gridApi = gridApi;
		//$interval( function() {
		//    $scope.gridApi.core.handleWindowResize();
		//}, 500, 10);
	};
	$scope.gridOptions.data = [
		{name:'会议1',time:'2016/08/11',status:'已结束' },
		{name:'会议2',time:'2016/08/12',status:'已结束' },
		{name:'会议3',time:'2016/08/13',status:'已结束' },
		{name:'会议4',time:'2016/08/14',status:'已结束' },
		{name:'会议5',time:'2016/08/15',status:'已结束' },
		{name:'会议6',time:'2016/08/16',status:'已结束' },
		{name:'会议7',time:'2016/08/17',status:'已结束' },
		{name:'会议8',time:'2016/08/18',status:'已结束' }

	];
	$scope.gridOptions.data=$scope.gridOptions.data.concat($scope.gridOptions.data);
	$scope.gridOptions.columnDefs = [
		{displayName:'会议名称',name: 'name', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'布时间',name:'time', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'会议状态',name:'status', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'操作',name:'operation', aggregationType: uiGridConstants.aggregationTypes.count}
	];
});

