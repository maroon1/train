const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * @return {import('webpack').Configuration}
 */
function setConfig(env, argv) {
  const isDevelopment = argv.mode === 'development' || !argv.mode;
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : isDevelopment && 'development',
    devtool: isProduction
      ? 'source-map'
      : isDevelopment && 'cheap-module-source-map',
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {},
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: 'babel-loader',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
      }),
    ],
  };
}

module.exports = setConfig;
