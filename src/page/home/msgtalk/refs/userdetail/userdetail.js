var templateStr = require('./userdetail.html');
require('./userdetail.less');
angular.module('app').directive('userdetail', function ($templateCache) {
    return {
        replace: true,
        restrict: 'C',
        template: templateStr,
        controller: function ($scope) {
        }
    };
});