---
title: Webpack进阶
icon: markdown
category:
  - 前端
  - 工具
tag:
  - Webpack
---
# ""


# Webpack高级

高级就是进行webpack优化，让代码在编译或运行时性能更好

以以下角度进行优化

* 提升开发体验
* 提升打包构建速度
* 减少代码体积
* 优化代码运行性能 



# 提升开发体验

## SourceMap 

#### 为什么使用

开发时运行的代码是通过编译的。

所有的css和js合并成一个文件，报错时不能准确找到错误的地方



#### 是什么

`SourceMap(源代码映射)`是一个用来生成源代码和构建后代码一一映射的文件的方案

会生成一个`xxx.map`文件，包含了源代码和构建后的代码每一行每一列的映射关系



#### 怎么使用

* 开发模式：`cheap-module-source-map`
  * 优点：打包编译速度快，只包含行映射
  * 缺点：没有列映射

```js
module.exports = {
    mode:"development",
    devtool:"cheap-module-source-map"
}
```

* 生产模式：`source-map`
  * 优点：包含行列映射
  * 缺点：打包速度慢 

```js
module.exports = {
    mode:"development",
    devtool:"source-map"
}
```





# 提升打包速度

## HotModuleReplacement

#### 为什么

开发时修改了其中一个模块的代码，webpack会把所有的模块全部重新打包，但是我们只需要修改某个模块代码，就这个模块需要重新打包，其他不变，就很快



使用 vue-loader来自动使用





## OneOf

### 为什么

每当有资源去查找loader，就会挨个查找，就算找到对应的loader，也会再向下找完

#### 怎么使用

把所有的loader放在一个oneOf中：

```js
module:{
    rules:[
        {
            oneOf:[
                {
                    loader...
                }
            ]
        }
    ]
}
```





## Include/Exclude

#### 为什么

有些下载到node_modules中的文件是不需要编译就可以直接使用的。

所以对js文件处理时，要排除node_modules下的文件



#### 是什么

* include

包含，只处理.xxx文件

* exclude

排除，除了.xxx文件以外的都处理



#### 怎么用

`exclude:`不处理指定的文件夹

`include:path.resolve(__dirname,"../src"),`：只处理哪些目录

```js
modules{
    rules:[
        {
            test: /\.js$/,
            //排除node_modules中的js文件，这些文件不处理
            exclude: /node_modules/,    
            //include:path.resolve(__dirname,"../src"),
            use: {
                loader: 'babel-loader',
                options: {
                    //智能预设，能够编译ES6的语法
                // presets: ['@babel/preset-env']
                }
            }
        }
    ]
}
```





## Cache

#### 为什么

每次打包时，js文件都要经过Eslint和Babel，速度比较慢

可以缓存之前的Eslint检查和Babel编译结果，这时第二次打包速度就快了



#### 是什么

对Eslint检查和Babel编译结果进行缓存



#### 怎么用

在`webpack.dev.js配置文件`或者`webpack.prod.js`中

开启Eslint缓存：

`cache:true`：开启缓存

`cacheLocation:path.resolve(__dirname,"../node_modules/.cache/eslintcache")`：为缓存文件指定目录

```js
```



开启Babel缓存：

` cacheDirectory:true,`//开启babel缓存

`cacheCompression:false`//关闭缓存文件压缩

```js
module:{
    rules:[
        {
            test: /\.js$/,
            //排除node_modules中的js文件，这些文件不处理
            // exclude: /node_modules/,    
            include:path.resolve(__dirname,"../src"),
            loader: 'babel-loader',
            options: {
                //智能预设，能够编译ES6的语法
                // presets: ['@babel/preset-env']
                cacheDirectory:true,//开启babel缓存
                cacheCompression:false//关闭缓存文件压缩
            }
        }
    ]
}
```



## Thead

#### 为什么

对js文件处理的主要就是eslint、babel、thread三个工具，所以要提升打包速度，可以开启多进程同时处理js文件



#### 是什么

多进程打包：开启电脑的多进程同时干一件事，速度更快

需要注意：仅在特别耗时的操作中使用，因为每个进程启动就大约有600ms的开销。



#### 怎么用

直接看文档吧：https://webpack.docschina.org/loaders/thread-loader/

启动进程的数量就是CPU的核数

1. 如何获取CPU的核数

```js
//nodejs核心模块，直接使用
const os = require('os');
//cpu核数
const threads = os.cpus().length
```



## TerserWebpackPlugin

压缩js代码，直接看文档：

https://webpack.docschina.org/plugins/terser-webpack-plugin/





# 减少代码体积

## Tree Shaking

#### 为什么

开发时会引入一些工具库，如果没有特殊处理的话，就会引入整个库，实际上可能只会使用其中一小部分的功能，这样整个库都打包进来，体积太大

#### 是什么

`Tree Shaking`是一个术语，通常用于移除JS中没有用的代码

依赖于：`ES module`

#### 怎么用

Webpack已经默认开启了功能，不需要配置



## Babel

#### 为什么

Babel 为编译的每个文件都插入了辅助代码，使代码体积过大

Babel对一些公共方法使用了 非常小的辅助代码，这个方法会被添加到每一个需要它的文件中

可以将这些辅助代码作为一个独立的模块，来避免重复引入

#### 是什么

`@babel/plugin-transform-runtime`：禁用了Babel对每个文件的runtime注入，而是引入`@babel/plugin-transform-runtime`并且使得所有的辅助代码从这里引用。

#### 怎么用

1. 下载包

```
npm install @babel/plugin-transform-runtime -D
```

2. 配置

```js
{
    test: /\.js$/,
        //排除node_modules中的js文件，这些文件不处理
        exclude: /node_modules/,    
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        //智能预设，能够编译ES6的语法
                        // presets: ['@babel/preset-env']
                        cacheDirectory:true,//开启babel缓存
                        cacheCompression:false,//关闭缓存文件压缩
                        plugins:["@babel/plugin-transform-runtime"],//减少代码体积
                    }
                }
            ]
}
```





## Image Minimizer

#### 为什么

开发时如果引入了多个图片，那么图片体积过大，就会让请求速度变慢，可以对图片进行压缩，减少图片体积



#### 是什么

`image-minimizer-webpack-plugin`：用来压缩图片的插件



#### 怎么用

1. 下载包

```
npm i image-minimizer-webpack-plugin imagemin -D
```

还需要两个包：

* 无损压缩：

```
npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev
```

* 有损压缩

```
npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo --save-dev
```



网址：	https://webpack.docschina.org/plugins/image-minimizer-webpack-plugin/





# 优化代码运行性能

## Code Split

#### 为什么

打包时会把所有的js文件打包到一个文件中，用不到的js也会加载

所以需要将打包生成的文件进行分割，生成多个js文件，加载哪个页面就只加载哪个js文件



#### 是什么

代码分割：

1. 分割文件：将打包的文件进行分割，生成多个js文件
2. 按需加载：需要哪个文件就加载哪个文件。



#### 怎么用

 网址：	https://www.webpackjs.com/guides/code-splitting/



## Preload/Prefetch

Preload：`让浏览器立即加载资源`

Prefetch：`让浏览器在空闲时加载资源`





# 原理部分

视频：	https://www.bilibili.com/video/BV14T4y1z7sw?p=65&vd_source=4826e78be6a985a9a8641312e495221e
