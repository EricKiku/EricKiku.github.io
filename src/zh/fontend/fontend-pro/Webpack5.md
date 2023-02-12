---
title: Webpack5
icon: webpack
category:
  - 前端
  - 工具
tag:
  - Webpack
---
# ""


# 前言

## Webpack5

文档网站：	https://www.webpackjs.com/guides/getting-started/

## 为什么需要打包

开发时，会使用框架、ES6模块化语法，Less等预处理器进行开发。

这样的代码必须经过编译才能在浏览器运行，需要编译成浏览器识别的js、css语法。

打包工具可以`压缩代码、做兼容处理、提升代码性能等`



# 基本使用

`webpack`**是一个静态资源打包工具**

以一个或多个文件作为打包的入口，将整个项目所有文件编译组合成一个或多个文件输出。

输出的文件就是编译好的文件，可以在浏览器运行，将`webpack`输出的文件叫做`bundle`

## 功能介绍

Webpack的本身功能有限

* 开发模式：只能编译JS的`ES Moudle`语法
* 生产模式：还可以压缩JS代码

## 开始使用

#### :bulb:：初始化包文件

```
npm init -y
```

#### :bulb:：安装webpack和webpack-cli

```
npm install webpack webpack-cli --save-dev
```

#### :bulb:：启用webpack

指定路径的入口文件，编译到`dist`目录下，这是在没有配置文件的前提下

```
npx webpack ./src/main.js --mode=development
```



# 基本配置

## 核心概念

1. #### enrty(入口)

指示Webpack 从哪个文件开始打包

2. #### output(输出)

指示Webpack 打包完的文件输出到哪，如何命名

3. #### loader(加载器)

webpack 本身只能处理js，json等，其他资源需要借助loader，才可以解析

4. #### plugins(插件)

扩展webpack 的功能

5. #### mode(模式)

开发模式：`development`

生产模式：`production`

## 配置Webpack文件

:bulb:：1.在根目录新建配置文件，文件名：`webpack.config.js`

```js
const path = require('path')


module.exports={
    //入口
    entry:'./src/main.js',//相对路径
    //输出
    output:{
        //指定文件的输出路径
        //_dirname 代表当前文件的文件夹目录
        path:path.resolve(__dirname,'dist'),    //绝对路径
        //文件名
        filename:'main.js'
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
    ],
    //模式
    mode:'development'
    
}
```

:bulb:：2.启动配置文件

有了配置文件，会在根目录下找配置文件，读取配置信息

```
npx webpack
```



# 处理样式资源

Webpack 本身不具备识别样式资源的，需要借助`Loader`来帮助解析样式资源。

## 处理css资源

#### :bulb:：1.下载包

下载两个loader

```
npm install css-loader style-loader -D
```

#### :bulb:：2.功能介绍

* `css-loader`：负责将Css文件编译成Webpack能识别的模块
* `style-loader`：会动态创建一个Style标签，放置Webpack中CSS模块内容

#### :bulb:：3.在入口文件中引入CSS文件

```js
import './css/index.css'
```

#### :bulb:：4.配置文件

`test`：检测指定的文件

`use`：编译是，用指定的加载器编译检测的文件

```js
    //加载器
    module:{
        rules:[
            //loader的配置
            {
                test: /\.css$/,
                use: [ //执行顺序是 从右到左，从下到上
                     //将js中css通过style标签添加到html文件中生效
                    'style-loader',
                   	  //将css资源编译成commonjs的模块到js中
                    'css-loader'   
                ]
            }
        ],
    },
```

#### :bulb:：5.再次编译

在添加了`css-loader`后，就把css文件也编译了，并且在引用main.js的页面中创建一个`style`标签

```
npx webpack
```

## 处理less资源

#### :bulb:：1.下载包

下载loader和less

```
npm install --save-dev less-loader less
```

#### :bulb:：2.配置文件

```js
//加载器
module:{
    rules:[
        //loader的配置
        {
            test: /\.css$/,
            use: [ //执行顺序是 从右到左，从下到上
                'style-loader', //将js中css通过style标签添加到html文件中生效
                'css-loader'    //将css资源编译成commonjs的模块到js中
            ]
        },
        {
            test:/\.less$/,
            use:[
                'style-loader',
                'css-loader',
                'less-loader'   //先将less编译为css文件
            ]
        }
    ],
},
```

#### :bulb:：3.再次编译

```
npm webpack
```



# 处理图片资源

## 配置文件

