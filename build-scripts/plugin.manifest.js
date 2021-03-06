'use strict';
var debug = require('debug')('build');
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; } ();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AssetManifest = function () {
    function AssetManifest(options) {
        _classCallCheck(this, AssetManifest);

        this.options = _extends({}, AssetManifest.defaults, options);
    }

    _createClass(AssetManifest, [{
        key: 'apply',
        value: function apply(compiler) {
            var _this = this;

            compiler.plugin('emit', function (compilation, callback) {
                var opts = _this.options;
                var conf = compilation.options;
                var base = conf.output.publicPath || '';
                var regx = new RegExp(opts.includes.join('-.*\.js$|') + '-.*\.js$');
                var manifest = {};

                compilation.chunks.forEach(function (chunk) {
                    if (!chunk.name) return;
                    chunk.files.forEach(function (file) {
                        debug('=== Manifest { Regex: ' + regx + ', File: ' + file + ' }');
                        if (!regx.test(file)) return;
                        var exts = file.split('.').slice(1).join('.');
                        manifest[chunk.name] = base + file;
                    });
                });

                var dest = opts.path || conf.output.path;
                var file = _path2.default.join(dest, opts.fileName);
                var data = JSON.stringify(manifest, null, opts.prettyPrint ? 2 : null);

                (0, _mkdirp2.default)(dest, function (err) {
                    if (err) throw err;
                    _fs2.default.writeFile(file, data, function (error) {
                        if (error) throw error;
                        callback();
                    });
                });
            });
        }
    }]);

    return AssetManifest;
} ();

AssetManifest.defaults = {
    path: undefined,
    fileName: 'manifest.json',
    includes: ['*'],
    prettyPrint: false
};
module.exports = AssetManifest;