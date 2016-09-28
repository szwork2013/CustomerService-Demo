var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'js');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

var config = {
    //Entry point to the project
    entry: {
        IdentityBindContainer: path.join(__dirname, './src/containers/IdentityBindContainer.jsx'),
        HeatingContainer: path.join(__dirname, './src/containers/HeatingContainer.jsx'),
        OrderContainer: path.join(__dirname, './src/containers/OrderContainer.jsx'),
        RepairContainer: path.join(__dirname, './src/containers/RepairContainer.jsx'),
        RepairListContainer: path.join(__dirname, './src/containers/RepairListContainer.jsx')
    },
    output: {
        path: buildPath,
        filename: '[name].js'
    },

    resolve: {

        extensions: ["", ".js", ".jsx", ".css"],
    },

    devtool: 'eval',

    plugins: [

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    externals: {
        'fs': 'js',
        'react': 'React',
        'react-dom': 'ReactDOM',
        'redux': 'Redux',
        'react-redux': 'ReactRedux',
        'superagent': 'superagent'
    },
    module: {
        //eslint loader
        preLoaders: [{
            test: /\.(js|jsx)$/,
            loader: 'eslint-loader',
            exclude: [__dirname]
        }],

        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015'],
                plugins: ["transform-object-assign"]
            }
        }, {
            test: /\.jsx$/,
            loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
            include: [__dirname],
            exclude: [nodeModulesPath]
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [__dirname],
            exclude: [nodeModulesPath]
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        },{
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'url?limit=10000&hash=sha512&digest=hex&name=img/[hash].[ext]',
                'image-webpack?{progress:true, optimizationLevel: 7, interlaced: false, pngquant: {quality: "65-90", speed: 4}}'
            ]
        }]
    },
    eslint: {
        configFile: '.eslintrc'
    }
};

module.exports = config;
