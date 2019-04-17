const webpack = require('webpack');
const path = require('path');
const HappyPack = require('happypack');

const happyThreadPool = HappyPack.ThreadPool({
  size: 5,
});

module.exports = {
  entry: {
    index: './src/pages/index',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [{
      test: /\.(ts|js)x?$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: ['/src/'],
    }, {
      test: /\.(ts|js)x?$/,
      use: 'happypack/loader?id=tsx',
      exclude: /node_modules/,
    },
    {
      oneOf: [{
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // 小于10k，图片格式为base64
          name: 'static/image/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/font/[name].[hash:8].[ext]',
        },
      },
      {
        exclude: [/\.(ts|js)x?$/, /\.html$/, /\.json$/, /\.(css|scss|less)/],
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      ],
    },
    ],
  },
  plugins: [
    new HappyPack({
      id: 'tsx',
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory'],
    }),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};
