const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = [
{
    mode: 'development',
    entry: {
        home: "./app/ts/home.ts",     
    },
    output: {
        path: path.resolve('./app/assets/js'),
        filename: "[name].bundle.js"
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: [".ts", ".tsx", ".js", "*", ".js", ".vue", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.s[ac]ss$/, use: [
                    'style-loader', 
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]

},
{
    mode: 'development',
    entry: {
        component: './app/ts/ui/components/Component.vue'
    },
    output: {
        path: path.resolve('./app/assets/js/components'),
        filename: "[name].component.js"
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: [".ts", ".tsx", ".js", "*", ".js", ".vue", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        ts: [
                            {
                                loader: 'ts-loader',
                                options: {
                                    appendTsSuffixTo: [/\.vue$/]
                                }
                            }
                        ]
                    }
                }
            },
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}
]
