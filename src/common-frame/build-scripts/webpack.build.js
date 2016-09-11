var config = require( './build.config.js' );

var cleanWebpackPlugin = require( 'clean-webpack-plugin' );

var loaders = [
    {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
    },
    {
        test: /\.css$/,
        loader: 'style!css',
    },
    {
        test: /\.less$/,
        loader: 'style!css!less',
    },
    {
        test: /\.(png|jpg|jpeg|gif|webp|svg)$/,
        loader: 'url-loader?name=images/[name].[hash:8].[ext]&limit=204800'
    },
    {
        test: /\.(ttf|otf|woff|woff2|eot)$/,
        loader: 'url-loader?name=fonts/[name].[hash:8].[ext]&limit=204800'
    },
    {
        test: /\.html$/,
        loader: 'raw'
    }
];

var plugins = [
    new cleanWebpackPlugin( [ 'build' ], {
        root: config.dirs.root,
        verbose: true,
        dry: false,
        exclude: [ '*.html', '*.json' ]
    } )
];

var config = {
    entry: config.paths.frameJs,
    output: {
        path: config.dirs.build,
        filename: 'frame.js'
    },
    module: {
        loaders: loaders
    },
    plugins: plugins
};

module.exports = config;