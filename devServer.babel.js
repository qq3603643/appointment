const config = require('./webpackDev.config.babel.js'),
  	  webpack = require('webpack'),
  	  path = require('path'),
  	  WebpackDevServer = require('webpack-dev-server');

//插件的定义
const OpenBrowserPlugin = require('open-browser-webpack-plugin'),  //打开窗口
      HtmlWebpackPlugin = require('html-webpack-plugin');  //html打包

//
const NET_PORT = '9999';
var   SERVER_CFG;

//动态生成html&&生成项目路径&&自动打开窗口的地址
for(var key of Object.keys(config.entry)){

  var value = config.entry[key];

  if(typeof(value) == 'object')
  	config.entry[key].unshift(`webpack/hot/dev-server`, `webpack-dev-server/client?http://localhost:${NET_PORT}/`);
  else
  	config.entry[key] = [`webpack/hot/dev-server`, `webpack-dev-server/client?http://localhost:${NET_PORT}/`, value];

  console.log(`正在生成的项目是${key}...主人请耐心等待呃...`);
  config.plugins.push(
        new HtmlWebpackPlugin({
          filename:`index.html`,   //dev默认打包完成的文件在根目录下(测试不受path publicPath影响 受filename影响) 所以html需放在根目录下
          template:`apps/index.html`,
        })
  );
  SERVER_CFG = {
  	noInfo: true,
   	publicPath: '',
    contentBase: `./apps/`,
    headers: { "X-Custom-Header": "yes" },
    hot: !0,
    // historyApiFallback: !0,
    stats: {
        colors: true
    }
  };
  //打开窗口的动态路径
  config.plugins.push(
      new OpenBrowserPlugin
      (
          {
            url: `http://localhost:${NET_PORT}`   //urlSetting: the same with htmlSeparete
          }
      )
    );
  config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development')
        }
      })
    );
}

const compiler = webpack(config);
var server = new WebpackDevServer(compiler, SERVER_CFG);
server.listen(NET_PORT);


/**
  summary: dev时确保打包完成后的js/html 在同一目录下即可(啊啊啊啊，多么痛的领悟！！！！)
*/