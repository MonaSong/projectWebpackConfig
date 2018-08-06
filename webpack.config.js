const  {
    resolve,
    join,
} = require('path')

//const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const url = require('url');
const publicPath = '/dist/';
//const ExtractTextPlugin = require("extract-text-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader');
module.exports = (options = {}) => ({
    mode: process.env.NODE_ENV == 'development'? 'development' : 'production',
    entry: {
        vendor: './src/vendor.js',
        index: './src/js/index.js'
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
        chunkFilename: '[name].js?[chunkhash]',
        publicPath: options.dev ? '/dist/' : '/dist/'
    },
    optimization: {
        //runtimeChunk: 'single',
        runtimeChunk: {
          name: 'manifest'
        },
        splitChunks:{
          chunks: 'async', // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
          minSize: 30000, // 表示在压缩前的最小模块大小，默认为0；
          minChunks: 1, //表示被引用次数，默认为1；
          maxAsyncRequests: 5, // 最大的按需(异步)加载次数，默认为1;
          maxInitialRequests: 3, // 最大的初始化加载次数，默认为1；
          name: false,  // 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
          /** 
           * 如果想继续细分代码，可以使用缓存组(Cache Groups)。同样的，缓存组也有默认的配置；
           * 缓存组默认将node_modules中的模块拆分带一个叫做vendors的代码块中，将最少重复引用两次的模块放入default中。
          */ 
          cacheGroups: { // 缓存组。
            // default: {
            //     minChunks: 2,
            //     priority: -20,
            //     reuseExistingChunk: true,
            // },
            vendor: {
              name: 'vendor',
              chunks: 'initial',
              priority: -10, // 表示缓存的优先级；
              reuseExistingChunk: false, // 表示可以使用已经存在的块，即如果满足条件的块已经存在就使用已有的，不再创建一个新的块。
              test: /node_modules\/(.*)\.js/ // 缓存组的规则，表示符合条件的的放入当前缓存组，值可以是function、boolean、string、RegExp，默认为空；
            }
          }
        }
      },
    module: {
        rules: [{
            test: /\.vue$/,
            use: [{
                loader: 'vue-loader',
                options: {
                    transformToRequire: {
                        "audio": "src"
                    }
                }
            }]
        },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        root: resolve(__dirname, 'src'),
                        attrs: ['img:src', 'link:href']
                    }
                }]
            },
            {
                test: /\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "less-loader",
                ]
            },
            {
                test: /\.css$/,
                // use: options.dev ? ['style-loader', 'css-loader', 'postcss-loader'] : ExtractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: "css-loader"
                // })
                use: options.dev ? ['vue-style-loader', 'css-loader', 'postcss-loader'] : [MiniCssExtractPlugin.loader, 'css-loader?importLoaders=1', 'postcss-loader?importLoaders=1'] // style-loader 改为 vue-style-loader
               // use: [ 'style-loader', 'css-loader', 'postcss-loader']

            },
            {
                test: /favicon\.png$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash:7]'
                    }
                }]
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                exclude: /favicon\.png$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }]
            },
            {
                test: /\.(mp3|ogg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins:
        options.dev ?
            [
                // new webpack.optimize.CommonsChunkPlugin({
                //     names: ['vendor', 'manifest']
                // }), // TODO -
                new VueLoaderPlugin(),
                new HtmlWebpackPlugin({
                    filename: options.dev ? 'index.html' : '../index.html',
                    favicon: resolve('favicon.png'),
                    template: 'src/index.html'
                }),
            ]
            :
            [
                // new webpack.optimize.CommonsChunkPlugin({
                //     names: ['vendor', 'manifest']
                // }), //TODO -
                new VueLoaderPlugin(), // TODO +
                new HtmlWebpackPlugin({
                    filename: options.dev ? 'index.html' : '../index.html',
                    favicon: resolve('favicon.png'),
                    template: 'src/index.html'
                }),
                // new ExtractTextPlugin({
                //     filename: "main.css?[hash]",
                //     allChunks: true,
                // }),
                new MiniCssExtractPlugin({
                    // Options similar to the same options in webpackOptions.output
                    // both options are optional
                    filename: "[name].css",
                    chunkFilename: "[id].css"
                }) // TODO +
            ],
    resolve: {
        alias: {
            '~': resolve(__dirname, 'src'),
        }
    },
    externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'element-ui': 'ELEMENT',
    },
    devServer: {
        host: 'localhost',
        port: 8011,
        proxy: {
            '/api/': {
                target: 'http://localhost:8090',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        historyApiFallback: {
            index: url.parse(options.dev ? '/dist/' : publicPath).pathname
        }
    },
    devtool: options.dev ? '#eval-source-map' : '#source-map'
})