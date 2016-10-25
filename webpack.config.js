var webpack = require('webpack');
var myArgs = process.argv.slice(2);
var isHot = myArgs.indexOf('--hot') !== -1;
console.log('is hot: ' + isHot);
var additionalPlugins = isHot ? [ 'react-hmre' ] : [];
var path = require("path");
var HandlebarsPlugin = require('handlebars-webpack-plugin');

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
      publicPath: 'http://localhost:8080/assets/',
      path: __dirname + '/server/client'
    },
    plugins: productionPlugins.concat([
      new HandlebarsPlugin({
        entry: path.join(process.cwd(), "src", "index.hbs"),
        output: path.join(process.cwd(), "server", "client", "index.html"),
        data: { bundleHost: isHot ? 'http://localhost:8080/assets/' : ''},
      }),
    ]),
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
          }
        },
        {
          test: /\.(less|css$)$/,
          loader: "style!css!less-loader"
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff"
        },
        {
          test: /\.(png|jpg|jpeg|gif|woff)$/,
          loader: 'url-loader?limit=8192'
        },
        { test: /\.hbs$/, loader: "handlebars" },
        {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}
      ],
    }
  }
];