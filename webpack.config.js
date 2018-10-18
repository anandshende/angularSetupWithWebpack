var webpack = require('webpack');
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'none',
    devtool: 'inline-source-map',
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'mainApp': './src/mainApp/main.ts'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),

        new HtmlWebpackPlugin({
            title: "mainApp",
            filename: 'index.html',
            template: 'src/mainApp/index.html',
            chunks: ['polyfills', 'vendor', 'mainApp']
        }),

        new ManifestPlugin(),

        new CopyWebpackPlugin([
            { from: './src/assets', to: 'assets' }
        ])
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss', '.html'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['ts-loader', 'angular2-template-loader', '@angularclass/hmr-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loaders: ['html-loader']
            },
            {
                test: /\.(woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                include: path.dirname(__dirname, "src/assets")
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
                include: path.dirname(__dirname, "src/assets")
            }
        ]
    },
    devServer: {
        host: 'localhost.example.com',
        port: 8000
    }
}