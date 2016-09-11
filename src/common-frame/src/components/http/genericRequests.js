require( './httpRequests.js' );

angular.module( 'common.frame' ).factory( 'genericRequests', [ 'httpRequests', function ( httpRequests ) {
    var URLS = {
        PROFILE: 'http://localhost:8110/portal/g/api/profile/mine',
        MENUS: 'http://localhost:63342/ibss-common-frame/build/navbar-data.json',
        MSGS: 'http://localhost:8110/portal/g/api/message/getall'
    };

    var requests = {
        getMenus: function ( callback ) {
            httpRequests.get( URLS.MENUS, callback );
        },
        getProfile: function ( callback ) {
            httpRequests.post( URLS.PROFILE, callback );
        },
        getMessages: function ( callback ) {
            httpRequests.post( URLS.MSGS, callback );
        }
    };

    return requests;
} ] );