/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const isNodeEnv = (process.env.NODE_ENV == 'node_development');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const featurePath = require("./webpack.paths");

// const extractSass = new ExtractTextPlugin({
//   filename: "[name].[contenthash].css",
//   disable: process.env.NODE_ENV === "development"
// });

module.exports = (options) => ({
    entry: options.entry,
    output: Object.assign({
        path: path.resolve(process.cwd(), 'build'),
    }, options.output), // Merge with env dependent settings
    module: {
        loaders: [{
            test: /\.js$/, // Transform all .js files required somewhere with Babel
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'stage-2'],
            },
        }, {
            rules: [{
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader",
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }]
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader?name=fonts/[name].[ext]',
            include: [/fonts/]
        }, {
            test: /\.(jpe?g|png|gif|svg)$/,
            loaders: 'file-loader?name=images/[name].[ext]',
            exclude: [/fonts/],
        }, {
            test: /\.html$/,
            loader: 'html-loader',
        }, {
            test: /\.json$/,
            loader: 'file-loader?name=jsons/[name].[ext]',
        }, {
            test: /\.(mp4|webm)$/,
            loader: 'url-loader?limit=10000',
        }]
    },
    plugins: options.plugins.concat([
        new CaseSensitivePathsPlugin(),
        new webpack.ProvidePlugin({
            // make fetch available
            fetch: 'exports?self.fetch!whatwg-fetch',
        }),
        new ExtractTextPlugin({
            filename: "[name]/common.css",
            allChunks: true
        }),
        // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
        // inside your code for any environment checks; UglifyJS will automatically
        // drop any unreachable code.
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        })


    ]),
    resolve: {
        modules: ['app', 'node_modules'],//Tell webpack what directories should be searched when resolving modules.
        extensions: [//Automatically resolve certain extensions.
            '.js',
            '.jsx',
            '.json',
        ],
        mainFields: [
            'browser',
            // Necessary hack because of a bug in redux-form
            // https://github.com/erikras/redux-form/issues/1637
            'main',
            'jsnext:main',
        ],
    },
    devtool: options.devtool,
    target: 'web', //Compile for usage in a browser-like environment
});
