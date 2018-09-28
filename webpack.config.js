const path = require('path');

var libName = "pagedList";
var fileName = libName + ".js";

module.exports = {
    entry: './python/__target__/' + fileName,
    output: {
        path: path.resolve(__dirname, 'python', '__target__', 'bundle'),
        filename: fileName,
        library: libName,
        libraryTarget: "assign",
      },
    mode: 'production',
    devtool: 'source-map',
    optimization: {
      minimize: false
    },
  };