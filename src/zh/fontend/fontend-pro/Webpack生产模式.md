---
title: Webpack生产模式
icon: markdown
category:
  - 前端
  - 工具
tag:
  - Webpack
---
# ""


# Webpack生产模式

生产模式是开发完代码之后，需要得到代码来部署上线，这个模式下要对代码进行优化，让性能更好

只要优化两个点：

* 代码运行性能
* 代码打包速度

# 准备工作

因为开发模式不需要输出，所以可以把输出`output`中的`path:undefined`。

需要两个配置文件:

* `webpack.dev.js`：开发模式配置
* `webpack.prod.js`：生产模式配置

## 开发模式配置:

```js
const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    //入口
    entry:'./src/main.js',//相对路径
    //输出
    output:{
        //指定文件的输出路径
        //_dirname 代表当前文件的文件夹目录
        // path:path.resolve(__dirname,'dist'),    //绝对路径
        path:undefined,
        //文件名
        filename:'static/js/main.js',
        // clean:true
    },
    //加载器
    module:{
        rules:[
            //loader的配置
        ],
    },
    //插件
    plugins:[
        //插件的配置
        new ESLintPlugin({
            context:path.resolve(__dirname,'../src')
        }),
        new HtmlWebpackPlugin({
            //模块，指定以那个文件为模块创建新的html文件，否则内容会全部丢失
            //新的html：1.结构和指定的一模一样 2.自动引入打包输出的资源
            template:path.resolve(__dirname,'../public/index.html')
        })
    ],
    //开发服务器
    devServer:{
        host:"localhost",//启动服务器域名
        port:"3000",//启动服务器端口号
        open:true//是否自动打开浏览器
    },
    //模式
    mode:'development'
    
}
```



启动开发模式配置：`npx webpack server --config ./config/webpack.dev.js`

## 生产模式配置：

```js
const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    //入口
    entry:'./src/main.js',//相对路径
    //输出
    output:{
        //指定文件的输出路径
        //_dirname 代表当前文件的文件夹目录
        path:path.resolve(__dirname,'../dist'),    //绝对路径
        //文件名
        filename:'static/js/main.js',
        clean:true
    },
    //加载器
    module:{
        rules:[
            //loader的配置
        ],
    },
    //插件
    plugins:[
        //插件的配置
        new ESLintPlugin({
            context:path.resolve(__dirname,'../src')
        }),
        new HtmlWebpackPlugin({
            //模块，指定以那个文件为模块创建新的html文件，否则内容会全部丢失
            //新的html：1.结构和指定的一模一样 2.自动引入打包输出的资源
            template:path.resolve(__dirname,'../public/index.html')
        })
    ],
    //模式
    mode:'production'
}
```



启动生产模式配置文件：`npx webpack --config ./config/webpack.prod.js`



## 简化启动代码

配置文件的打包启动代码有点长，可以在`package.json`中设置一下

```json
"scripts": {
    "start":"npm run dev",
    "dev": "webpack server --config ./config/webpack.dev.js",
    "build": "webpack --config ./config/webpack.prod.js"
}
```

启动开发模式配置：`npm run dev`，或者`npm start`。

启动生产模式配置：`npm run build`





# CSS处理

## 提取CSS成单独文件

CSS目前被打包在js文件中，当js文件加载时，会创建一个style标签来生成样式

会产生闪屏现象，应该是单独的CSS文件，通过 link 标签加载

### 1.下载包

```
npm install mini-css-extract-plugin -D
```

### 2.引入包

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
```

### 3.配置loader

之前开发模式的处理css的loader中的`style-loader`不再使用，把它改为`MiniCssExtractPlugin.loader`

```js
rules:[
    //loader的配置
    {
        test: /\.css$/,
        use: [ //执行顺序是 从右到左，从下到上
            MiniCssExtractPlugin.loader, //将css提取成单独的文件
            'css-loader'    //将css资源编译成commonjs的模块到js中
        ]
],
```

### 4.在插件new创建

`filename`是指定输出的css文件目录和名称

```js
new MiniCssExtractPlugin({
        filename:'static/css/main.css'
}),
```



## CSS兼容性处理

### 1.下载包

三个包

```
npm install postcss-loader postcss postcss-preset-env -D
```

### 2.配置loader

配置`postcss-loader`，一定要在`css-loader`之后，`less-loader和sass-loader`之前

```js
module:{
    rules:[
        {
            test: /\.css$/,
            use: [ //执行顺序是 从右到左，从下到上
                MiniCssExtractPlugin.loader, //将css提取成单独的文件
                'css-loader',    //将css资源编译成commonjs的模块到js中
                {
                    loader:"postcss-loader",
                    options:{
                        postcssOptions:{
                            plugins:[
                                "postcss-preset-env",   //解决大部分兼容性问题
                            ],
                        },
                    },
                },
            ],
        }
    ]
}
```



设置兼容性的兼容程度：

在`package.json`中，添加一个配置，在最高级，不属于哪一个里面

```json
"browserslist":[
    "last 2 version",
    "> 1%",
    "not dead"
]
```



## CSS压缩

### 1.下载包

```
npm install css-minimizer-webpack-plugin --save-dev
```

### 2.引入插件

```js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
```

### 3.在插件new创建

```js
 //插件
    plugins:[
        //插件的配置
        new MiniCssExtractPlugin({
            filename:'static/css/main.css'
        }),
        new CssMinimizerPlugin(),
    ],
```

