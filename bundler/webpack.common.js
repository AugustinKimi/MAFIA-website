const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, '../src/script.js'),
    output:
    {
        hashFunction: 'xxhash64',
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    plugins:
    [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static') }
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            minify: true,
            // meta: {
            //     'description': { name: 'description', content: "Elrond Mafia is a 2D collection of 5555 Mobsters from Elrond City. The rest of the world see us as criminal, we are just building Web 3. Who's ready to be a part of the story ?" },
            //     'og:title': { property: 'og:title', content: "Elrond Mafia" },
            //     'og:description': { property: 'og:description', content: "Elrond Mafia is a 2D collection of 5555 Mobsters from Elrond City. The rest of the world see us as criminal, we are just building Web 3. Who's ready to be a part of the story ?" },
            //     'og:type': { property: 'og:type', content: 'website' },
            //     'og:url': { property: 'og:url', content: "https://elrond-mafia.com" },
            //     'og:image': { property: 'og:image', content: "./images/link-img.png" },
            //     'twitter:card': { name: 'twitter:card', content: 'summary_large_image' },
            //     'twitter:title': { name: 'twitter:title', content: "Elrond Mafia" },
            //     'twitter:description': { name: 'twitter:description', content: "Elrond Mafia is a 2D collection of 5555 Mobsters from Elrond City. The rest of the world see us as criminal, we are just building Web 3. Who's ready to be a part of the story ?" },
            //     'twitter:image': { name: 'twitter:image', content: "./images/link-img.png" }
            //   }
        }),
        new MiniCSSExtractPlugin()
    ],
    module:
    {
        rules:
        [
            // HTML
            {
                test: /\.(html)$/,
                use:
                [
                    'html-loader'
                ]
            },

            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },

            // CSS
            {
                test: /\.css$/,
                use:
                [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'
                ]
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                type: 'asset/resource',
                generator:
                {
                    filename: 'assets/images/[hash][ext]'
                }
            },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                type: 'asset/resource',
                generator:
                {
                    filename: 'assets/fonts/[hash][ext]'
                }
            },
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                type: "asset/source",
                generator: {
                  filename: "assets/images/[hash][ext]",
                }
            }
        ]
    }
}
