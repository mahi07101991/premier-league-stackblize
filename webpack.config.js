const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/js/"
  },
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, // For Font Awesome
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/" // where the fonts will go
              //publicPath: '../'       // override the default path
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({ template: "./src/index.html" }),
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css"
    })
  ],
  devServer: {
    historyApiFallback: true,
    watchContentBase: true,
    contentBase: "./dist/",
    writeToDisk: true,
    hot: true,
    port: 3000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization"
    },
    proxy: {
      "/api": {
        target: {
          host: "0.0.0.0",
          protocol: "http:",
          port: 5000
        },
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
