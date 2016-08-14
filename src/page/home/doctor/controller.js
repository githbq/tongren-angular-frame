require('./doctor.less');

angular.module('app').controller('homedoctorController', function($scope,uiGridConstants) {
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
		{name:'华佗1',hospital:'同仁医院',department:'外科',title:'高级',mobilePhone:'13812345678',province:'北京',city:'北京市',area:'朝阳区',updateCount:'0'},
		{name:'华佗2',hospital:'同仁医院',department:'外科',title:'高级',mobilePhone:'13812345678',province:'北京',city:'北京市',area:'朝阳区',updateCount:'0'},
		{name:'华佗3',hospital:'同仁医院',department:'外科',title:'高级',mobilePhone:'13812345678',province:'北京',city:'北京市',area:'朝阳区',updateCount:'0'},
		{name:'华佗4',hospital:'同仁医院',department:'外科',title:'高级',mobilePhone:'13812345678',province:'北京',city:'北京市',area:'朝阳区',updateCount:'0'},
		{name:'华佗5',hospital:'同仁医院',department:'外科',title:'高级',mobilePhone:'13812345678',province:'北京',city:'北京市',area:'朝阳区',updateCount:'0'},
		{name:'华佗6',hospital:'同仁医院',department:'外科',title:'高级',mobilePhone:'13812345678',province:'北京',city:'北京市',area:'朝阳区',updateCount:'0'},
		{name:'华佗7',hospital:'同仁医院',department:'外科',title:'高级',mobilePhone:'13812345678',province:'北京',city:'北京市',area:'朝阳区',updateCount:'0'},
		{name:'华佗8',hospital:'同仁医院',department:'外科',title:'高级',mobilePhone:'13812345678',province:'北京',city:'北京市',area:'朝阳区',updateCount:'0'}

	];
	$scope.gridOptions.data=$scope.gridOptions.data.concat($scope.gridOptions.data);
	$scope.gridOptions.columnDefs = [
		{displayName:'姓名',name: 'name', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'医院',name:'hospital', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'科室',name:'department', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'职称',name:'title', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'手机号',name:'mobilePhone', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'省',name:'province', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'市',name:'city', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'区',name:'area', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'上传统计数',name:'updateCount', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'操作',name:'operation', aggregationType: uiGridConstants.aggregationTypes.count}
	];
});

