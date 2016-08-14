require('./loading.less');
angular.module('common.directives').directive('customLoading',  function ($timeout) {
    return {
        scope: {
            loading: '=customLoading'
        },
        transclude: true,
        template: require('./template.html'),
        link: function (scope) {
            scope.$watch('loading',function(newVal,OldVal){
                $timeout(function(){
                    scope.show=newVal;
                },10);
            });
        }
    };
    } );