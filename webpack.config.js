const path = require('path'); // Node.js path module
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sveltePreprocess = require('svelte-preprocess');

module.exports = {
    target: 'web', // default
    entry: './src/', // default
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].[contenthash].js',
    },
    optimization: {
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                }
            }
        }
    },
    resolve: {
        // For Svelte: https://github.com/sveltejs/svelte-loader#usage
        alias: {
            svelte: path.resolve('node_modules', 'svelte')
        },
        extensions: ['.mjs', '.js', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main']
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },

            {
                test: /\.(png|svg|jpg|gif|mp3|woff|woff2)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "file-loader"
                    }
                ],

            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.svelte$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "svelte-loader",
                        options: {
                            preprocess: sveltePreprocess({
                                scss: true
                            }),
                            emitCss: true,
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebPackPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
    ],
}
