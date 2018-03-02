const path = require('path');
const webpack = require('webpack');

const work = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: ['node_modules'],
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [new webpack.optimize.UglifyJsPlugin()],
};

const backend = {
  target: 'node',
  entry: [
    '@babel/polyfill', './src/app.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ruleThemAll-api.js',
    libraryTarget: 'commonjs2',
  },
  externals: [
    /^\.\/assets\.json$/,
    (context, request, callback) => {
      const isExternal = request.match(/^[@a-z][a-z/.\-0-9]*$/i) && !request.match(/\.(css|less|scss|sss)$/i);
      callback(null, Boolean(isExternal));
    },
  ],
  plugins: [new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
};

module.exports = backend;
