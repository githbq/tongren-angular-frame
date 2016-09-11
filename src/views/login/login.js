require('./login.less'); 
angular.module('ibss', []).controller('mainController', function ($scope, $http) {
    $scope.user = { loginName: '', password: '' };
    $scope.login = function () {
        //location.href = '/';
        $http({
            url: '/login',
            method: 'POST',
            data: $scope.user
        }).success(function (data, status, config, header) {
            if (data.success) {
                data.msg = "登录成功!";
                setTimeout(function () { location.href = "/index.html"; }, 2000);
            }
            else {
                data.msg = data.msg || "登录失败";
            }
            $scope.responseData = data;
        }).error(function (data, status, config, header) {

        });
    }
    $scope.register = function () {
        $http({
            url: '/register',
            method: 'POST',
            data: $scope.user
        }).success(function (data, status, config, header) {
            alert(JSON.stringify(data))
            $scope.responseData = data;
        }).error(function (data, status, config, header) {
        });
    }

});
 