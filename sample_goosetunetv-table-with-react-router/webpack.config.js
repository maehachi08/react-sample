const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: {
    'index': [
      path.resolve(__dirname, 'src/javascripts/index.js'),
      path.resolve(__dirname, 'src/stylesheets/index.css')
    ]
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },

  plugins: [
    //////
    // copy-webpack-plugin
    // https://github.com/webpack-contrib/copy-webpack-plugin
    //////
    // new CopyWebpackPlugin([{
    //   from: '/path/to/src',
    //   to: '/path/to/dest'
    // }]),
    new CopyWebpackPlugin(
      [
          {
              from: './node_modules/semantic-ui-react',
              to: './semantic-ui-react'
          },
          {
              from: './node_modules/semantic-ui-css',
              to: './semantic-ui-css'
          },
          {
              from: './node_modules/jquery/dist/jquery.min.js',
              to: 'jquery.min.js'
          }
      ]
    ),

    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 8000,
    inline: true,

    // https://webpack.js.org/configuration/dev-server/#devserver-historyapifallback
    // react-router v4使用時にreloadで404エラーにならないようにする
    // ブラウザのリクエストは通常のHTMLファイルとして受け取りますが、 APIリクエストはバックエンドサーバーにproxyされます。
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 2
            },
          },
          {
            loader: 'sass-loader',
          }
        ],
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(jpg|png)$/,
        loaders: 'url-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },

      // for semantic-ui
      {
        test: /\.(woff|woff2|ttf|svg|eot)$/,
        loader: 'url-loader?name=/fonts/[name].[ext]'
      },
    ]
  },

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },

};
