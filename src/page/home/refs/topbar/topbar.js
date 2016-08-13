var templateStr = require('./topbar.html');
require('./topbar.less');
angular.module('app').directive('frameTopbar', function ($templateCache) {
    return {
        replace:true,
        restrict: 'CA',
        template: templateStr,
        controller: function($scope){

        }
    };
});