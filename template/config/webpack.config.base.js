const webpack = require('webpack');
const path = require('path');
const HappyPack = require('happypack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // 以进度条的形式反馈打包进度
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清空文件夹
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const __ROOT = path.resolve(__dirname, '../'); // 根目录;

const happyThreadPool = HappyPack.ThreadPool({
    size: 5
});

module.exports = {
    entry: {
        index: './src/pages/index'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
        alias: {
            '@api': path.resolve(__dirname, 'src/api/'),
            '@components': path.resolve(__ROOT, 'src/components/'),
            '@constants': path.resolve(__ROOT, 'src/constants/'),
            '@pages': path.resolve(__ROOT, 'src/pages/'),
            '@utils': path.resolve(__ROOT, 'src/utils/')
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: path.join(__ROOT, 'src')
            },
            {
                test: /\.(ts|js)x?$/,
                use: 'happypack/loader?id=tsx',
                include: path.join(__ROOT, 'src'),
                exclude: /node_modules/
            },
            {
                oneOf: [
                    {
                        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                        loader: 'url-loader',
                        options: {
                            limit: 10000, // 小于10k，图片格式为base64
                            name: 'static/image/[name].[hash:8].[ext]'
                        }
                    },
                    {
                        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    },
                    {
                        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'static/font/[name].[hash:8].[ext]'
                        }
                    },
                    {
                        exclude: [/\.(ts|js)x?$/, /\.html$/, /\.json$/, /\.(css|scss|less)/],
                        loader: 'file-loader',
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: __ROOT, // 根目录
            verbose: true, // 开启在控制台输出信息
            dry: false // 启用删除文件
        }),
        new HappyPack({
            id: 'tsx',
            threadPool: happyThreadPool,
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            ],
            // 允许 HappyPack 输出日志
            verbose: true
        }),
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            template: path.resolve('public/index.html'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        // 该插件将把给定的 JS 或 CSS 文件添加到 webpack 配置的文件中，并将其放入资源列表 html webpack插件注入到生成的 html 中。
        /*  new AddAssetHtmlPlugin([
            {
                // 要添加到编译中的文件的绝对路径，以及生成的HTML文件。支持 globby 字符串
                filepath: require.resolve(path.join(__ROOT, 'dll/commonLib.dll.js'))
            }
        ]), */

        // 描述 vendor 动态链接库的文件内容
        /* new webpack.DllReferencePlugin({
            context: __ROOT,
            manifest: require(path.join(__ROOT, 'dll/commonLib.manifest.json'))
        }), */

        // 按需加载moment时区设置
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // 按需加载lodash
        new LodashModuleReplacementPlugin({
            paths: true
        }),
        // 打包进度条
        new ProgressBarPlugin()
    ]
};
