var myArgs = process.argv.slice(2);
var isHot = myArgs.indexOf('--hot') !== -1;
console.log('is hot: ' + isHot);
var additionalPlugins = isHot ? ['react-hmre'] : [];
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname + '/src',
    entry: './js/shkola.js',

    output: {
        filename: 'bundle.js',
        path: __dirname + '/lib'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template : './index.html'
        })
    ],
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.jsx?$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src/js/'),
                query: {
                    'plugins': ['transform-runtime'],
                    'presets': ['es2015', 'stage-0', 'react'].concat(additionalPlugins)
                }
            }
        ],
    }
}