require('./shortmessage.less');
angular.module('app').controller('homeshortmessageController', function($scope,uiGridConstants) {
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
		{name:'模板1',content:'内容123',sendCount:121 },
		{name:'模板2',content:'内容123',sendCount:122 },
		{name:'模板3',content:'内容123',sendCount:123 },
		{name:'模板4',content:'内容123',sendCount:124 },
		{name:'模板5',content:'内容123',sendCount:125 },
		{name:'模板6',content:'内容123',sendCount:126 },
		{name:'模板7',content:'内容123',sendCount:127 },
		{name:'模板8',content:'内容123',sendCount:128 }

	];
	$scope.gridOptions.data=$scope.gridOptions.data.concat($scope.gridOptions.data);
	$scope.gridOptions.columnDefs = [
		{displayName:'模板名称',name: 'name', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'模板内容',name:'content', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'已发送短信数',name:'sendCount', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'操作',name:'operation', aggregationType: uiGridConstants.aggregationTypes.count}
	];
});

