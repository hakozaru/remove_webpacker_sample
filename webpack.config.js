const path = require('path')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    application: path.resolve(__dirname, "./app/javascript/packs/application.js"),
  },
  output: {
    filename: "js/[name]-[contenthash].js",
    chunkFilename: "js/[name]-[contenthash].chunk.js",
    hotUpdateChunkFilename: "js/[id]-[hash].hot-update.js",
    path: path.resolve(__dirname, "./public/packs"),
    publicPath: "/packs/",
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
  ]
}