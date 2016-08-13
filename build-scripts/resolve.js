var path = require('path');
module.exports = {
  extensions: ['', '.coffee', '.js', '.jsx'],
  alias: {
    common: path.resolve(__dirname, '../', './src/common'),
    assets: path.resolve(__dirname, '../', './src/assets'),
    components: path.resolve(__dirname, '../', './src/components'),
    service: path.resolve(__dirname, '../', './src/service')
  }
};
