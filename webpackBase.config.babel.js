const path    = require('path'),
      webpack = require('webpack');

module.exports = {
  cache: !0,
  //入口
  entry: {
    'main': path.resolve(__dirname, 'apps/main.js')
  },
  //出口
  output: {
    publicPath: '',
    filename: '[name].min.js?[hash]',
  },
  //加载器
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        //以下文件不参与js编译
        exclude: [
                  /node_modules/,
                  path.resolve(__dirname,'plugins/jquery'),
                  path.resolve(__dirname,'plugins/tools'),
                  path.resolve(__dirname,'plugins/mobile/zepto.min.js'),
                ],
        loaders: ['es3ify-loader',"babel-loader?presets[]=es2015"],
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      },
      {
        test: /\.(jpg|png|jpeg|svg|gif)$/,
        //小于8172b的将压缩成base64格式大于则保存至output下的path下的制定目录
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
  //插件
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