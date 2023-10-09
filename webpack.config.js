module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude:/node_modules/,
                use: ['babel-loader']
            }
        ]
    }
};