angular.module( 'ibss' ).provider( 'config', function () {
    return {
        $get: function () { return "IBSS Global Configurations"; },
        timeout: 3000
    };
} );