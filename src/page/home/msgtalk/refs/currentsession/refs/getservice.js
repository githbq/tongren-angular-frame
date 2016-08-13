//获取消息服务
angular.module('app').factory('currentSessionGet', function () {
    return {
        // 获取快捷回复列表
        getFastReply: function () {
            var me = this;

            util.api({
                'type': 'post',
                'url': '/quickmessage/getall',
                'beforeSend': function () {
                    me.$fastreplylist.html('正在努力加载中...');
                },
                'success': function (info) {

                    var domStr = "";
                    _.each(info.value.model, function (value) {

                        var str = "<p data-id='" + value['id'] + "'>" + value['content'] + "</p>"

                        domStr = domStr + str;
                    })
                    me.$fastreplylist.html(domStr);
                }
            })
        },
        //获取先前的信息 并增加消息显示
        preGetMsg: function () {
            var me = this;
            if (me.model['startId'] == 0) {
                return
            }
            ;

            util.api({
                'type': 'post',
                'url': '/message/getmessages',
                'data': {
                    'sessionId': me.attr['sessionId'],
                    'startId': me.model['startId']
                },
                'success': function (data) {
                    if (data.success) {
                        if (data.value['model'].length <= 0) return;
                        me.model['list'] = data.value['model'].reverse();
                        me.model['startId'] = me.model['list'][0]['previousMessageId'];
                        me.preAddList();
                    }
                }
            })
        },

        preAddList: function () {
            var me = this,
                model = me.model['list'];

            me.parseList(model, function () {
                var listDom = '';
                for (var i = 0; i < model.length; i++) {
                    listDom = listDom + me.shiftModel(model[i]);
                }

                var $listDom = $(listDom);
                me.$infowrapper.prepend($listDom);

                var height = 0;
                for (var j = 0; j < $listDom.length; j++) {
                    height = height + $listDom.eq(j).outerHeight(true);
                }
                me.$infoContainer.scrollTop(height);
            });
        },

        //清除已有信息轮询
        clearMsgTime: function () {
            this.msgTimer && clearTimeout(this.msgTimer);
        },

        //////////////
        //
        //
        // 	获取最新信息 并刷新显示列表
        // 	成功后更新状态
        // 	并接着轮询
        // 	bool 为true 滑动到底部
        // ///////////
        getMsg: function (bool) {
            var me = this;
            me.clearMsgTime();

            util.api({
                'type': 'post',
                'url': '/message/getmessages',
                'data': {
                    'sessionId': me.attr['sessionId']
                },
                'success': function (data) {

                    console.warn(data);
                    if (data.success) {

                        // 将消息列表内容按时间顺序排列
                        me.model['list'] = data.value['model'].reverse();

                        //如果长度为0 直接返回
                        var length = me.model['list'].length;
                        if (length == 0) return;

                        // 从时间顺序第一条开始查询是否有隐藏消息类型 如果有隐藏消息类型则触发事件
                        for (var i = me.model['list'].length - 1; i >= 0; i--) {
                            if (me.model['list'][i]['messageType'] == 'HM') {
                                me.onSource(me.model['list'][i]);
                                break;
                            }
                        }

                        //me.model['startId'] = me.model['list'][0]['previousMessageId'] || 0;

                        var startId = me.model['list'][0]['previousMessageId'] || 0;          //
                        var endId = me.model['list'][length - 1]['messageId'];                  //

                        me.parentList.getCountOfSession();


                        /////////////////////////////////////
                        //
                        // 只有有新信息的时候才会刷新列表
                        // 新列表刷新的时候 也会主动触发session列表的服务列表的飘数更新函数
                        //
                        /////////////////////////////////////
                        if (me.model['endId'] < endId) {
                            me.model['endId'] = endId;
                            me.model['startId'] = startId;
                            me.refreshList();
                        }

                        if (bool) {
                            me._scrollBottom();
                        }

                        //todo
                        //当获取新信息时 如果正好滑到上面 需要有提示
                        //如何保证信息的连续性
                    }
                },
                'complete': function () {
                    me.setRead(me.attr['sessionId'], me.model['endId']);
                }
            })
        },

        // 设置已读已发送标识
        // complete后进行轮询
        setRead: function (sessionId, msgId) {
            var me = this;

            //当对话窗口里没有信息时 直接进行轮询查看是否有信息
            //
            if (msgId == 0) {
                me.msgTimer = setTimeout(function () {
                    me.getMsg()
                }, me.attr['msgTimeInterval']);

            } else {
                util.api({
                    url: '/message/updatelastread',
                    data: {sessionId: sessionId, readMessageId: msgId},
                    success: function (data) {
                        if (data.success) {
                            var $section = me.$infowrapper.find('section[data-id="' + data['value']['model'] + '"]');

                            //标为已读
                            try {

                                var $target = findPrevSection($section);
                                if ($target) {
                                    $target.addClass('read').removeClass('arrived').siblings().removeClass('read');

                                    //设为已读后 高度增加 有可能需要上滑20像素
                                    //上滑一次后 不用再次上滑
                                    //var top = me.$infoContainer.scrollTop();
                                    //me.$infoContainer.scrollTop( 20 + top );
                                }
                            } catch (err) {
                                throw err;
                            }
                        }
                    },
                    complete: function () {
                        me.msgTimer = setTimeout(function () {
                            me.getMsg()
                        }, me.attr['msgTimeInterval']);
                    }
                });
            }

            /**
             * 找到可标为已读的section
             * section若为通知类型 查找上一个section
             */
            function findPrevSection(section) {

                //为空
                if (!section || section.length <= 0) {
                    return false;
                }

                if (section.hasClass('news')) {
                    return findPrevSection(section.prev());
                } else {
                    return section;
                }
            }
        },


        ////////////////////////////
        //
        // 对列表中的数据进行预处理 通过id获取name
        // 刷新显示列表 获取最新信息
        // 查看模板引擎的渲染原理
        //
        ////////////////////////////
        refreshList: function () {
            var me = this,
                model = me.model['list'];

            me.parseList(model, function () {
                var listDom = '';
                for (var i = 0; i < model.length; i++) {
                    listDom = listDom + me.shiftModel(model[i]);
                }
                me.$infowrapper.html(listDom).find('section.info-r:last').addClass('arrived').siblings().removeClass('arrived');

                //滚动到底部
                me._scrollBottom();
            });
        },

        //滚动到聊天窗口底部
        _scrollBottom: function () {
            var me = this;

            var heightSpace = me.$infowrapper.outerHeight(true) - me.$infoContainer.height();
            if (heightSpace < 0) {
                heightSpace = 0;
            }
            me.$infoContainer.scrollTop(heightSpace);
        },

        /////////////////////
        //
        //对聊天信息进行预处理
        //获取发送者name 转化时间 成功后执行callback
        //
        //////////////////////
        parseList: function (model, callback) {
            var me = this;

            //收集需要获取name的id
            var cacheUsers = {};
            _.each(model, function (element, index) {
                if (element.senderType == 1) {
                    if (element.senderId.indexOf('S.S.') != 0) {
                        var id = parseInt(element.senderId.split('.')[2]);
                        if (id < 1000) {
                            id = 1000 + id;
                        }
                        if (IBSS.USERS[id]) return;
                        cacheUsers[id] = false;
                    }
                }
            });

            //获取name
            if (_.isEmpty(cacheUsers)) {
                refresh();
            } else {
                _.each(cacheUsers, function (value, key) {
                    util.api({
                        'url': '~/g/api/account/getnamebyid',
                        'data': {
                            'id': key
                        },
                        success: function (data) {
                            if (data.success) {
                                cacheUsers[key] = data['value']['model'];
                                IBSS.USERS[key] = data['value']['model'];
                                if (checkOk()) {
                                    refresh();
                                }
                            }
                        }
                    })
                });
            }


            //检查客户名字是否已经获取完毕
            function checkOk() {
                for (var key in cacheUsers) {
                    if (cacheUsers[key] == false) return false;
                }
                return true;
            }


            //转换时间
            function refresh() {
                for (var i = 0; i < model.length; i++) {
                    var m = model[i];
                    if (model[i]['senderType'] == 1) {
                        if (m.senderId.indexOf('S.S.') == 0) {
                            model[i].serverName = '纷享客服';
                        } else {
                            var id = parseInt(model[i]['senderId'].split('.')[2]);
                            if (id < 1000) {
                                id = 1000 + id;
                            }
                            model[i]['serverName'] = IBSS.USERS[id];
                        }
                    } else {
                        model[i]['serverName'] = '';
                    }
                    model[i]['displayMessageTime'] = util.translateTime(model[i]['messageTime']);
                }
                callback();
            }
        },

        /*
         * 对话信息的数据dom转换
         * 返回 sectiondom 信息
         */
        shiftModel: function (info) {

            var type = info.senderType,
                sectionDom;


            var classType,       //  section 类名
                content = '',    //  内容
                jc,
                avatar = '',     //  头像链接地址
                ac = '';         //

            if (info.messageType != 'T') {
                jc = $.parseJSON(info.content);
                //console.log( jc );
            }


            /*
             *type  0客户 1客服
             */
            if (type == 1) {
                classType = 'info-r';
                avatar = IBSS.COMMON_PATH + '/images/avatar-human-36.png';
            } else {
                classType = 'info-l';
                avatar = this.attr.avatar;
            }

            // info.messageType
            // info.senderId
            switch (info.messageType) {


            /**
             *
             * 相对于文本类型
             * 展示的内容会把
             * 类似[weixiao] emoji? 等转换为图片标签
             * 第一层先做转义 滤去依赖注入
             */
                //文本文件
                case "T":
                    if (info.senderId == 'S.S.1') {

                        classType += ' bee';
                        avatar = IBSS.COMMON_PATH + '/images/avatar-bee-36.png';
                    } else if (info.senderId == 'S.S.2') {

                        classType += ' human';
                    } else {

                    }
                    content = util.html_encode(info.content);
                    content = util.emojiAll(content);
                    content = util.replaceLink(content);
                    break;
                //隐藏类型信息直接 返回空字符串
                case "HM":
                    //content = '[隐藏类型消息]<a target="_blank" href="' + IBSS.getHideMsg(jc.value)['href'] + '">' + IBSS.getHideMsg(jc.value)['text'] + '</a>';
                    return "";
                    break;

                //语音文件
                case "A":
                    classType += ' audio';
                    content = '<div class="ac" data-src="' + jc.File + '" data-duration="' + jc.Duration + '"><img src="' + IBSS.COMMON_PATH + '/images/audio-grey.png" /><span class="duration">' + jc.Duration + '\'\'</span><div class="j-player"></div></div>';
                    break;

                //图片文件
                case "I":
                    classType += ' img';
                    content = '<a target="_blank" href="' + IBSS.DOWNLOAD_URL + '/previewfile?path=' + jc.Image + '">'
                    + '<img style="width:' + jc.ThumbW + 'px; height:' + jc.ThumbH + 'px" src="' + IBSS.DOWNLOAD_URL + '/downloadfile?path=' + jc.Thumbnail + '" alt="" />'
                    + '</a>';
                    break;

                //纷享大表情
                case "E":
                    classType += ' emotion';
                    content = '<img src="' + IBSS.COMMON_PATH + '/images/kf' + '/' + jc.PackId + '/fs_bee_' + jc.Index + '.gif" />';
                    break;

                //文档
                case "D":
                    classType += ' document';
                    content = '<span class="preview"></span><div class="dc"><p><span class="title">' + jc.Name + '</span><span class="size">' + util.getFileSize(jc.Size) + '</span></p><p class="opts"><a class="opt" target="_blank" href="' + IBSS.DOWNLOAD_URL + '/downloadfile?path=' + jc.File + '&name=' + jc.Name + '">下载</a></p></div>';
                    break;

                //通知
                case "News":
                    if (jc.AC == "inapp") {
                        jc.inAppName = util.getInAppName(jc.R);
                    }

                    classType = 'news human';
                    content = '<p class="tt">' + jc.Tt + '</p>'
                    + '<p class="time">' + util.formatDate(info.messageTime, 'YYYY-MM-dd') + '</p>'
                    + ( jc.CP == '' ? '' : '<p class="cp"><img src="' + IBSS.DOWNLOAD_URL + '/downloadfile?path=' + jc.CP + '" /></p>' )
                    + '<p class="s">' + jc.S + '</p>';
                    ac = ( jc.AC == 'webview' ? '<p class="more">图文详情</p>' : '<p class="more">跳转到:  ' + jc.inAppName + '</p>' );
                    break;

                case 'LWN':
                    content = '[链接到工作提醒]';
                    break;
                case 'LWI':
                    content = '[链接到工作项]';
                    break;
                case 'LWS':
                    content = '[链接到日程]';
                    break;
                case 'LWV':
                    content = '[链接到投票]';
                    break;
                case 'L':
                    classType += ' map';
                    content = '<a title="' + jc.Text + '" target="_blank" href="http://m.amap.com/navi/?dest=' + jc.Longitude + ',' + jc.Latitude + '&destName=' + jc.Text + '&key=47a6ca401e4e72bccc0691a9df65aef1"><img src="' + IBSS.COMMON_PATH + '/images/kf' + '/map.png" alt="" /><span>' + jc.Text + '</span></a>';
                    break;
            }
            sectionDom = '<section class="' + classType + '" data-id="' + info['messageId'] + '">'
            + '<p class="section-time">' + info['displayMessageTime'] + '</p>'
            + '<div class="section-avatar"><img src="' + avatar + '"/></div>'
            + '<div class="section-msg">'
            + '<div class="msg-name">' + info['serverName'] + '</div>'
            + '<div class="msg"><span class="ak"></span>' + content + '</div>'
            + ac
            + '<p class="msg-state"><span class="state-read">已读</span><span class="state-arrived">已送达</span></p>'
            + '</div>'
            + '</section>';

            return sectionDom;
        },

        // 显示dom元素
        // 触发轮询
        show: function () {
            this.$view.show();
            this.getMsg(true);
            return this;
        }
    };
});