const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  context: __dirname,
  entry: {
    styles: ['./src/sass/main.scss']
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      filename: './index.html'
    }),
    {
      apply(compiler) {
        compiler.hooks.shouldEmit.tap('Remove styles from output', (compilation) => {
          delete compilation.assets['styles.js'];  // Remove asset. Name of file depends of your entries and 
          return true;
        })
      }
    }
  ]
}