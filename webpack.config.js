const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        home: "./app/ts/home.ts"        
    },
    output: {
        path: path.resolve('./app/assets/js'),
        filename: "[name].bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".scss", ".sass"]
    },
    module: {
        rules: [
            // tutti i file .ts devono essere compilati da ts-loader
            { test: /\.tsx$/, loader: "ts-loader" },
            { test: /\.s[ac]ss$/, use: [
                    'style-loader', 
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }

}