```js
//加载器
module:{
    rules:[
        //loader的配置
        {
            test:/\.(png|jpe?g|gif|webp)$/,
            type:'asset'
        }
    ],
},
```

这是webpack内置的loader，可以直接编译

```
npx webpack
```

:bulb:：可以把小图片转成`base64`，把图片转成字符串，打包后不会在目标文件夹中生成。

配置文件：

```js
{
    test:/\.(png|jpe?g|gif|webp)$/,
        type:'asset',
        parser:{
            dataUrlCondition:{
                //小于10kb的图片转成base64
                //优点：减少请求次数    缺点：体积会变大
                maxSize:10 * 1024,  //10kb
            }
        }
}
```





# 修改输出目录

:bulb:：把图片输出在`static/images`目录下，`[hash]是给一个图片文件名，[hash:10]是指定名称长度为10位，[ext]是原来图片的扩展名，[query]查询参数`

```js
//加载器
module:{
    rules:[
        //loader的配置
        {
            test:/\.(png|jpe?g|gif|webp)$/,
            type:'asset',
            parser:{
                dataUrlCondition:{
                    //小于10kb的图片转成base64
                    //优点：减少请求次数    缺点：体积会变大
                    maxSize:10 * 1024,  //10kb
                }
            },
            generator:{
                //图片输出名称
                filename:'static/images/[hash:10][ext][query]'
            }
        }
    ],
},
```

:bulb:：修改js输出目录

```js
output:{
    //指定文件的输出路径
    //_dirname 代表当前文件的文件夹目录
    path:path.resolve(__dirname,'dist'),    //绝对路径
    //文件名，js文件放在该目录下，其他资源没有效果，还是放在dist目录下，除非对其他资源修改输出目录
    filename:'static/js/main.js'
},
```



# 自动清空上次打包

在输出中，添加一个`clean:true`，每次打包都会清空上次打包内容

```js
//输出
output:{
    //指定文件的输出路径
    //_dirname 代表当前文件的文件夹目录
    path:path.resolve(__dirname,'dist'),    //绝对路径
        //文件名
        filename:'static/js/main.js',
        clean:true
},
```



# 处理字体图标资源

#### :bulb:：1.下载字体图标

到阿里巴巴矢量图标库，把图片添加购物车，再添加到图片项目中，下载到本地，解压之后，把`.css`文件复制到目录中，在入口文件引入该CSS文件，并且把需要的文件复制到项目中，需要如`.ttf、.woff2`等，调整引入的CSS文件中文件的路径，在解析

#### :bulb:：2.设置图片资源路径

```js
{
    test:/\.(ttf|woff2?)$/,
        type:'asset/resource',
        generator:{
            //图片输出名称
            filename:'static/media/[hash][ext][query]'
        }
}
```





# 处理其他资源

都是直接输出在指定目录下，原封不动输出

```js
{
    test:/\.(ttf|woff2?|map3|map4|avi)$/,
        type:'asset/resource',
        generator:{
            //图片输出名称
            filename:'static/media/[hash][ext][query]'
        }
}
```



# 处理js资源

Webpack对js处理有限，只能编译ES模块化语法，不能编译其他语法，需要做一些兼容性处理

* 针对js兼容性处理，使用`Babel`来完成
* 针对代码格式，使用`Eslint`来完成

先完成`Eslint`，检测代码格式无误后，再用`Babel`做兼容性处理

## Eslint

http://eslint.cn/

也可以安装VSCODE的插件`Eslint`，可以自动实时的检测定义的配置文件，安装的插件会把打包好的文件也检查出错，需要一个配置文件`.eslintignore`来指定忽略哪些文件

`.eslintignore`

```
 dist
```



可组装的`JS`和`JSX`检查工具，是一个插件

使用Eslint，关键是写Eslint配置文件，其中添加各种规则，运行Eslint时就会以写的规则对代码进行检查



### 配置文件

配置文件有很多格式：

* `.eslintrc.*`
  * `.eslintrc`
  * `.eslintrc.js`（用）
  * `.eslintrc.json`
* `package.json`中 `eslintConfig`: 不需要创建配置文件

区别是配置格式不一样，只需要一个配置文件

### 具体配置

`.eslintrc.js`配置文件：

```js
module.exprts = {
    //解析选项
    parserOptions:{},
    //具体检查规则
    rules:{},
    //继承其他规则
    extends:[],
    ...
}
```

1. `parserOptions`解析选项

```
parserOptions:{
    ecmaVersion:6,      //ES6
    sourceType:'module' //es module
},
```

