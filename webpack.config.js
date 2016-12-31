//不是通过require应用的第三方插件其实都不是webpack中已经内置的插件，需要npm安装，然后需要new一个“[对应的插件名]...”即可
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
//获得当前系统时间
function show() {
    var mydate = new Date();
    var str = mydate.getFullYear() + "/";
    str += (mydate.getMonth() + 1) + "/";
    str += mydate.getDate() + " ";
    str += mydate.getHours() + ":";
    str += mydate.getMinutes() + ":";
    str += mydate.getSeconds() + ".";
    return str;
}


module.exports = {
    devtool: 'source-map', //配置生成Source Maps并放到js文件中，选择合适的选项（此项选择不需要下载任何第三方插件）
    /*  devtool共有7种选项
    	eval 文档上解释的很明白，每个模块都封装到 eval 包裹起来，并在后面添加 //# sourceURL
    	source-map 这是最原始的 source-map 实现方式，其实现是打包代码同时创建一个新的 sourcemap 文件， 并在打包文件的末尾添加 //# sourceURL 注释行告诉 JS 引擎文件在哪儿
    	hidden-source-map 文档上也说了，就是 soucremap 但没注释，没注释怎么找文件呢？貌似只能靠后缀，譬如 xxx/bundle.js 文件，某些引擎会尝试去找 xxx/bundle.js.map
    	inline-source-map 为每一个文件添加 sourcemap 的 DataUrl，注意这里的文件是打包前的每一个文件而不是最后打包出来的，同时这个 DataUrl 是包含一个文件完整 souremap 信息的 Base64 格式化后的字符串，而不是一个 url。
    	eval-source-map 这个就是把 eval 的 sourceURL 换成了完整 souremap 信息的 DataUrl
    	cheap-source-map 不包含列信息，不包含 loader 的 sourcemap，（譬如 babel 的 sourcemap）
    	cheap-module-source-map
    */
    entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/public", //打包后的文件存放的地方
        filename: "bundle.js" //打包后输出文件的文件名
    },
    module: { //在配置文件里添加JSON loader
        loaders: [{
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel', //在webpack的module部分的loaders里进行配置即可
                query: {
                    presets: ['es2015', 'react'], //意指:可以在开发环境下使用Es2015和react的相关语法

                    //env的配置是使用了react-transform-hmr插件，
                    //作用：  当你使用React时，可以热加载模块了(就是改变原代码后，不需要先打包就能够通过刷新浏览器来看到页面的变化)
                    "env": {
                        "development": {
                            "plugins": [
                                ["react-transform", {
                                    "transforms": [{
                                        "transform": "react-transform-hmr",

                                        "imports": ["react"],

                                        "locals": ["module"]
                                    }]
                                }]
                            ]
                        }
                    }
                }
            },
            {
                test: /\.css$/,
                //loader: 'style!css?modules'//添加对样式表的处理(将css转化，然后输出到js文件中)
                loader: ExtractTextPlugin.extract('style', 'css?modules!postcss') //单独处理css，不放在js文件中
            }
        ]
    },
    postcss: [
        require('autoprefixer') //调用autoprefixer插件（css文件自动添加前缀的插件）
    ],
    plugins: [
        new webpack.BannerPlugin("Copyright Allen." + " " + "Time:" + show()), //在这个数组中new一个就可以了

        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数(html文件模板，用来生成新的html文件)
        }),

        new webpack.HotModuleReplacementPlugin(), //热加载插件

        new webpack.optimize.OccurenceOrderPlugin(), //为组件分配ID
        new webpack.optimize.UglifyJsPlugin(), //压缩js
        new ExtractTextPlugin("[name]-[hash].css"), //js与css分离(其中使用了以文件名字和哈希值组合来作为打包文件的新名字，是的文件内容改变的时候和html文件引用的是同步的！)


        /*new webpack.HotModuleReplacementPlugin({ multiStep: true}), */ //在大型项目中启用多遍编译以提高性能.
        new OpenBrowserPlugin({ url: 'http://localhost:8080' + '/index.html' }) //自动打开浏览器


    ],

    //本地服务器构建
    devServer: {
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        colors: true, //终端中输出结果为彩色
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新



        hot: true,
        host: "localhost", // Defaults to `localhost`   process.env.HOST
        port: "8080" // Defaults to 8080   process.env.PORT
    }
}