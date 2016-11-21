var webpack = require('webpack');
var myArgs = process.argv.slice(2);
var isHot = myArgs.indexOf('--hot') !== -1;
console.log('is hot: ' + isHot);
var additionalPlugins = isHot ? [ 'react-hmre' ] : [];
var path = require("path");
const assert = require('assert');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
assert(process.env.ENV_SERVER_PORT, 'Error! ENV_SERVER_PORT is empty!');

assert(process.env.ENV_SERVER_HOST, 'Error! ENV_SERVER_HOST is empty!');

const port = isHot ? '8080' : process.env.ENV_SERVER_PORT;
const host = process.env.ENV_SERVER_HOST;
var productionPlugins = isHot ? [] : [
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
];

module.exports = [
  {
    name: 'client side, output to ./server/client',
    context: __dirname + '/src',
    entry: [ './js/shkola.js',
      'webpack/hot/dev-server'
    ],

    output: {
      filename: 'bundle.js',
      publicPath: `${host}:${port}/assets/`,
      path: __dirname + '/server/client',
    },
    plugins: productionPlugins.concat([
      new HandlebarsPlugin({
        entry: path.join(process.cwd(), "src", "index.hbs"),
        output: path.join(process.cwd(), "server", "client", "index.html"),
        data: { bundleHost: `${host}:${port}/assets/` },
      }),
      new ExtractTextPlugin('bundle.css'),
    ]),
    styleLoader:
      require('extract-text-webpack-plugin').extract('style-loader', 'css-loader!less-loader'),
    styles: {
      "mixins": true,
      "core": true,
      "icons": true,
      "larger": true,
      "path": true,
    },
    module: {
      loaders: [
        {
          loader: 'babel-loader',
          test: /\.jsx?$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, 'src/js/'),
          query: {
            'plugins': [ 'transform-runtime' ],
            'presets': [ 'es2015', 'stage-0', 'react' ].concat(additionalPlugins)
          },
        },
        {
          test: /\.(css|less$)$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff" },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          loader: 'url-loader?limit=8192',
        },
        { test: /\.hbs$/, loader: "handlebars" },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader"}
      ],
    },
  },
];
