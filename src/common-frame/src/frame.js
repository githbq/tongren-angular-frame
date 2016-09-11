var template = require( './frame.html' );
require( './frame.less' );
require( 'bootstrap/dist/css/bootstrap.css' );
require( 'angular-ui-layout/src/ui-layout.css' );
require( 'angularjs-toaster/toaster.css' );
// require( 'jquery' ); 
// require( 'angular' );
require( 'angular-local-storage' );
require( 'angular-ui-bootstrap' );
require( './components/ui-layout/ui-layout' );
require( 'angular-animate' );
require( 'angularjs-toaster' );

angular.module( 'common.frame', [ 'ui.layout', 'ui.bootstrap', 'toaster', 'ngAnimate', 'LocalStorageModule' ] ).directive( 'ibssFrame', [ 'genericRequests', 'localStorageService', function ( genericRequests, localStorageService ) {
    return {
        restrict: 'AE',
        transclude: true,
        template: template,
        replace: true,
        scope: {
            title: '@',
            build: '@'
        },
        link: function ( scope ) {
            if ( !scope.title ) {
                scope.title = '汇聚';
            }
            scope.toggleNavbar = function () {
                console.log( 'LocalStorage [ Toggle Before ]: ' + scope.navbarCollapsed );
                scope.navbarCollapsed = !scope.navbarCollapsed;
                localStorageService.set( 'navbarCollapsed', scope.navbarCollapsed );
                console.log( 'LocalStorage: [ Toggle After ]: ' + scope.navbarCollapsed );
            };

            function getProfile() {
                // genericRequests.getProfile( function ( data ) {
                //     var profile = data.value.model;
                //     scope.accountName = profile.name;
                // } );
            }

            var isDevelopment = ( scope.build && scope.build === 'dev' );

            if ( !isDevelopment ) {
                getProfile();
                scope.$emit( 'loadingMessages' );
                scope.$emit( 'loadingMenus' );
            }
        },
        controller: function ( $scope ) {

            function initializeLocalStorage() {
                var navbarCollapsed = localStorageService.get( 'navbarCollapsed' );
                if ( navbarCollapsed === undefined ) {
                    navbarCollapsed = true;
                    console.log( 'INITIALIZE' );
                    localStorageService.set( 'navbarCollapsed', navbarCollapsed );
                }
                $scope.navbarCollapsed = navbarCollapsed;
                console.log( 'LocalStorage [ Initialize ]: ' + navbarCollapsed );
            }

            $scope.$watch( 'navbarCollapsed', function ( nv, ov ) {
                console.log( 'navbarCollapsed changed from: [' + ov + ' ] to [' + nv + ' ]' );
            } );

            initializeLocalStorage();
        }
    };
} ] );

require( './components/http/genericRequests.js' );
require( './includes/navbar/navbar.js' );
require( './includes/topbar/topbar.js' );