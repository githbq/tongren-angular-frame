angular.module( 'common.frame' ).factory( 'httpRequests', [ '$http', 'toaster', function ( $http, toaster ) {

    var METHODS = { GET: 'GET', POST: 'POST' };

    return {
        get: function ( url, callback ) {
            request( METHODS.GET, url, callback );
        },
        post: function ( url, callback ) {
            request( METHODS.POST, url, callback );
        }
    };

    function request( method, url, callback ) {
        $http( {
            method: method,
            url: url,
            withCredentials: true
        } ).success(
            function ( data ) {
                if ( !data ) {
                    toaster.pop( 'error', 'Request Failed', 'No data received.' );
                    return;
                }
                if ( data.success != undefined && !data.success ) {
                    toaster.pop( 'error', 'Request Failed', data.message );
                    return;
                }
                callback && callback( data );
            } ).error( function ( data, status ) {
            toaster.pop( 'error', 'Request Failed', 'Status: ' + status );
        } );
    }
} ] );