const  {
    resolve,
    join,
} = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = '/dist/'
const ExtractTextPlugin = require("extract-text-webpack-plugin")
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
        runtimeChunk: {
          name: 'manifest'
        },
        splitChunks:{
          chunks: 'async',
          minSize: 30000,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          name: false,
          cacheGroups: {
            vendor: {
              name: 'vendor',
              chunks: 'initial',
              priority: -10,
              reuseExistingChunk: false,
              test: /node_modules\/(.*)\.js/
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
                        name: '[name].[ext]?[hash]'
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