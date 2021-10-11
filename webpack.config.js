const path = require('path')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')

const { NODE_ENV } = process.env
const isProd = NODE_ENV === "production"

module.exports = {
  mode: isProd ? "production" : "development",
  entry: {
    application: path.resolve(__dirname, "./app/javascript/packs/application.js"),
  },
  output: {
    filename: "js/[name]-[contenthash].js",
    chunkFilename: "js/[name]-[contenthash].chunk.js",
    hotUpdateChunkFilename: "js/[id]-[hash].hot-update.js",
    path: path.resolve(__dirname, "./public/packs"),
    publicPath: isProd ? "/packs/" : "//localhost:8080/packs/",
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx'],
    modules: [
      path.resolve(__dirname, "./app/javascript"),
      "node_modules"
    ]
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "ts-loader"
          },
        ],
      },
      {
        test: /\.(png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './images/[name].[ext]'
            }
          }
        ],
        type: 'javascript/auto',
        dependency: { not: ['url'] }
      },
      {
        test: /\.(svg)$/,
        use: [
          '@svgr/webpack',
          'url-loader'
        ]
      },
      {
        test: /\.scss/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: !isProd
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: !isProd
            }
          },
        ],
      },
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new WebpackAssetsManifest({
      entrypoints: true,
      writeToDisk: true,
      output: "manifest.json",
      publicPath: true
    }),
  ],
  devServer: {
    host: "localhost",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    devMiddleware: {
      publicPath: "/packs/",
    },
    static: {
      directory: path.resolve(__dirname, "public/packs"),
    }
  },
}
