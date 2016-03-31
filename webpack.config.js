//import Node.js path module
var path = require('path');
//import Node.js webpack module
var webpack = require('webpack');

//Exports objects in the module as a whole
module.exports = {
  //choose a developer tool as eval, which means each module is executed with eval and //@sourceURL
  devtool: 'eval',
  //use an object as the entry point.
  entry: {
    app : [ //key of object
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './lib/index.js'],
  },
  //tell webpack how to write compiled files to disk by setting some properties.
  output: {
    //__dirname is the dir of this js file, which is ~/fiber, path join will concat
    // the path to ~/fiber/public/js/
    path: path.join(__dirname, './public/js/'),
    //the file name written to that path will be app.js, since we combine three entries
    // as an object named app, the name will not be overwritten
    filename: `app.js`,
    //when open in browser, this is the path for all output files.
    publicPath: '/js/'
  },
  //Add additional plugins to compiler
  plugins: [
    new webpack.HotModuleReplacementPlugin() //enable hot module replacement, this will create
    // two logs in console, HWR from webpack/hot/dev-server while WDS from webpack-dev-server client
  ],
  //include polyfills for node stuff
  node: {
    fs: "empty" //file system is empty
  },
  //setting some options related to resolve the modules
  resolve: {
    //calling require(react) from dir of ~/fiber/node_modules/react
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    //discover files with extensions of js and none
    extensions: ['', '.js']
  },
  //setting some options related to resolve loaders
  resolveLoader: {
    //the dir for webpack to seek modules not in root or modulesDirectories
    'fallback': path.join(__dirname, 'node_modules')
  },
  //settings of normal modules
  module: {
    //put automatically applied loaders in an array
    loaders: [
        //first loader
      {
        test: /\.js$/, //file must has extension with .js
        loaders: ['react-hot', 'babel'], //the loader
        exclude: /node_modules/, //the loader can't be under dir of ~/fiber/node_modules
        include: [path.join(__dirname,'./lib')] //the dir must be ~/fiber/lib
      },
        //second loader
      {
        test: /\.xml$/, //file must has extension with .xml
        loader: "raw" //the loader
      },
        //third loader
      {
        test: /\.json$/, //file must has extension with .json
        loaders: ['json-loader'] //the loader
      },
        //forth loader
      {
        test: /\.css?$/, //file must has extension with .css
        loaders: ['style', 'raw'], //the loader
        include: __dirname //the dir must be ~/fiber
      }]
  }
};

