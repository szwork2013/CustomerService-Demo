var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'dist');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

var config = {
    entry: {
        IdentityBindContainer: path.join(__dirname, './src/containers/IdentityBindContainer.jsx'),
        HeatingContainer: path.join(__dirname, './src/containers/HeatingContainer.jsx'),
        OrderContainer: path.join(__dirname, './src/containers/OrderContainer.jsx'),
    },
    output: {
        path: buildPath,
        filename: '[name].js' // Template based on keys in entry above
    },
    resolve: {
        //When require, do not have to add these extensions to file's name
        extensions: ["", ".js", ".jsx", ".css"]
            //node_modules: ["web_modules", "node_modules"]  (Default Settings)
    },
    //Render source-map file for final build
    devtool: 'eval',

    plugins: [
        //Minify the bundle
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                //supresses warnings, usually from module minification
                warnings: false
            }
        }),
        //Allows error warnings but does not stop compiling. Will remove when eslint is added
        new webpack.NoErrorsPlugin(),
    ],
    module: {
        preLoaders: [{
            test: /\.(js|jsx)$/,
            loader: 'eslint-loader',
            include: [path.resolve(__dirname, "src/app")],
            exclude: [nodeModulesPath]
        } ],
        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['react', 'es2015'],
                plugins: ["transform-object-assign"]
            }
        }, {
            test: /\.(js|jsx)$/, //All .js and .jsx files
            loader: 'babel?presets[]=react,presets[]=es2015', //react-hot is like browser sync and babel loads jsx and es6-7
            exclude: [nodeModulesPath]
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        } ]
    },
    //Eslint config
    eslint: {
        configFile: '.eslintrc' //Rules for eslint
    },
};

module.exports = config;
