const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: {
    'index': [
      path.resolve(__dirname, 'src/javascripts/index.js')
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
          // {
          //     from: './src/semantic-ui/dist',
          //     to: 'semantic-ui'
          // },
          // {
          //     from: './src/flat-ui',
          //     to: 'flat-ui'
          // },
          {
              from: './node_modules/jquery/dist/jquery.min.js',
              to: 'jquery.min.js'
          },
          {
              from: './src/javascripts/stuff.js',
              to: 'stuff.js'
          },
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
    port: 3000,
    inline: true
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
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

};
