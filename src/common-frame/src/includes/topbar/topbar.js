var template = require( './topbar.html' );
require( './topbar.less' );

angular.module( 'common.frame' ).directive( 'frameTopbar', [ 'genericRequests', '$timeout', function ( genericRequests, $timeout ) {
    return {
        restrict: 'AE',
        replace: true,
        template: template,
        link: function ( scope ) {

            var INTERVAL_MESSAGES = 15000;

            // function getMessages() {
            //     genericRequests.getMessages( function ( data ) {
            //         var messages = data.value.model;
            //         scope.messages = messages;
            //     } );
            //     $timeout( getMessages, INTERVAL_MESSAGES );
            // }

            // scope.$on('loadingMessages', function(e) {
            //     getMessages();
            // });
        }
    };
} ] );