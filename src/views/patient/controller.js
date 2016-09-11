require('./patient.less');

angular.module('app').controller('homepatientController', function($scope,uiGridConstants) {
	$scope.gridOptions = {
		totalItems: 60,
		enableSorting: false,
		showGridFooter: false,
		enableGridMenu: true,
		enableFiltering: false, 
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
		{patientName:'患者1',gender:'男',age:'40',mobilePhone:'张医生',level:'1',status:'未处理' },
		{patientName:'患者2',gender:'男',age:'40',mobilePhone:'张医生',level:'1',status:'未处理' },
		{patientName:'患者3',gender:'男',age:'40',mobilePhone:'张医生',level:'1',status:'未处理' },
		{patientName:'患者4',gender:'男',age:'40',mobilePhone:'张医生',level:'1',status:'未处理' },
		{patientName:'患者5',gender:'男',age:'40',mobilePhone:'张医生',level:'1',status:'未处理' },
		{patientName:'患者6',gender:'男',age:'40',mobilePhone:'张医生',level:'1',status:'未处理' },
		{patientName:'患者7',gender:'男',age:'40',mobilePhone:'张医生',level:'1',status:'未处理' },
		{patientName:'患者8',gender:'男',age:'40',mobilePhone:'张医生',level:'1',status:'未处理' }

	];
	$scope.gridOptions.data=$scope.gridOptions.data.concat($scope.gridOptions.data);
	$scope.gridOptions.columnDefs = [
		{displayName:'患者姓名',name: 'patientName', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'性别',name:'gender', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'年龄',name:'age', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'手机号',name:'mobilePhone', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'上传医生',name:'updateDoctor', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'级别',name:'level', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'处理状态',name:'status', aggregationType: uiGridConstants.aggregationTypes.count},
		{displayName:'操作',name:'operation', aggregationType: uiGridConstants.aggregationTypes.count}

	];
});

