var config = require('./build.config.js'),
    path = require('path'),
    fs = require('fs');
var debug = require('debug')('build');
function ReplacementPlugin(options) {

}

ReplacementPlugin.prototype.apply = function (compiler) {
    compiler.plugin('after-emit', function (complilation) {
        debug('=== Replacement Starting...');
        var appJsPath;
        var sources = [], manifest = {};
        complilation.chunks.forEach(function (chunk) {
            if (!chunk.name) {
                return;
            }
            if (chunk.name == 'app') {
                appJsPath = path.join(config.dirs.dist, chunk.files[0]);
            }
            if (!chunk.name.startsWith('views\.')) {
                return;
            }
            chunk.files.forEach(function (file) {
                if (!(/\.js$/.test(file))) {
                    debug('not javascript');
                }
                sources.push(chunk.name + '.js');
                manifest[chunk.name + '.js'] = path.win32.basename(file);
            });
        });
        if (appJsPath) {
            debug(manifest);
            var content = fs.readFileSync(appJsPath, 'utf-8');
            sources.forEach(function (source) {
                var regex = new RegExp(source, 'g');
                content = content.replace(regex, manifest[source]);
            });
            fs.writeFileSync(appJsPath, content);
        }
        debug('=== Replacement Finished...');
    });
};

module.exports = ReplacementPlugin;