const path = require('path');
const {HotModuleReplacementPlugin} = require('webpack');

module.exports = {
    mode: "development",
    entry:  ['webpack-hot-middleware/client'],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 8000,
        hot: true
    },
    devtool: 'source-map',
    plugins: [
        new HotModuleReplacementPlugin(),
    ]
};
