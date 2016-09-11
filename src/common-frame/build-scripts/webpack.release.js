var config = require( './build.config.js' );

var cleanWebpackPlugin = require( 'clean-webpack-plugin' ),
    manifestWebpackPlugin = require( './manifest' ),
    webpack = require( 'webpack' );

var loaders = [
    {
        test: /\.js$/,
        loader: 'ng-annotate!babel',
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
    new cleanWebpackPlugin( [ 'dist' ], {
        root: config.dirs.root,
        verbose: true,
        dry: false
    } ),
    new webpack.optimize.UglifyJsPlugin( {
        compress: {
            warnings: false,
            properties: true,
            sequences: true,
            dead_code: true,
            conditionals: true,
            comparisons: true,
            evaluate: true,
            booleans: true,
            unused: true,
            loops: true,
            hoist_funs: true,
            cascade: true,
            if_return: true,
            join_vars: true,
            drop_console: true,
            drop_debugger: true,
            unsafe: true,
            hoist_vars: true,
            negate_iife: true,
            side_effects: true
        }
    } ),
    new manifestWebpackPlugin( {
        fileName: 'manifest.json'
    } )
];

var config = {
    entry: config.paths.frameJs,
    output: {
        path: config.dirs.dist,
        filename: 'frame-[chunkhash].js'
    },
    module: {
        loaders: loaders
    },
    plugins: plugins
};

module.exports = config;