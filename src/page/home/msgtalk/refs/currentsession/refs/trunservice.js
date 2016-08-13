//转移会话服务
angular.module('app').factory('currentSessionTrun', function () {
    return {// 转至等待中列表
        turnWait: function(){
            var me = this;

            util.api({
                url: '/message/forwardsessiontowaiting',
                method: 'post',
                data: { sessionId: me.attr['sessionId'] },
                success: function( data ) {
                    if ( data.success ) {
                        /*
                         var model = me.$view.data('m');
                         model.status = 1;
                         me.$view.attr('data-status',1).data('m',model);
                         me.clearMsgTime();  	//清除信息轮询
                         */
                        me.remove();
                        me.onTurnWait( me.attr['sessionId'] );
                    } else {
                        util.showTip( data.message );
                    }
                }
            });
        },

        // 转至结束列表
        turnEnd: function(){
            var me = this;

            util.api({
                url: '/message/stopsession',
                method: 'post',
                data: { sessionId: me.attr['sessionId'] },
                success: function( data ) {
                    if ( data.success ) {
                        /*
                         var model = me.$view.data('m');
                         model.status = 3;
                         me.$view.attr('data-status',3).data('m',model);
                         me.clearMsgTime(); 		//清除信息轮询
                         */
                        me.remove();
                        me.onTurnEnd( me.attr['sessionId'] );
                    } else {
                        util.showTip( data.message );
                    }
                }
            });
        }};
});