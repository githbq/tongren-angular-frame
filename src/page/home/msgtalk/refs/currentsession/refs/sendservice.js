//当前会话发送服务
angular.module('app').factory('currentSessionSend', function (util) {
    return {// 等待中 已结束session 发送请求前须转换状态
        // 成功转换后 发送信息
        preSend: function (callback) {
            var me = this;

            util.api({
                type: 'post',
                url: '/message/acceptsession',
                data: {sessionId: me.attr['sessionId']},
                success: function (data) {
                    if (data.success) {

                        me.$view.attr('data-status', 2).data('m', data['value']['model']);
                        me.onTurnService(me.attr.sessionId, data['value']['model']);
                        callback();
                    } else {
                        util.showToast(data.message);
                    }
                }
            });
        }
    ,

        ////////////////////////
        //  发送纷享大表情    //
        ////////////////////////
        sendEmotion: function (emotionId, callback, closeMask) {
            var me = this;

            util.api({
                'type': 'post',
                'url': '/message/sendmessage',
                'data': {
                    'sessionId': me.attr['sessionId'],
                    'previousMessageId': me.model['endId'],
                    'content': JSON.stringify({'PackId': 'FSB-0', 'Index': emotionId}),
                    'messageType': "E"
                },
                'success': function (data) {
                    callback();
                },
                'complete': function () {
                    if (closeMask) {
                        me.$contentSend.removeClass('sending')
                    }
                }
            })
        }
    ,

        ////////////////////////
        //      发送文件      //
        ////////////////////////
        sendFile: function (type, callback, closeMask) {
            var me = this;
            var fd = new FormData(),
                xhr = new XMLHttpRequest();
            switch (type) {

                //语音文件
                case 'A':
                    xhr.open('post', '/td/api/notice/uploadG', true);
                    fd.append('messageType', type);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            var info = JSON.parse(xhr.response);
                            var model = JSON.parse(info.value.model);
                            var content = JSON.stringify({'File': model['path'], 'Duration': me.audiodata.duration});
                            sendMsg(content);
                        }
                    }
                    fd.append('upfile', me.audiodata.blob, 'audio.wav');
                    xhr.send(fd);
                    break;

                //图片文件
                case 'I':
                    xhr.open('post', '/td/api/notice/uploadG', true);
                    fd.append('messageType', type);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            var info = JSON.parse(xhr.response);
                            var model = JSON.parse(info.value.model);
                            var content = JSON.stringify({'Image': model['path'], 'FileSize': model['FileSize'], 'Thumbnail': model['Thumbnail'], 'ThumbW': model['ThumbW'], 'ThumbH': model['ThumbH']});
                            sendMsg(content);
                        }
                    }
                    fd.append('upfile', me.imgfile);
                    xhr.send(fd);
                    break;

                //粘贴图片文件
                case 'PASTE':
                    xhr.open('post', '/td/api/message/uploaddataurl', true);
                    fd.append('dataUrl', me.pastefile.dataURL.slice(me.pastefile.dataURL.indexOf(',') + 1));
                    fd.append('ext', 'png');
                    fd.append('optional', 150);
                    fd.append('zoomOut', true);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            var info = JSON.parse(xhr.response);
                            var model = JSON.parse(info.value.model);
                            var content = JSON.stringify({'Image': model['path'], 'FileSize': model['FileSize'], 'Thumbnail': model['Thumbnail'], 'ThumbW': model['ThumbW'], 'ThumbH': model['ThumbH']});
                            sendMsg(content);
                        }
                    }
                    xhr.send(fd);
                    break;

                //文档文件
                case 'D':
                    xhr.open('post', '/td/api/notice/uploadG', true);
                    fd.append('messageType', type);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            var info = JSON.parse(xhr.response);
                            var model = JSON.parse(info.value.model);
                            var content = JSON.stringify({'File': model['path'], 'Size': model['FileSize'], 'Prv': model['Prv'], 'Name': me.commonfile.name});
                            sendMsg(content);
                        }
                    }
                    fd.append('upfile', me.commonfile);
                    xhr.send(fd);
                    break;
            }
            //发送信息
            function sendMsg(content) {
                if (type == 'PASTE') {
                    type = 'I'
                }
                util.api({
                    'type': 'post',
                    'url': '/message/sendmessage',
                    'data': {
                        'sessionId': me.attr['sessionId'],
                        'content': content,
                        'previousMessageId': me.model['endId'],
                        'messageType': type
                    },
                    'success': function (data) {
                        callback();
                    },
                    'complete': function () {
                        if (closeMask) {
                            me.$contentSend.removeClass('sending');
                        }
                    }
                })
            }
        }
    ,

        ///////////////////////
        //		发送文本
        // @param callback   发送成功的回调
        // @param closeMask  是否取消遮罩
        //
        ///////////////////////
        sendTxt: function (content, callback, closeMask) {
            var me = this;

            //
            // 进行content校验 去除script标签等
            //
            //var content = util.html_encode( content );


            // 如果保存自定义回复check 开启
            // 则发送请求保存自定义回复
            if (me.$savereply[0].checked) {
                util.api({
                    'type': 'post',
                    'url': '/quickmessage/add',
                    'data': {
                        'content': content
                    },
                    'success': function (data) {
                        if (data.success) {
                            //todo
                        }
                    }
                })
            }

            util.api({
                'type': 'post',
                'url': '/message/sendmessage',
                'data': {
                    'sessionId': me.attr['sessionId'],
                    'content': content,
                    'previousMessageId': me.model['endId'],
                    'messageType': 'T'
                },
                'success': function (data) {
                    if (data.success) {
                        callback();
                    }
                },
                'complete': function () {
                    if (closeMask) {
                        me.$contentSend.removeClass('sending');
                    }
                }
            })
        }
    }
    ;
});