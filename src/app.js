require('bootstrap/dist/css/bootstrap.css');
require('angular/angular-csp.css');
require('angular-ui-layout/src/ui-layout.css');
require('angular-toast/dist/angular-toast.css');
require('angular-ui-grid/ui-grid.css');
var oclazyload = require('oclazyload');
var service = require('./service/service');
var deps = [require('angular-toast'), require('angular-sanitize'), require('angular-loading-bar')];
deps = deps.concat(['ui.router', 'ui.layout', 'ui.bootstrap', 'oc.lazyLoad', 'commonService']);
deps=deps.concat(['ui.grid','ui.grid.selection', 'ui.grid.moveColumns', 'ui.grid.autoResize', 'ui.grid.pinning', 'ui.grid.resizeColumns', 'ui.grid.cellNav', 'ui.grid.pagination']);
var baseModule = angular.module('baseModule', deps);
var serviceModule = angular.module('common.services', ['baseModule']);
var directiveModule = angular.module('common.directives', ['baseModule']);
var filterModule = angular.module('common.filters', ['baseModule']);
deps = deps.concat(['baseModule', 'common.directives', 'common.services', 'common.filters']);
var app = angular.module('app', deps);
require('components/index');
//require('./common/appconfig');//配置应用程序
var config = require('./config/config.js');
function getRouter(page, name, supName) {
    var pageName = supName ? supName + '/' + name : name;
    var defaultRouter = {
        url: '/' + name,
        templateProvider: ['$templateCache', '$q', function ($templateCache, $q) {
            return window.htmlFragmentscache['page/' + pageName + '/' + name + '.html'];
        }],
        controller: 'myController',
        resolve: {
            loadController: ['$ocLazyLoad', '$q', '$hash', function ($ocLazyLoad, $q, $hash) {
                var hash = $hash.getParams();
                var promise = $q.when(1);
                var configItem;
                for (var i = 0; i < hash.length; i++) {
                    var _hash = hash[i];
                    configItem = i === 0 ? config.pageConfig[_hash] : configItem.subPage[_hash];
                    promise = andThen(config.publicPath + 'js/' + configItem.pageJsHashName + '.js');
                }
                return promise;
                function andThen(path) {
                    return promise.then(function () {
                        return $ocLazyLoad.load(path);
                    });
                }
            }]
        }
    };

    // 合并路由
    var router = require('./page/' + pageName + '/router.js');
    var routerConfig = angular.extend({}, defaultRouter, router.config);
    // 下面三个为受保护的，强制改回来
    routerConfig.url = defaultRouter.url;
    routerConfig.templateProvider = defaultRouter.templateProvider;
    routerConfig.resolve.loadController = defaultRouter.resolve.loadController;
    var state = supName ? supName + '.' + router.state : router.state;
    return {
        state: state,
        config: routerConfig,
        router: router
    };
}

app.config(function ($stateProvider, $urlRouterProvider, $stateParamsProvider) {
    $urlRouterProvider.otherwise('/index');
    angular.forEach(config.pageConfig, function (page, name) {
        var router = getRouter(page, name);
        $stateProvider.state(router.state, router.config);
        if (page.subPage) {
            angular.forEach(page.subPage, function (subPage, subName) {
                var router = getRouter(subPage, subName, name);
                $stateProvider.state(router.state, router.config);
            });
        }
    });
});
require('./page/home/home.less');
require('./page/home/refs');
angular.module('app').controller('homeController', function ($scope, $templateCache, $rootScope, $timeout) {
    $scope.treeData = require('./page/home/refs/sidebar/sidebar-data');
    $templateCache.put('sidebar.html', require('./page/home/refs/sidebar/sidebar.html'));
    $scope.layout = {
        sidebar: true
    };
    $scope.config = {
        flow: 'column'
    };
    $scope.toggle = function (which) {
        console.log($scope.layout[which]);
        $scope.layout[which] = !$scope.layout[which];
    };
    $scope.close = function (which) {
        $scope.layout[which] = true;
    };
    $scope.open = function (which) {
        $scope.layout[which] = false;
    };
    $scope.loaded = true;
    $scope.routeStateValue = 0;//路由跳转状态值
    $rootScope.$watch('routeStateValue', function (newVal, oldVal) {
        $scope.routeStateValue = newVal;
    });
});
app.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        $rootScope.stateChangeStart = true;
        $rootScope.routeStateValue = 1;
    });
    // $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    //     $rootScope.stateChangeSuccess = true;
    //     $rootScope.routeStateValue = 2;
    // })
    // $rootScope.$on('$viewContentLoading',
    //     function (event, viewConfig) {
    //         $rootScope.viewContentLoading = true;
    //         $rootScope.routeStateValue = 3;
    //     });
    $rootScope.$on('$viewContentLoaded',
        function (event, viewConfig) {
            $rootScope.viewContentLoading = false;
            $rootScope.viewContentLoaded = true;
            $rootScope.routeStateValue = 4;
        });
});

angular.bootstrap(document, [app.name], { strictDi: true });