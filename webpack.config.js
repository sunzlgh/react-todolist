var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    entry: {
        index: path.resolve(APP_PATH, 'index.js')
        // vendors: ['jquery', 'moment']
    },
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    //启动dev source map，出错以后就会采用source-map的形式直接显示你出错代码的位置。
    devtool: 'eval-source-map',
    devServer: {
    	contentBase: "./",  // 本地服务器所加载的页面所在的目录
        historyApiFallback: true,  // 不跳转
        inline: true  // 实时刷新
    },
    module: {
        rules: [{
            test: /\.(js|jsx)?$/,
            loader: 'babel-loader',
            include: APP_PATH,
            query: {
                //添加两个presets 使用这两种presets处理js或者jsx文件
                presets: ['es2015', 'react']
            }
        }, 
        {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
             
        }
        // {
        //     test: /\.scss$/,
        //     use: ExtractTextPlugin.extract({
	    //       fallback: "style-loader",
	    //       use: ['css-loader', 'sass-loader']
	    //     })
        // }
        ]
    },
    plugins: [
        //使用uglifyJs压缩js代码
        new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        new HtmlwebpackPlugin({
            template: './index.html'   // 模版文件
        }),
        new webpack.HotModuleReplacementPlugin(), // 热加载插件
        // new ExtractTextPlugin('./styles/index.scss')  //分离css文件,注意该插件由于和webpack2不兼容，需要指定版本
        //把入口文件里面的数组打包成verdors.js
        // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ],
    //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    resolve: {
        extensions: ['.js', '.jsx']
    }
}
