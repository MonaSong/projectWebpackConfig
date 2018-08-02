
## 迁移
* 在命令行界面运行打包指令需要安装 webpack-cli

* 打包需要指定打包模式 production or development ，在不同模式下会添加不同的默认配置， webpack.DefinePlugin 插件的 process.env.NODE_ENV 的值不需要再定义，将根据模式自动添加；

* 不再需要在 plugin 中设置 new webpack.optimize.UglifyJsPlugin ，只需要在配置中设置开关即可，并且 production 模式自动开启，可以通过 optimization.minimizer 指定其他压缩库；

* 删除了 CommonsChunkPlugin ，功能已迁移至 optimization.splitChunks ， optimization.runtimeChunk。

* 安装最新的 webpack 、 webpack-cli 、 webpack-dev-server ；

* 为开发中和发布分别配置 mode ，删除 webpack.DefinePlugin 配置，并且去掉 package.json 中启动脚本的 NODE_ENV 区别环境变量定义；

* 去掉 new webpack.optimize.UglifyJsPlugin 、 ModuleConcatenationPlugin 配置。

## 具体
* extract-text-webpack-plugin 有两种选择一种是安装@next，一种是使用 mini-css-extract-plugin 替代

> 如果使用方法二注意在发布打包时需要指定 css 压缩库配置，并且需要同时写入 js 压缩库，因为你一旦指定了 optimization.minimizer 就会弃用内置的代码压缩：

* 开发环境style-loader需要改为 vue-style-loader,生产环境的loader需要加上importLoaders=1的参数

* 在webpack升级的同时，对应的许多依赖也需要相应的进行升级，对于其他工程，注意看控制台的报错，是哪个插件报的错就去升级那个插件，如果存在找不到模块之类的错误就去升级对应的loader。
