const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require("@babel/polyfill");

module.exports = {
    entry: ['@babel/polyfill', './src/main.ts'],
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    target: 'nwjs',
    node: {
        __filename: "mock",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
        minimize: false,
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        liveReload: true,
        compress: true,
        writeToDisk: true,
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: "Sindarin Compiler",
            template: "./src/index.html"
        })
    ]
}