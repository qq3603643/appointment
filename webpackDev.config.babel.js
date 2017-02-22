const webpack = require("webpack"),
      path = require("path"),
      config = require("./webpackBase.config.babel.js"),
      entry = config.entry;

var nameFile, pathFile, Config;

for(var k in entry)
{
    if(entry.hasOwnProperty(k))
    {
        nameFile = k;
        pathFile = typeof(entry[k]) == 'object' ? entry[k][entry[k].length - 1] : entry[k];
    }
}
console.log(nameFile, pathFile);
Config = {
    output: { path: path.resolve(__dirname, './build/'), filename: 'buildBundle.js' },
    module: {
        loaders: config.module.loaders.concat(
                        {
                            test: /\.css$/,
                            loader: 'style-loader!css-loader!postcss-loader'
                        }
                    )
    },
    postcss: config.postcss,
      //简便设置
    resolve: config.resolve,
    plugins: config.plugins.concat(
                new webpack.DefinePlugin({
                  "process.env": {
                     NODE_ENV: JSON.stringify("production")
                   }
                })
            ),
    watch: !0,
    cache: !0,
    debug: !0
}

Config.entry = {};
Config.entry[nameFile] = pathFile;
module.exports = Config;