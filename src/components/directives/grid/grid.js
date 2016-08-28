var templateStr = require('./grid.html');
require('./grid.less');
angular.module('app').directive('normalGrid', function () {
    return {
        restrict: 'CA',
        template: templateStr,
        scope:{normalGrid:'=',pageChange:'='},
        controller: function ($scope,uiGridConstants) {
            $scope.gridOptions=$scope.normalGrid;
            $scope.$watch('gridOptions.paginationCurrentPage', function (newVal, oldVal) {
                if (angular.isDefined(newVal)) {
                    if($scope.pageChange){
                        $scope.pageChange(newVal, oldVal);
                    }
                }
            });
            $scope.gridOptions.onRegisterApi = function (gridApi) {
                $scope.gridOptions.gridApi = gridApi;
                gridApi.core.addRowHeaderColumn( { name: '__sequence', displayName: '#', width: 50, cellTemplate:'ui-grid/uiGridCell'} );
                gridApi.grid.registerRowsProcessor( $scope.addIndexColumn, 200 );
                $scope.gridOptions.onRegisterApiCallback&&$scope.gridOptions.onRegisterApiCallback();
                //$interval( function() {
                //    $scope.gridApi.core.handleWindowResize();
                //}, 500, 10);
            };
            $scope.addIndexColumn = function( renderableRows ){
                angular.forEach(renderableRows,function( row ,i) {
                    row.entity.__sequence=i+1;
                });
                return renderableRows;
            }
            //$scope.gridOptions = {
            //    totalItems: 60,
            //    enableSorting: false,
            //    showGridFooter: false,
            //    enableGridMenu: true,
            //    enableFiltering: false,
            //    paginationPageSizes: [3, 50, 75, 100],
            //    paginationPageSize: 5,
            //    useExternalPagination: false,
            //    useExternalSorting: false,
            //    paginationChanged: function () {
            //        alert('paginationChanged');
            //    }
            //};
            //$scope.gridOptions.onRegisterApi = function (gridApi) {
            //    $scope.gridOptions.gridApi = gridApi;
            //    //$interval( function() {
            //    //    $scope.gridApi.core.handleWindowResize();
            //    //}, 500, 10);
            //};
            //$scope.gridOptions.data = [
            //    {
            //        "name": "Ethel Price",
            //        "gender": "female",
            //        "company": "Enersol"
            //    },
            //    {
            //        "name": "Claudine Neal",
            //        "gender": "female",
            //        "company": "Sealoud"
            //    },
            //    {
            //        "name": "Beryl Rice",
            //        "gender": "female",
            //        "company": "Velity"
            //    },
            //    {
            //        "name": "Wilder Gonzales",
            //        "gender": "male",
            //        "company": "Geekko"
            //    },
            //    {
            //        "name": "Georgina Schultz",
            //        "gender": "female",
            //        "company": "Suretech"
            //    },
            //    {
            //        "name": "Carroll Buchanan",
            //        "gender": "male",
            //        "company": "Ecosys"
            //    },
            //    {
            //        "name": "Valarie Atkinson",
            //        "gender": "female",
            //        "company": "Hopeli"
            //    },
            //    {
            //        "name": "Schroeder Mathews",
            //        "gender": "male",
            //        "company": "Polarium"
            //    },
            //    {
            //        "name": "Lynda Mendoza",
            //        "gender": "female",
            //        "company": "Dogspa"
            //    },
            //    {
            //        "name": "Sarah Massey",
            //        "gender": "female",
            //        "company": "Bisba"
            //    },
            //    {
            //        "name": "Robles Boyle",
            //        "gender": "male",
            //        "company": "Comtract"
            //    },
            //    {
            //        "name": "Evans Hickman",
            //        "gender": "male",
            //        "company": "Parleynet"
            //    },
            //    {
            //        "name": "Dawson Barber",
            //        "gender": "male",
            //        "company": "Dymi"
            //    },
            //    {
            //        "name": "Bruce Strong",
            //        "gender": "male",
            //        "company": "Xyqag"
            //    },
            //    {
            //        "name": "Nellie Whitfield",
            //        "gender": "female",
            //        "company": "Exospace"
            //    },
            //    {
            //        "name": "Jackson Macias",
            //        "gender": "male",
            //        "company": "Aquamate"
            //    },
            //    {
            //        "name": "Pena Pena",
            //        "gender": "male",
            //        "company": "Quarx"
            //    },
            //    {
            //        "name": "Lelia Gates",
            //        "gender": "female",
            //        "company": "Proxsoft"
            //    },
            //    {
            //        "name": "Letitia Vasquez",
            //        "gender": "female",
            //        "company": "Slumberia"
            //    },
            //    {
            //        "name": "Trevino Moreno",
            //        "gender": "male",
            //        "company": "Conjurica"
            //    }
            //];
            //$scope.gridOptions.columnDefs = [
            //    {name: 'name', aggregationType: uiGridConstants.aggregationTypes.count},
            //    {
            //        name: 'gender', filter: {term: 'male'}, width: 150, enableCellEdit: false,
            //        cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
            //            if (grid.getCellValue(row, col) === 'male') {
            //                return 'blue';
            //            } else if (grid.getCellValue(row, col) === 'female') {
            //                return 'pink';
            //            }
            //        }
            //    },
            //    {name: 'age', aggregationType: uiGridConstants.aggregationTypes.avg, width: 100},
            //    {name: 'company', enableFiltering: false, width: 200}
            //];
        }
    };
});