
/**
 * 此处描述了路由到加md5戳后的映射，正式发布时工具会用加md5戳的文件名替换pageHashName的值
 * 注：所有的pageHashName都不能重复
 * @type {Object}
 */

module.exports = {
    publicPath: '',// 无需改写，正式发布时，会用webpack output.publicPath替换该值
    pageConfig: {
        'index': {
            'pageJsHashName': 'index',
            'subPage': {
                'dialog': {
                    'pageJsHashName': 'index_dialog'
                }
            }
        },
        'home': {
            'pageJsHashName': 'home',
            'subPage': {
                'dictionary': {
                    'pageJsHashName': 'home_dictionary'
                },
                'shortmessage': {
                    'pageJsHashName': 'home_shortmessage'
                },
                'meeting': {
                    'pageJsHashName': 'home_meeting'
                },
                'doctor': {
                    'pageJsHashName': 'home_doctor'
                },
                'patient': {
                    'pageJsHashName': 'home_patient'
                },
                'info': {
                    'pageJsHashName': 'home_info'
                },
                'account': {
                    'pageJsHashName': 'home_account'
                },
                'msgtalk3': {
                    'pageJsHashName': 'home_msgtalk3'
                },
                'msgtalk2': {
                    'pageJsHashName': 'home_msgtalk2'
                },
                'msgtalk': {
                    'pageJsHashName': 'home_msgtalk'
                }
            }
        }
    }
};