const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

/**
 * @return {import('webpack').Configuration}
 */
function setConfig(env, argv) {
  const isDevelopment = argv.mode === "development" || !argv.mode;
  const isProduction = argv.mode === "production";

  return {
    target: "web",
    mode: isProduction ? "production" : isDevelopment && "development",
    devtool: isProduction
      ? "source-map"
      : isDevelopment && "cheap-module-source-map",
    entry: {
      main: "./src/index.js",
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
    },
    devServer: {
      hot: true,
      client: {
        overlay: false,
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: [isDevelopment && require("react-refresh/babel")].filter(
                Boolean,
              ),
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[path][name]__[local]",
                },
              },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\.s[a,c]ss$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[path][name]__[local]",
                },
              },
            },
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ["file-loader"],
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
          loader: "url-loader",
          options: {
            limit: 10000,
          },
        },
      ],
    },
    plugins: [
      isDevelopment && new ReactRefreshWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: "./index.html",
        template: "public/index.html",
      }),
      new ESLintWebpackPlugin(),
    ].filter(Boolean),
    resolve: {
      extensions: [".js", ".jsx"],
      alias: {
        "@": path.resolve("src/app"),
      },
    },
  };
}

module.exports = setConfig;
