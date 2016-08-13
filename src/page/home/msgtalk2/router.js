/**
 * 路由扩展配置
 * templateProvider,resolve.loadController由架构默认设定，无需更改
 * 需用controller指定controller名称
 */
module.exports = {
    state: 'msgtalk2',
    config: {
        controller: 'homemsgtalk2Controller',
        resolve: {
            test: function() {
                console.log('msgtalk2: resolve.test is run');
            }
        }
    }
};