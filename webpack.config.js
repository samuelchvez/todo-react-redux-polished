var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSass = new ExtractTextPlugin('bundle.css?version=[hash]');

module.exports = {
  context: path.join(__dirname, "src"),
  entry: ['whatwg-fetch', './scripts/index.js', './index.html'],
  devServer: {
    historyApiFallback: true
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: [
            'react',
            'es2015',
            'stage-0'],
          plugins: [
            'react-html-attrs',
            'transform-class-properties',
            'transform-decorators-legacy',
            'transform-object-rest-spread'],
        }
      },
      {
        test: /\.scss$/i,
        loader: extractSass.extract(['css', 'sass'])
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.less$/,
        loader: extractSass.extract(['css', 'less'])
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      }
    ]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "client.js?version=[hash].js",
    publicPath : '/'
  },
  devtool: debug ? 'source-map': '',
  plugins: debug ? [
    extractSass,
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ] : [
    extractSass,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
};
