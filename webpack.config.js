const path = require('path');

module.exports = {
  entry: {
    main: "./scripts/index.js",
    test: "mocha!./test/index.js"
  },

  module: {
  loaders: [
    { test: /\.js$/, exclude: '/node_modules/', loader: 'babel-loader' },
    { test: /\.css$/, loader: "style!css" },
    { test: /\.scss$/, loader: "style!css!sass" }
  ]
},

  output: {
    path: __dirname,
    filename: "[name].bundle.js"
  }
};
