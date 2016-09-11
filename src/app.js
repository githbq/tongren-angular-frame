var states = states || [];
var menus = require('./menus');

var app = angular.module('ibss', ['common.frame', 'ui.router', 'oc.lazyLoad', 'ngSanitize', 'common.components', 'angular-drag']);

require('./config.js');

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.defaults.withCredentials = true;

    $urlRouterProvider.otherwise('/index');

    states.forEach(function (state) {
        $stateProvider.state(state.name, state);
    });
});

app.run(function ($rootScope, i18nService) {
    i18nService.setCurrentLang("zh-cn");
    $rootScope.pageLoaded = true;
    if (menus) {
        console.log('Local menus loaded.');
        $rootScope.menus = menus;
    }

    $rootScope.$on('$stateChangeStart', function () {
        $rootScope.viewsLoaded = false;
    });
    $rootScope.$on('$viewContentLoaded', function () {
        $rootScope.viewsLoaded = true;
    });
}); 