const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FirendlyErrorePlugin = require('friendly-errors-webpack-plugin');

const __ROOT = path.resolve(__dirname, '../');
const __BUILD_COMMONLIB = path.join(__ROOT, 'dll');

module.exports = {
    mode: 'production',
    entry: {
        commonLib: ['react', 'react-dom', 'react-router-dom', 'react-loadable']
    },
    output: {
        // 指定生成文件所在目录
        // 由于每次打包生产环境时会清空 dist 文件夹，因此这里我将它们存放在了 build 文件夹下
        path: __BUILD_COMMONLIB,
        // 指定文件名
        filename: '[name].dll.js', // 这个名称需要与 DllPlugin 插件中的 name 属性值对应起来
        library: '[name]_dll_lib'
    },
    plugins: [
        new CleanWebpackPlugin(['dll'], {
            root: __ROOT
        }),
        // 接入 DllPlugin
        new webpack.DllPlugin({
            // 描述动态链接库的 manifest.json 文件输出时的文件名称
            // 由于每次打包生产环境时会清空 dist 文件夹，因此这里我将它们存放在了 build 文件夹下
            path: path.join(__BUILD_COMMONLIB, '[name].manifest.json')
        }),
        new FirendlyErrorePlugin()
    ],
    performance: {
        // false | "error" | "warning" // 不显示性能提示 | 以错误形式提示 | 以警告...
        hints: 'warning', // 开发环境设置较大防止警告
        // 根据入口起点的最大体积，控制webpack何时生成性能提示,整数类型,以字节为单位
        maxEntrypointSize: 5000000, // 最大单个资源体积，默认250000 (bytes)
        maxAssetSize: 3000000
    }
};