2. `rules`规则
   * `'off'`或`0`- 关闭规则
   * `'warn'`或`1`- 开启规则，使用警告级别的错误，不会退出程序
   * `'error'`或`2`- 开启规则，使用错误级别的错误，会退出程序

有很多规则，`no-var`只是其中一个

```
rules:{
	"no-var":2  //禁止使用var定义变量
}
```

3. extends继承

可以使用现有的规则，直接引入即可

* ==Eslint官方规则==：`eslint:recommended`
* ==Vue Cli 官方规则==：`plugin:vue/essential`
* ==Reack Cli官方规则==：`react-app`



### Eslint使用

1. 安装

安装eslin和eslint-webpack-plugin

```
npm install eslint eslint-webpack-plugin --save-dev
```

 	2. 在webpack配置中先引入才可以使用

```
const ESLintPlugin = require('eslint-webpack-plugin');
```

3. 把插件添加到插件配置

```js
module.exports = {
    //...
    //插件
    plugins:[
        //插件的配置
        new ESLintPlugin({
            //检查哪个目录或文件
            context:path.resolve(__dirname,'src')
        })
    ],
    //...
}
```

4. 定义配置文件`.eslintrc.js`

```js
module.exports = {
    //继承Eslint 规则
    extends:["eslint:recommended"],
    //环境变量
    env:{
        node:true,      //启动node中全局变量
        browser:true    //启动浏览器中全局变量
    },
    parserOptions:{
        ecmaVersion:6,      //ES6
        sourceType:'module' //es module
    },
    rules:{
        "no-var":2  //禁止使用var定义变量
    }
}
```



## Babel

用于将ES6语法编写的代码转换成向后兼容的JS语法，使能够在旧版浏览器中运行或其他环境中

### 1. 配置文件

* `babel.config.*`	： 新建文件，位于根目录
  * `babel.config.js`
  * `babel.config.json`
* `babelrc.*`：新建文件，位于根目录
  * `babelrc`
  * `babelrc.js`
  * `babelrc.json`
* `package.json`中`babel`：不需要新建文件，在原有的文件中写

Babel会查找和读取配置文件，所以配置文件只需要存在一个即可

### 2. 具体配置

配置文件`babel.config.js`

```js
module.exports = {
    //预设
    presets:[]
}
```

`presets`预设：通过一组Babel插件，来扩展Babel功能

* `@babel/preset-env`：允许使用最新的JavaScript
* `@babel/preset-react`：编译react jsx语法的预设
* `@babel/preset-typescript`：编译ts的语法预设

### 3.在webpack中使用

:bulb:：1.安装

需要安装三个插件

```
npm install -D babel-loader @babel/core @babel/preset-env
```

:bulb:：2. 添加babel-loader到`webpack配置文件`的loader列表中

被注释掉的`presets:[]`可以写在webpack配置文件中，也可以创建配置文件

```js
module: {
  rules: [
    {
      test: /\.js$/,
      //排除node_modules中的js文件，这些文件不处理
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          //智能预设，能够编译ES6的语法
          //presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```

`babel.config.js`

```js
module.exports = {
    //智能预设，可以编译ES6语法
    presets:["@babel/preset-env"]
}
```



# 处理Html资源



## 安装

```
npm install --save-dev html-webpack-plugin
```

## 使用

先在webpack配置文件上引入

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
```

其次在`plugins:[]`代码处`new`创建

```js
var webpackConfig = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()]
};
```

## 问题

1. 原先的html文件就不需要引入js的代码
2. 如果不指定模板，则输出的html文件是空的，只引入了JS

解决：

* 模板，指定以那个文件为模板创建新的html文件，否则内容会全部丢失
* 新的html：1.结构和指定的一模一样 2.自动引入打包输出的资源

```js
    //插件
    plugins:[
        //插件的配置
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'public/index.html')
        })
    ],
```





# 自动化

写完代码之后不需要重新打包，一切自动化

使用服务器自动化打包时不会有输出，也就是`dist`目录下没有文件，而是在内存中打包

## 1. 下载包

```
npm install webpack-dev-server -D
```

## 2.配置

和`loader、plugins`等同级

```js
//开发服务器
devServer:{
    host:"localhost",//启动服务器域名
    port:"3000",//启动服务器端口号
    open:true//是否自动打开浏览器
},
```

## 3.启动

不再像打包webpack一样使用`npx webpack`，这样不会启动服务器

应该是`npx webpack server`，就会启动服务器，修改代码后自动打包
