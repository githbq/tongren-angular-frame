var argv = require('yargs').argv;
global.PRODUCT_ENV = argv.ENV == 'product';//
process.env.release = global.PRODUCT_ENV;
var config = require('./build.Config.js');
var webpack = require('webpack');
var WebpackMd5Hash = require('webpack-md5-hash');
var cleanWebpackPlugin = require('clean-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');
var copyWebpackPlugin = require('copy-webpack-plugin');

var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var entries = config.entries;
function HASH_LENGTH(hash) {
    return PRODUCT_ENV ? ('?[' + hash + ':9]') : '';
}
var plugins = [
    new ExtractTextPlugin('styles/[name].css' + HASH_LENGTH('contenthash')),
    new webpack.DefinePlugin({
        ENV_ISDEV: !PRODUCT_ENV ? 1 : 0,
        ENV_ISPRO: PRODUCT_ENV ? 1 : 0,
        ENVIRONMENT: PRODUCT_ENV ? '"product"' : '"develop"',
        abc: 123
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new cleanWebpackPlugin([global.PRODUCT_ENV ? config.names.dist : config.names.build], {
        root: config.dirs.root,
        verbose: true,
        dry: false
    }),
    new copyWebpackPlugin([
        { from: config.dirs.assets, to: config.names.assets }
    ]),
    new BrowserSyncPlugin(config.browsersync, { reload: config.browsersync.reload }),
];
//创建html页面
config.htmls.forEach(function (item) {
    plugins.push(new htmlWebpackPlugin(item));
});
//生产环境
if (PRODUCT_ENV) {
    plugins.unshift(new WebpackMd5Hash());
    plugins.unshift(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}
var routers = require('./build.router.js');
console.log('***************************entries********************************')
console.log(entries);
console.log('end***************************entries********************************')
routers.forEach(function (item, i) {
    entries[config.prefixes.views + item.name] = item.path;
});

var loaders = [
    { test: require.resolve('jquery'), loader: "expose?$!expose?jQuery" },
    { test: require.resolve('underscore'), loader: "expose?_" },
    { test: require.resolve('angular'), loader: "expose?angular" },
    {
        test: /app.js$/,
        loader: global.PRODUCT_ENV ? 'app-loader?md5=true!ng-annotate!babel-loader' : 'app-loader!babel-loader',
        exclude: /node_modules/
    },
    {
        test: /views.*\.js$/,
        loader: global.PRODUCT_ENV ? 'views-loader!ng-annotate!babel-loader' : 'views-loader!babel-loader',
        exclude: /node_modules/
    },
    {
        test: /\.js$/,
        loader: global.PRODUCT_ENV ? 'ng-annotate!babel-loader' : 'babel-loader',
        exclude: /node_modules/
    },
    {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css!autoprefixer')
    },
    {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css!autoprefixer!less')
    },
    {
        test: /\.(png|jpg|jpeg|gif|webp|svg)$/,
        loader: 'url-loader?name=/styles/images/[name].[hash:8].[ext]&limit=10'
    },
    {
        test: /\.(ttf|otf|woff|woff2|eot)$/,
        loader: 'url-loader?name=/fonts/[name].[hash:8].[ext]&limit=10'
    },
    {
        test: /\.html$/,
        loader: 'raw'
    }
];

module.exports = {
    target: 'web',
    cache: true,
    entry: entries,
    output: {
        path: PRODUCT_ENV ? config.dirs.dist : config.dirs.build,
        filename: config.names.js + '/[name].js' + HASH_LENGTH('chunkhash'),
        chunkFilename: 'scripts/[name].bundle.js' + HASH_LENGTH('chunkhash')
    },
    module: {
        loaders: loaders
    },
    resolveLoader: {
        alias: {
            "views-loader": config.paths.viewsLoader,
            "app-loader": config.paths.appLoader
        }
    },
    resolve: {
        alias: {
            "common": config.dirs.common,
            "assets": config.dirs.assets
        }
    },
    plugins: plugins,
    devServer: {
        contentBase: global.PRODUCT_ENV ? config.dirs.dist : config.dirs.build,
        outputPath: global.PRODUCT_ENV ? config.dirs.dist : config.dirs.build,
        inline: true,
        open: true,
        progress: true,
        colors: true,
        watchOptions: {
            // 默认监听时间，影响多久查看一次项目源码的变化，从而刷新浏览器页面
            poll: 500
        },
        // 默认监听端口
        port: 9010,
        // 代理设置
        proxy: require('./build.proxy.js')
    }
};

