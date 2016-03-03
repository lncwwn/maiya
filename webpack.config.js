var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('dep.js');

module.exports = {
    entry: {
        app: './assets/js/app.js',
        user_setting: './assets/js/user_setting.js',
        editor: './assets/js/editor.js',
        user_column: './assets/js/user_column.js',
        site_column: './assets/js/site_column.js'
    },
    output: {
        path: './assets/dist/js',
        filename: '[name].js'
    },

    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules|bower_components/, loader: 'babel-loader'},
            {test: /\.less$/, loader: 'less'},
            //{test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
            //{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            //{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            //{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
        ]
    },

    plugins: [commonsPlugin]
};

