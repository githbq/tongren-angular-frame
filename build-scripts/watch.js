/**
 *  监听src目录下文件变化
 */

var gulp = require('gulp');
var config = require('./config');

gulp.task('watch', function() {
	//gulp.watch(config.path.src + '/**', ['devClear']);
    gulp.watch([config.path.src + '/**/*.js',config.path.src + '/**/*.less',config.path.src + '/**/*.html']).on('change', function(file) {
        global.writeFilePath = file.path;
        gulp.run('devClear');
    })
});
