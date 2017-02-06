var webpack = require('webpack');

module.exports = {
    //devtool: "inline-source-map",
    devServer: {
        contentBase: './dist'
    },
    entry: {
        godEye: './src/index'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    module: {
        loaders: []
    },
    plugins: [
        //环境变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        //去除重复模块
        //new webpack.optimize.DedupePlugin(),
        //抽取CSS
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false  // remove all comments
            },
            compress: {
                warnings: false
            }
        }),

        new webpack.BannerPlugin('haha')
    ]
}