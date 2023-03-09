const path = require('path');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
    entry: {
      main: './src/index.js',
    },
    output: {
      filename: '[name].[contenthash:8].js',
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
            name: 'vendor',
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
            name: 'main',
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.s[a,c]ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader'],
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: './index.html',
        template: 'public/index.html',
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
          minifyURLs: true,
        },
      }),
      new ESLintWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
        chunkFilename: '[name].[contenthash:8].chunk.css',
      }),
      new BundleAnalyzerPlugin(),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.resolve('src/app'),
      },
    },
  };
}

module.exports = setConfig;
