const webpack = require('webpack'),
      config = require('./webpackBase.config.babel.js'),
      path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),  //autoCreate Html
      CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"),  //separate js
      ExtractTextPlugin = require('extract-text-webpack-plugin');  //separate css

for(var key of Object.keys(config.entry)){
  config.output.path=path.resolve(__dirname,`build/`);

  console.log(`正在生成的项目是${key}...主人请耐心等待呃...`);
  config.plugins.push(
        new HtmlWebpackPlugin({
          filename:`index.html`,
          template:`apps/index.html`,
        })
  );
}

//css separate
config.module.loaders.push(
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader'),
      }
  );
config.plugins.push(
      new ExtractTextPlugin('[name].min.css?[hash]')
  );
config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({    //压缩
            compress: {
              warnings: false,
            }
        })
  );

module.exports = config;