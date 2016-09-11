var path = require( 'path' );

var root = path.join( __dirname, ".." ),
    dirs = {
        root: root,
        src: path.join( root, 'src' ),
        build: path.join( root, 'build' ),
        dist: path.join( root, 'dist' )
    },
    paths = {
        frameJs: path.join( dirs.src, 'frame.js' )
    };

module.exports = {
    dirs: dirs,
    paths: paths
};