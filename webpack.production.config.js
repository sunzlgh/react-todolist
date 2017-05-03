let path = require('path');
let webpack = require('webpack');
let HtmlwebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    entry: {
        index: path.resolve(APP_PATH, 'index.js')
    },
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/, //需要排除的目录
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                'es2015',
                                {
                                    "modules": false
                                }
                            ],
                            'react'
                        ]
                    }
                }]
            },
            {
                test: /\.(sass|scss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'img/[name].[ext]'
                    }
                }]
            } 
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV: JSON.stringify("production") 
            }
        }),
        //使用uglifyJs压缩js代码
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            comments: false, //去掉注释
            compress: {
                warnings: false //忽略警告,要不然会有一大堆的黄色字体出现
            }
        }),
        new HtmlwebpackPlugin({
            template: './index.html', // 模版文件
            // favicon: path.resolve(APP_PATH, './styles/img/favicon.ico')
        }),
        new ExtractTextPlugin('styles.css'), //分离css文件,注意该插件由于和webpack2不兼容，需要指定版本
    ],
    //自动扩展文件后缀名，意味着require模块可以省略不写后缀名
    resolve: {
        extensions: ['.js', '.jsx']
    }
}