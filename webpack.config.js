/* eslint-disable no-undef, @typescript-eslint/no-var-requires */
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const watchChanges = process.argv.slice(2).includes("--watch");
const isDevelopment = watchChanges || process.env.NODE_ENV === "development";
const distRoot = "dist_webpack";

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, distRoot),
    chunkFilename: "[id].chunk.js",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, distRoot)
    },
    compress: true,
    client: {
      overlay: false,
    },
    port: 7000,
    host: "0.0.0.0",
    allowedHosts: "all",
  },
  devtool: isDevelopment ? "eval-source-map" : "source-map",
  mode: isDevelopment ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: "tsconfig.json",
        }
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {from: "src/index.html", to: `index.html`},
        {from: "src/index.css", to: `index.css`},
        {from: "src/sanitize.css", to: `sanitize.css`},
        {from: "src/assets", to: `assets`},
        {from: "src/img", to: `img`},
        {from: "src/lib", to: `lib`},
      ],
    }),
  ],
  externals: {
    "three": "THREE",
  },
};
