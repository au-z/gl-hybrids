const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin")

const load = (test, ...loaders) => ({
  test, use: loaders, exclude: [/node_modules/],
})

module.exports = function(env, argv) {
  return {
    mode: env.prod ? 'production' : 'development',
    devtool: env.prod ? 'source-maps' : 'eval',

    entry: path.resolve(__dirname, '../src/main.js'),
    output: {
      path: path.resolve(__dirname, 'output'),
      publicPath: '/',
      filename: 'hybrids.js',
      library: 'Hybrids',
      libraryTarget: 'umd',
    },

    module: {
      rules: [
        load(/.(j|t)sx?$/, 'babel-loader'),
        load(/.styl(us)?$/, 'css-loader', 'stylus-loader'),
      ],
    },

    resolve: {
      extensions: ['.ts', '.js', '.json', '.styl'],
      alias: {
        'src': path.resolve(__dirname, '../src'),
        'style': path.resolve(__dirname, '../src/style'),
      },
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './template.html'),
        inject: 'head',
      }),
      new CopyWebpackPlugin([
        {from: path.resolve(__dirname, '../static'), to: 'static'},
      ], {logLevel: 'debug'}),
    ],

    devServer: {
      contentBase: path.resolve(__dirname, 'output'),
      compress: true,
      historyApiFallback: true,
      hot: true,
      noInfo: true,
      open: true,
      port: 11000,
      serveIndex: true,
    },

    // performance: {
    //   hints: 'warning',
    // },
  }
}
