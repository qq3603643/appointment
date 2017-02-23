const path    = require('path'),
      webpack = require('webpack');

module.exports = {
  cache: !0,
  entry: {
    'main': path.resolve(__dirname, 'apps/main.jsx')
  },
  output: {
    publicPath: '',
    filename: '[name].min.js?[hash]',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [
                  /node_modules/
                 ],
        loaders: ['es3ify-loader',"babel-loader?presets[]=es2015"],
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      },
      {
        test: /\.(jpg|png|jpeg|svg|gif)$/,
        loader: 'url-loader?limit=8172&name=[name].[ext]',
      },
    ]
  },
  postcss: function() {
    console.log('正在调用postcss编译css,耐心等待你是最棒的...');
    return [require('precss'),require('autoprefixer')];  //require('postcss-opacity'),
  },
  resolve: {
    extensions: ['','.js','jsx','.css','.sass','.png','.jpg','.jpeg'],
    alias: {
      'plugins': path.join(__dirname,'plugins'),
      'tools': path.join(__dirname,'plugins/tools'),
    }
  },
  plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.ProvidePlugin({
          '$':'jquery',
          'jQuery':'jquery',
          'window.jQuery':'jquery',
          '_': 'underscore',
          'uS': 'underscore'
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
  ],
  watch: !0
}