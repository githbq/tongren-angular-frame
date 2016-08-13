/**
 * 路由扩展配置
 * templateProvider,resolve.loadController由架构默认设定，无需更改
 * 需用controller指定controller名称
 */
module.exports = {
    state: 'msgtalk3',
    config: {
        controller: 'homemsgtalk3Controller',
        resolve: {
            test: function() {
                console.log('msgtalk3: resolve.test is run');
            }
        }
    }
};