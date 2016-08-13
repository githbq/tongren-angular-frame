require('./account.less');
angular.module('app').controller('homeaccountController', function($scope,uiGridConstants) {
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
		{accountName:'abcd2011',userName:'张三',job:'销售',手机号:'13789873643',teamName:'前线组',isOverTime:'是'},
		{accountName:'abcd2012',userName:'张三',job:'销售',手机号:'13789873643',teamName:'前线组',isOverTime:'是'},
		{accountName:'abcd2013',userName:'张三',job:'销售',手机号:'13789873643',teamName:'前线组',isOverTime:'是'},
		{accountName:'abcd2014',userName:'张三',job:'销售',手机号:'13789873643',teamName:'前线组',isOverTime:'是'},
		{accountName:'abcd2015',userName:'张三',job:'销售',手机号:'13789873643',teamName:'前线组',isOverTime:'是'},
		{accountName:'abcd2016',userName:'张三',job:'销售',手机号:'13789873643',teamName:'前线组',isOverTime:'是'},
		{accountName:'abcd2017',userName:'张三',job:'销售',手机号:'13789873643',teamName:'前线组',isOverTime:'是'},
		{accountName:'abcd2018',userName:'张三',job:'销售',手机号:'13789873643',teamName:'前线组',isOverTime:'是'}

	];
	$scope.gridOptions.data=$scope.gridOptions.data.concat($scope.gridOptions.data);
	$scope.gridOptions.columnDefs = [
	    {displayName:'账号名称',name: 'accountName', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'姓名',name:'userName', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'职务',name:'job', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'手机号',name:'mobilePhone', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'组别',name:'teamName', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'是否加班',name:'isOverTime', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'操作',
			enableFiltering: false,name:'operation',
			aggregationType: uiGridConstants.aggregationTypes.count,
			 	cellTemplate: '<button type="button" class="btn btn-default">查看</button>'
			//	cellTemplate: '<button id="editBtn" type="button" class="btn-small" ng-click="grid.appScope.edit(row.entity)" >Edit</button> '
		}
	];
});

