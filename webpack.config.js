const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'),

devServer = (isDev) => ! isDev ? {}:{
    devServer: {
        open: true,
        hot: true,
        port: 8080,
    }
};

module.exports = ({develop}) => ({
  mode: develop ? 'development' : 'production', 
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin ({
        template: './src/index.html'
    }),
    new MiniCssExtractPlugin ({
        filename: './styles/main.css'
    })
  ], 
  module: {
    rules: [
        {
            test: /\.(?:ico|png|jpeg|jpg|svg)$/i,
            type: 'asset/inline'
        },
        {
            test: /\.html$/i,
            loader: "html-loader"
        },
        {
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader , 'css-loader'
            ]
        },
        {
            test: /\.scss$/i,
            use: [
                MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
            ]
        }
    ]
  },

...devServer(develop),
});