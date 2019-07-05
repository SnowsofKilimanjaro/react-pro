const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
module.exports = {
    //入口
    entry: ["./src/index.js"],
    //输出目录
    output:{
       path : path.resolve(__dirname,"../dist")
    },
    //对文件路径的优化
    resolve:{
        //指定extension之后可以不用在require或是import的时候加文件扩展名,会依次尝试添加扩展名进行匹配
        extensions: [".js", ".jsx"],
        //配置别名可以加快webpack查找模块的速度
        alias: {
            "@": path.resolve(__dirname, "../src"), // "@":path.join(_dirname,"src")
        }
    },
    module:{
        rules:[
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "happypack/loader?id=happyBabel"
                // use: [
                //     {
                //         loader: "babel-loader"
                //     }
                // ]
            },
            {
                test: /\.(sc|sa|c|le)ss$/,
                use: [
                    //一般开发环境使用style-loader
                   //"style-loader", 
                   //如果不做配置，我们的css是直接打包进js里面的，我们希望能单独生成css文件。 因为单独生成css,css可以和js并行下载，提高页面加载效率
                   MiniCssExtractPlugin.loader,
                    "css-loader", // 编译css
                    "postcss-loader", // 使用 postcss 为 css 加上浏览器前缀
                    "sass-loader", // 编译sass 支持sass，还需要安装node-sass
                    "less-loader" // compiles Less to CSS
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)/,
                // file-loader 解决css等文件中引入图片路径的问题
                // url-loader 当图片较小的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝
                use: {
                    loader: "url-loader",
                    options: {
                        outputPath: "static/images/", // 图片输出的路径
                        limit: 10 * 1024
                    }
                }
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].min.[ext]',
                            limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                            publicPath: 'static/fonts/',
                            outputPath: 'static/fonts/'
                        }
                    }
                ]
            }

        ]
    },
    plugins:[
        new CleanWebpackPlugin(), //每次打包时清除 dist 目录下旧版本文件
        new HtmlWebpackPlugin({
            filename: "index.html", // 最终创建的文件名
            template: path.resolve(__dirname, '..', "src/index.html"), // 指定模板路径
            hash:true,//防止缓存
            minify: {
                collapseWhitespace: true, // 去除空白
                removeAttributeQuotes:true //压缩 去掉引号
            }
        }),
        //暴露全局变量
        new webpack.ProvidePlugin({ 
            $: 'jquery', // cnpm
            jQuery: 'jQuery' // 本地Js文件
          }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
          }),
         // happypack
         new HappyPack({
            //用id来标识 happypack处理那里类文件
            id: 'happyBabel',
            //如何处理  用法和loader 的配置一样
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true',
            }],
            //共享进程池threadPool: HappyThreadPool 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,
        }),
    ]
}