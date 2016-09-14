var myArgs = process.argv.slice(2);
var isHot = myArgs.indexOf('--hot') !== -1;
console.log('is hot: ' + isHot);
var additionalPlugins = isHot ? [ 'react-hmre' ] : [];
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
  {
    name: 'client side, output to ./server/client',
    context: __dirname + '/src',
    entry: [ './js/shkola.js',
      'webpack/hot/dev-server'
    ],

    output: {
      filename: 'bundle.js',
      path: __dirname + '/server/client'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.hbs'
      }),
      //new HandlebarsPlugin({
      //  entry: path.join(process.cwd(), "src", "index.hbs"),
      //  output: path.join(process.cwd(), "server", "client", "index.html"),
      //  data: { bundleHost: 'http://localhost:8080/'}
      //})
      //new CopyWebpackPlugin([
      //  { from: './src/js/bootstrap.js', to: './server/client/bootstrap.js' }
      //])
    ],
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
          test: /\.less$/,
          loader: "style!css!less"
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff"
        },
        {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}
      ]
    }
  }
];