const path = require("path");
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.config.js')
const PurifyCSS = require('purifycss-webpack')
const webpack = require("webpack")
const WorkboxPlugin = require('workbox-webpack-plugin') // 引入 PWA 插件
module.exports = merge (commonConfig,{
    mode:'production',
    devtool: 'cheap-module-source-map',
    output: {
        // 输出目录
        path: path.resolve(__dirname, "../dist"),
        // 文件名称
        filename: 'static/js/[name].[chunkhash:8].js',
        chunkFilename: 'static/js/[name].[chunkhash:8].js'
    },
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
            cacheGroups: {
                // 公共代码打包分组配置
                jquery: {
                    name: 'jquery',
                    test: /[\\/]node_modules[\\/]jquery[\\/]/
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors'
                }
            }
        },
    },
    plugins:{
         // 清除无用 css---生产环境
         new PurifyCSS({
            paths: glob.sync([
                // 要做 CSS Tree Shaking 的路径文件
                path.resolve(__dirname, '..', 'src/*.html'),
                path.resolve(__dirname, '..', 'src/*.js'),
                path.resolve(__dirname, '..', 'src/**/*.jsx'),
            ])
        }),
        //PWA:第一次访问一个网站的时候，如果成功，做一个缓存，当服务器挂了之后，依然能够访问这个网页 只需生产环境配置
          new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        }),
     
    }
})