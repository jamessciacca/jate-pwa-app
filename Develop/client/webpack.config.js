const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //adding plugins!
      //the html webpack plugin is a bundling tool that takes multiple sources and 
      //bundles them into a clean file! 
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),
      //inject manifest is a way to set up and "inject" a service worker into the application
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      }),
      //webpack manifest creates a manifest json to add support for various devices!
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E.',
        description: "This application installs 'Just Another Text Editor' or 'JATE' for short.",
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], 
            destination: path.join('assets', 'icons'),
          }
        ]
      })
    ],

    module: {
      rules: [
        //setting up loaders for css
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          //testing to see if babel is needed for device support
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            }}
        } 
      ],
    },
  };
};
