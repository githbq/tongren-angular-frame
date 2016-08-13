var gulp = require('gulp');
var wrench = require('wrench');

wrench.readdirSyncRecursive('./build-scripts').filter(function (file) {
    return (/\.(js|coffee)$/i).test(file) && !(/\.\w+\.js/).test(file);
}).map(function (file) {
    require('./build-scripts/' + file);
});

gulp.task('dev', ['server', 'devClear'], function() {
    gulp.run('watch');
});
gulp.task('build', ['clean', 'clear']);

gulp.task('default', function() {
	gulp.run('dev');
});

gulp.task('test', ['clean', 'devClear']);