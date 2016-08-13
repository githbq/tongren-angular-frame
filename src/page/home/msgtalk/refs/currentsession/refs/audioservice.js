var Audio = require('audio-player');
var Recorder=require('common/plugins/recorder');
//声音播放服务
angular.module('app').factory('currentSessionAudio', function () {
    var audio_context;
    var recorder;
    var audioTimer;
    var callbacks;
    var audio = new Audio();
    var inited = false;
    return {
        initRecord: function (cb) {
            if (!inited) {
                inited = true;
                try {
                    // webkit shim
                    window.AudioContext = window.AudioContext || window.webkitAudioContext;
                    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
                    window.URL = window.URL || window.webkitURL;

                    audio_context = new AudioContext();
                    console.warn('音频环境准备OK.');
                    console.warn('检测结果:用户媒体设备 ' + (navigator.getUserMedia ? '可用.' : '不支持!'));
                } catch (e) {
                    alert('浏览器不支持音频!');
                }

                navigator.getUserMedia({audio: true}, startUserMedia, function (e) {
                    console.warn('没有音频输入设备 ' + e);
                });
            } else {
                cb && cb();
            }
            function startUserMedia(stream) {
                alert('startUserMedia')
                var input = audio_context.createMediaStreamSource(stream);
                console.warn('媒体流创建完毕.');
                recorder = new Recorder(input);
                console.warn('音频初始化完毕.');
                cb && cb();
            }
        },
        //开始录音
        startRecording: function () {
            this.initRecord(cb);
            function cb() {
                audioTimer && clearTimeout(audioTimer);
                var me = this;
                recorder && recorder.record();
                audioTimer = setTimeout(function () {
                    me.stopRecording();
                }, 60000);
            };
        },
        //导出录音
        exportRecord: function (cb) {
            recorder && recorder.exportWAV(function (blob) {
                var url = URL.createObjectURL(blob);
                cb && cb(url);
            });
        },
        //停止录音:
        stopRecording: function (cb) {
            recorder && recorder.stop();
            this.exportRecord(cb && cb);
            console.warn('停止录音.');
            recorder && recorder.clear();
        },
        playAudio: function (src) {
            audio.play(src);
        }
    };
});