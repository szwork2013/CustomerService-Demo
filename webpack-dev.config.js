var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'dist');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

var config = {
    //Entry point to the project
    entry: {
        customerService: path.join(__dirname, './src/entrys/index.jsx'),
    },
    output: {
        path: path.join(__dirname, "js"),
        filename: '[name].js' // Template based on keys in entry above
    },
    //Webpack config options on how to obtain modules
    resolve: {
        //When requiring, you don't need to add these extensions
        extensions: ["", ".js", ".jsx", ".css"],
    },
    //Configuration for dev server
    devServer: {
        contentBase: '.',
        devtool: 'eval',
        hot: true,
        inline: true,
        port: 3000
    },
    devtool: 'eval',
    externals: {
        'fs': 'js',
        'react': 'React',
        'react-dom': 'ReactDOM',
        'redux': 'Redux',
        'react-redux': 'ReactRedux',
        'superagent': 'superagent'
    },
    plugins: [
        //Used to include index.html in build folder
        new HtmlWebpackPlugin({
            inject: false,
            template: path.join(__dirname, './index.html')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        //eslint loader
        // preLoaders: [{
        //     test: /\.(js|jsx)$/,
        //     loader: 'eslint-loader',
        //     include: [path.resolve(__dirname, "src")],
        //     exclude: [path.resolve(__dirname, "src/svg-icons"), path.resolve(__dirname, "src/utils/modernizr.custom.js")]
        // }],
        //Allow loading of non-es5 js files.
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
            include: [__dirname, path.resolve(__dirname, 'src/app')],
            exclude: [nodeModulesPath]
        }, {
            test: /\.txt$/,
            loader: 'raw-loader',
            include: path.resolve(__dirname, 'src/app/components/raw-code')
        }, {
            test: /\.md$/,
            loader: 'raw-loader',
            include: path.resolve(__dirname, 'src/app/components')
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [__dirname, path.resolve(__dirname, '../src')],
            exclude: [nodeModulesPath]
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, ]
    },
    // eslint: {
    //     configFile: '.eslintrc'
    // }
};

module.exports = config;
