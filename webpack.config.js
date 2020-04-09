const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: ['./source/scripts/main.js'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
      // {
      //   test: /\.(woff(2)?|ttf|eot|svg|vvt)(\?v=\d+\.\d+\.\d+)?$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: 'fonts/'
      //       }
      //     }
      //   ]
      // }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../styles/[name].css',
      chunkFilename: '[id].css'
    }),
    new CopyPlugin([{ from: './content/assets', to: './public/assets' }])
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    chunkFilename: '[name].js',
    publicPath: '/scripts/',
    filename: 'index.js'
  },
  devServer: {
    contentBase: './public',
    port: 3000,
    hot: true
  },
  stats: 'minimal'
}
