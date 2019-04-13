const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: "production",
    entry:  [path.resolve(__dirname, './src/renderer/index.js')],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    plugins: ["react-hot-loader/babel", [
                        "@babel/plugin-transform-runtime",
                        {
                            "regenerator": true, //async/await
                        }
                    ], "@babel/plugin-syntax-dynamic-import"]
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/renderer/index.ejs')
        })
    ],
    output: {
        filename: 'renderer.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },
    target: "electron-renderer"
};
