var templateStr = require('./currentsession.html');
require('./currentsession.less');
require('./refs/currentsessionservice');
require('./refs/audioservice');

angular.module('app').directive('currentsession', function ($templateCache, currentSessionData, currentSessionAudio, $timeout) {
    return {
        replace: true,
        restrict: 'C',
        template: templateStr,
        controller: function ($scope, scrollHelper, toast) {
            var audioSrc;
            $scope.startRecording = function () {
                //currentSessionAudio.initRecord(
                //    {
                //        stopRecording: function (src) {
                //            audioSrc = src;
                //            alert('stopRecording');
                //        }
                //    }
                //);
                currentSessionAudio.startRecording();
            };
            $scope.stopRecording = function () {
                currentSessionAudio.stopRecording(function (src) {
                    audioSrc = src;
                });
            };
            $scope.playAudio = function (src) {
                debugger
                audioSrc && currentSessionAudio.playAudio(src || audioSrc);
            };

            $scope.pictures = $scope.pictures || [];
            $scope.cookies = currentSessionData.cookies;
            $scope.emotions = currentSessionData.emotions;
            $scope.talkList = [];
            $scope.send = function () {
                $scope.talkToolTipOpen = true;
                if ($scope.inputSay) {
                    $scope.talkList.push({name: '我说的', type: $scope.talkList.length % 2 == 0 ? 0 : 1, time: new Date().getTime(), content: $scope.inputSay});
                    var me = this;
                    setTimeout(function () {
                        scrollHelper.scrollToBottom($('.session-info'), $('.talk-list').outerHeight(), 0);
                    }, 10)
                }
            };
            //删除数组
            $scope.deleteArr = function (items, index) {
                items.splice(index, 1);
            };
            //$scope.angularToast = function () {
            //    toast.show('<input type="text" /><a>无可奈何革霜d塔顶地asd塔顶 无可奈何革霜d塔顶地asd塔顶 无可奈何革霜d塔顶地asd塔顶 无可奈何革霜d塔顶地asd塔顶 无可奈何革霜d塔顶地asd塔顶 无可奈何革霜d塔顶地asd塔顶 无可奈何革霜d塔顶地asd塔顶 无可奈何革霜d塔顶地asd塔顶 无可奈何革霜d塔顶地asd塔顶 无可奈何革霜d塔顶地asd塔顶 无可奈何革霜d塔顶地asd塔顶 无可奈何革霜d塔顶地asd塔顶 </a>');
            //};
            //上传图片  上传附件效果
            $scope.fileChange = function (elem, changeType) {
                debugger
                var $dom = $(elem);
                $timeout(function () {
                    switch (changeType.toString()) {
                        case '1':
                        {
                            ////////////////
                            //
                            // ie11下value = '' 会触发change事件
                            // 这里做个判断 如果 value = '' 直接返回
                            ///////////////
                            if ($dom.val() == '') return;
                            //进行类型和大小检测
                            //不符合条件的直接返回
                            var imgfile = $dom[0].files[0];
                            var type = imgfile.type.split('/')[1];

                            if (type != 'jpg' && type != 'jpeg' && type != 'png') {
                                toast.show('请选择类型为jpg或png的图片文件');
                                $dom.val('');
                                return false;
                            }
                            if (imgfile.size > 40960000) {
                                toast.show('请选择小于20MB的图片文件');
                                $dom.val('');
                                return false
                            }
                            $scope.imgfile = imgfile;
                            $scope.commonfile = null;
                            $scope.pastefile = null;
                            $scope.pictures.push({type: 'I', name: imgfile.name});
                            $dom.val('');
                        }
                            ;
                            break;
                        case '2':
                        {
                            //普通附件
                            ////////////////
                            //
                            // ie11下value = '' 会触发change事件
                            // 这里做个判断 如果 value = '' 直接返回
                            ///////////////
                            if ($dom.val() == '') return;
                            //进行类型和大小检测
                            //不符合条件的直接返回
                            var imgfile = $dom[0].files[0];
                            var type = imgfile.type.split('/')[1];
                            if (imgfile.size > 40960000) {
                                toast.show('请选择小于20MB的文件');
                                $dom.val('');
                                return false
                            }
                            $scope.imgfile = imgfile;
                            $scope.commonfile = null;
                            $scope.pastefile = null;
                            $scope.pictures.push({type: 'D', name: imgfile.name});
                            $dom.val('');
                        }
                            ;
                            break;
                    }


                    //$scope.optionDisabled = true;
                }, 10);
            }
        }
    };
});