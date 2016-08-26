
var webpack = require('webpack');
var MemoryFS = require("memory-fs");

// create memory store for compiled files
var mfs = new MemoryFS();

module.exports = function compile(filename, cb) {
    // base webpack configuration
    var webpackCfg = {
      entry: './' + filename + '.jsx',
      output: {
          path: '/',
        filename: filename + '.js',
      },
      module: {
        loaders: [{
          test: /\.jsx$/,
          exclude:/node_modules/,
          loader: 'babel-loader',
          query: {
              presets: ['es2015', 'react']
            }
        }],
      },
    };
    var compiler = webpack(webpackCfg);

    // set webpack to compile to memory
    compiler.outputFileSystem = mfs;

    //run the compiler
    compiler.run(function(err, stats) {
        if(err)
            return cb(err);
        // read compiled file (from memory)
        var fileContent = mfs.readFileSync('/' + filename + '.js');
        // return compiled code to callback
        cb(null, fileContent.toString());
    });
};
