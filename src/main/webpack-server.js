const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackMerge = require('webpack-merge');

const app = express();
const configDev = require('../../webpack.config.dev.js');
const configProd = require('../../webpack.config.prod.js');
const config = webpackMerge(configProd, configDev);
const compiler = webpack(config);
const port = config.devServer.port;
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!\n`);
});
