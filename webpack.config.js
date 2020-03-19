const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  context: __dirname,
  entry: {
    styles: ['./src/sass/main.scss']
  },
  output: {
    filename: './build.css'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      loader: isProduction
        ? 'css-loader!sass-loader'
        : 'css-loader?sourceMap!sass-loader?sourceMap=true'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      filename: './index.html'
    })
  ]
}