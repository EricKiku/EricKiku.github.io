---
title: NodeJs
icon: markdown
category:
  - 前端
tag:
  - Js
  - NodeJs
---
# ""

### 查看自己安装过的全局包

```js
npm list -g --depth 0
```



## 1. Node.js 简介

### 	1.1  什么是Node.js

​	`Node.js`是一个基于 Chrome V8引擎的` JavaScript 运行环境		`

​	 除了把JS代码放在浏览器运行，放在 Node 中也可以执行，作为后端开发使用

​	 NodeJs 教程官网：http://nodejs.cn/learn

### 	 1.2 Node.js中的JavaScript 运行环境

​		包含：`V8引擎、内置API、js代码`

​		内置API：`fs、path、http、js内置对象、querystring...`

​		①`浏览器`是JS的`前端运行环境`

​		②`Node.js`是JS的`后端运行环境`

​		③Node.js中 无法调用DOM 和 BOM 的`浏览器内置API`

###     1.3 在 Node.js 环境中执行 JS代码

​		① 打开终端

​		②输入： `node` 执行JS文件的路径

## 2. fs 文件系统模块

### 2.1 什么是fs文件系统模块

​		`fs 模块`是Node.js官方提供的，用来操作文件的模块，提供了一系列的方法和属性，用来满足用户对文件的操作需求

​		

|                  |                            |
| ---------------- | -------------------------- |
| `fs.readFile()`  | 用来读取指定文件中的内容   |
| `fs.writeFile()` | 用来向指定的文件中写入内容 |

​		如果再JS中使用fs模块来操作文件，需要先导入：

```js
const fs = require("fs");
```



### 2.2 读取指定文件中的内容

#### 		1. fs.readFile()

​		  使用`fs.readFile()`方法，可以读取文件中的内容，语法：

```js
fs.readFile(path[,options],callback)
```
​		 参数：

* 参数1：`path`。必须参数，字符串，表示文件的路径
* 参数2：`options`。可选参数，表示以什么编码格式来读取文件
* 参数3：`callback`。必选参数，文件读取成功以后，通过函数回调来获取数据

#### 		2.使用fs.readFile()

​			以urf8编码格式，读取内容，并打印`err`和`dataStr`的值：

```js
//1.导入fs模块
const fs = require("fs");

//调用 fs.readFile()来读取文件
//参数1：文件路径
//参数2：编码格式
//参数3：回调函数， 拿到读取失败和成功的结果 err  dataStr
fs.readFile("./1.txt","utf8",function (err,dataStr) {
    //如果读取成功，则err的值为null
    //如果读取失败，err的值是 错误对象，dataStr的值是 undefined
    console.log(err);
    console.log("-----");
    //打印成功的结果，返回内容
    console.log(dataStr);
});
```

### 2.3 向指定的文件中写入内容

#### 	1. fs.writeFile()

```js
fs.write(file,data[,options],callback)
```

​		 参数：

* 参数1：`file`。必须参数，字符串，表示存放文件的路径
* 参数2：`data`。必选参数，表示要写入的内容
* 参数3：`options`。可选参数，表示以什么格式写入文件内容，默认值utf8
* 参数4：`callback`。必选参数，文件写入完成之后的回调函数

#### 	2.使用fs.writeFile()

```js
const fs = require("fs");

fs.writeFile("./files/2.txt","hello world","utf8",function (err) {
    //如果文件写入成功，err的值是 null
    //如果文件写入失败，err的值是 错误对象
    console.log(err);
})
```

### 成绩整理练习

把

```
小红=100 小白=99 小绿=98 小蓝=89 小黑=92
```

整理成：

```
1:小红:100 
2:小白:99 
3:小绿:98 
4:小蓝:89 
5:小黑:92 
```

代码:

```js
const fs = require("fs");

fs.readFile("./成绩,txt","utf8",function (err,dataStr) {
    if (err) {
        console.log("文件读取失败");
    }else{
        let result = dataStr.split(" ");
        let result1="";
        for (let i = 0; i < result.length; i++) {
            result[i] = result[i].replace(/=/gi,":");
            result1 = result1 + (i+1)+":"+result[i]+" \n";            
        }
        fs.writeFile("./成绩-ok,txt",result1,{flag: 'a+'},function (err) {
            if (err) {
                console.log("操作失败");
            }else{
                console.log("操作成功");
            }
        })
        console.log("操作完毕。");
    }
})
```

### 2.4 文件路径动态拼接问题

​		Node.js会动态拼接相对路径，会把当前路径拼接在文件路径上，很容易出错，所以解决方法是：

​		使用**`__dirname`**	

​		__dirname的值返回的是，该JS文件所在的目录

```js
fs.readFile(__dirname + "./1.txt",function(){})
```



## 3. path 路径模块

### 	3.1 什么是path 路径模块

​		`path模块`是node官方提供的，用来处理路径的模块，提供了一系列的方法和属性，用来满足用户对路径的处理需求

​		

|                   |                                              |
| ----------------- | -------------------------------------------- |
| `path.join()`     | 用来将多个路径片段拼接成一个完整的路径字符串 |
| `path.basename()` | 用来从路径字符串中，将文件名解析出来         |

### 	3.2 使用 path模块

​		使用`path`模块需要先导入

```js
const path = require('path');
```

### 	3.3 path.join()

```js
const path = require('path');

const pathStr = path.join('/a','/b/c','../','/d','/e');
console.log(pathStr) //输出 \a\b\d\e		'../'会抵消前面最近的一个路径，所以\c没了

const pathStr2 = path.join(__dirname,"/files/1.txt");
console.log(pathStr2); //输出 当前文件所在的目录\files\1.txt
```

### 	3.4 path.basename()

​		可以获取到路径中的最后一部分，就是文件名

```js
path.basename(path[,ext])
```

​		参数：

* `path`：必选参数，表示路径
* `ext`：可选参数，表示文件扩展名
* 返回字符串：表示路径中的最后一部分

```js
const fpath = "/a/b/index.html"

let fullName = path.basename(fpath);
console.log(fullName)	//输出 index.html

let fullName2 = path.basename(fpath,'.html');
console.log(fullName2)	//输出 index
```

### 	3.5 path.extname

​		可以获取路径中文件的扩展名

```js
path.extname(路径)
```



### 	3.6 时钟分离案例

​		需要一个带有`<style>`和`<script>`的html文件，可以把其中的`<style>、<script>`和HTML全部分离到新的文件中

```js
const { resolveObjectURL } = require("buffer");
const fs = require("fs");

const path = require("path");

let regStyle = /<style>[\s\S]*<\/style>/
let regScript = /<script>[\s\S]*<\/script>/

fs.readFile(path.join(__dirname,"./index.html"),"utf-8",(err,result)=>{
    if(err){
        return console.log("读取错误");
    }
    resolveStyle(result);
    resolveScript(result);
    resolveHtml(result);
})

//处理css样式
function resolveStyle(htmlStr) {
    let r1 = regStyle.exec(htmlStr);
    let newCss = r1[0].replace("<style>","").replace("</style>","");
    fs.writeFile(path.join(__dirname,"./index.css"),newCss,'utf-8',(err)=>{
        if (err) {
            console.log("写入css失败");
        }
    })
}

//处理js
function resolveScript(htmlStr) {
    let r2 = regScript.exec(htmlStr);

    let newScript = r2[0].replace("<script>","").replace("</script>","");

    fs.writeFile(path.join(__dirname,"./index.js"),newScript,"utf-8",(err)=>{
        if (err) {
            console.log("写入js失败");
        }
    })

}

//处理html
function resolveHtml(htmlStr) {
    let newHtml = htmlStr
    .replace(regStyle,"<link rel='stylesheet' href='./index.css'/>")
    .replace(regScript,"<script src='./index.js'></script>");

    fs.writeFile(path.join(__dirname,"./indexNew.html"),newHtml,'utf-8',(err)=>{
        if (err) {
            console.log("写入html失败");
        }
    })
}
```





## 4. Http 模块

### 	4.1 什么是Http模块

​		`http模块`是Node.js官方提供的、用来`创建 Web 服务器`的模块，通过 http 模块的`http.createServer()`方法，就能把电脑变为一台web服务器

使用http模块需要先导入

```js
const http = require("http");
```

### 	4.2 使用 http 模块

#### 		1.导入http模块	

```js
const http = require('http');
```

#### 		2. 创建web服务器实例

```js
const server = http.createServer();
```

#### 		3. 为服务器绑定request事件

```js
server.on('request',(req,res)=>{
    //只有有客户端开请求服务器，就会触发request事件,从而触发回调函数
    console.log("i am server")
})
```

#### 		4. 启动服务器

```js
//调用server.listen(端口号,回调函数)
server.listen(80,()=>{
    //启动之后触发回调函数
    console.log()
})
```

#### 		5. 在终端启动服务器

```js
node js文件名
```

### 4.3 创建基本的web服务器

```js
const http = require('http');

const server = http.createServer();

server.on('request',(req,res)=>{
    console.log("触发函数");
})

server.listen(8080,()=>{
    console.log("服务器已启动");
});
```

### 4.4 req 请求对象

​		`req`包含了客户端相关的数据额属性

​		`req.url` 是客户端请求的URL地址

​		`req.method`	是客户端的method请求类型

### 4.5 res 响应

​		`res.end()` 向客户端响应内容

### 4.6 解决中文乱码问题

​		`res.setHeader('COntent-Type','text/html; charset=utf-8')`



## 5. 模块化

> * 知道模块化的好处
> * 知道`CommonJS`规定了哪些内容
> * 说出Node.js 中模块的三大分类
> * 能够使用npm 管理包
> * 了解什么是规范的包结构
> * 了解模块的加载机制

### 	5.1 Node.js 模块分类

#### 		`内置模块`：Nodejs官方提供，如fs、path、http

#### 		`自定义模块`：创建的每个.js文件，都是自定义模块

#### 		`第三方模块`：由第三方开发的模块，并非官方提供，使用前需要下载

### 	5.2 `module`对象

​		每个  .js 自定义模块中都有一个 `module`	对象，存储了和该模块有关的信息。默认是一个空对象。

​		其中有一个属性：`module.exports`		,可以将本模块内的成员暴露出去，供外界使用。

​		当外界使用`require()`方法导入自定义模块时，得到的正是`module.exports`所指向的对象

​		并且只会暴露最后一次指向的对象

```js
module.exports = {
    name:'eric',
    age:19
}

module.exports = {
    name:'kiku',
    age:20
}
```

```js
const person = require('./暴露成员');

console.log(person);
//{ name: 'kiku', age: 20 }
```

### 	5.3 `exports对象`

​		`exports`对象，和`module.exports`指向的是同一个对象，通过exports对象向外共享的和module.exports一样

​		但是，暴露的永远是`module.exports`指向的对象，如果这两个指向的对象不是同一个，那么以`module.exports`为准



### 	5.4 CommonJS

​		Node.js 遵循了 CommonJS 模块化规范，规定了模块之间的特性和各个模块之间如何相互依赖

		* 每个模块内部，`module` 代表该模块
		* module 是一个对象，他的exports 属性是对外的接口
		* 加载某个模块，其实是加载该模块的module.exprts属性,`require()`用于加载模块



## 6. npm 与 包

### 	6.1 快速创建 package.json

​		`npm init -y`

​		项目文件夹不用有中文，在使用npm安装包时会自动在`package.json`中把包的版本号和名称标注

​		package.json中有一个`dependencies`节点，其中标注了所有安装过的包名和版本

### 	6.2 一次安装所有项目使用的包

​		`npm install`：一次安装所有的包

​		会先读取`package.json`中所有包名和版本号，然后会自动下载

### 	6.3 卸载包

​		`npm uninstall 包名`

​		会把包从`package.json`中移除

### 	6.4 devDependencies

​		如果某些包在`项目开发阶段`用到，就把这些包放在`devDependencies`节点中

​		如果某些包在开发和上线都用到，就放在`dependencies`节点

​		`npm i 包名 -D`	：安装包时，把包放在`devDependencies`节点

### 	6.5 镜像服务器

​		淘宝镜像服务器：每隔一段时间，自动同步官方服务器的包，对用户提供下包服务

​		切换 下包的服务器地址：

​		`npm config get registry`	：查看当前的下包镜像源

​		`npm config set registry=https://registry.npm.taobao.org/`	：把下包镜像源切换为淘宝镜像源

​		`npm config get registry`	： 检查镜像源是否下载成功

### 	6.6 nrm

​		方便切换下包的镜像源

​		`npm i nrm -g`	：安装nrm

​		`nrm ls`	：查看所有可用的镜像源

​		`nrm use taobao`	：将下包镜像源切换到淘宝

### 	6.7 项目包

​		`开发依赖包`	：开发期间用的包，记录在`devDependencies`节点

​		`核心依赖包`	：开发和上线都用到的包，记录在`dependencies`节点

### 	6.8 全局包

​		如果在安装包时，加上`-g` ，这说明是安装的全局包

​		全局包会被安装在C:\Users\Administrator\AppData\Roaming\npm

​		`npm i 包名 -g `	：安装全局包

​		`npm uninstall 包名 -g`	卸载全局包

​		参考官方建议安装全局包

### 	6.9 i5ting_toc	

​		`i5ting_toc`	 是一个可以把`md文档`转为`html`页面的工具

​		`npm install -g i5ting_toc`：安装i5ting_toc	

​		`i5ting_toc	-f md文件路径 -o`	：使用工具



## 7. 开发自己的包

### 	7.1 初始化包的基本结构

  		1. 新建文件夹，作为包的根目录
  		2. 在文件夹中，需要三个文件夹：
  	   		1. `package.json`	：包管理配置文件
  	   		2. `index.js` ：包入口文件
  	   		3. `README.md`： 包说明文档

### 	7.2 初始化 package.json 

```json
{
    "name":"ek-tools", 		//包名
    "version": "1.0.0",		//版本号：大版本.功能版本.bug版本
    "main": "index.js",		//入口文件
    "description": "erickiku's tools",		//对包的描述
    "keywords": ["kiku","tools","erickiku"],//搜索关键字
    "license": "ISC"		//遵循的开源许可协议，推荐ISC
}
```

index.js 入口函数

```js
function dateFormat(params) {
    const dt = new Date(params);
    let y = padZero(dt.getFullYear());
    let m = padZero(dt.getMonth());
    let d = padZero(dt.getDate());

    let hh = padZero(dt.getHours());
    let mm = padZero(dt.getMinutes());
    let ss = padZero(dt.getSeconds());

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`		//注意用反引号
}

function padZero(n) {
    return n > 9 ?n : '0'+n
}

module.exports = {
    dateFormat
}
```

然后编写README.md文件

### 	7.3 注册npm 账号并发布包

​		未使用





## 8. Express

### 	 	8.1 Express 作用

​		1.`Web` 网站服务器

​		2.`API` 接口服务器

### 		8.2 使用

​		见 Ajax.md

### 	8.3 获取 URL 中所携带的参数

​		`request.query` ：获取客户端发送来的查询参数，默认是一个控对象

​		如果请求的URL中带有参数，就可以获取到，通过`xhr.send()`是不可以的

### 	8.4 获取 URL 中的动态参数

​		`req.params`：可以访问到URL中通过`:`匹配到的动态参数，默认是一个空对象

```js
xhr.open('GET',"http://127.0.0.1:8000/server/eric/123");
```

后端：

```js
app.get('/server/:admin/:pwd',(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    res.send(req.params);
})
```

### 	8.5 托管静态资源

#### 		8.5.1  express.static()

​			`express.static()`：通过这个，可以创建一个静态资源服务器，参数是目录,就可以通过URL访问目录下的文件，多次调用，就可以托管多个目录。而且使用资源不需要写目录名

```js	
//调用express.static()方法
app.use(express.static('./clock'));
app.use(express.static('./files'));
```

#### 		8.5.2 挂在路径前缀

​			有前缀时，想要使用目录的资源需要加前缀，前缀自定义。

```js
app.use('/clock',express.static('./clock'));
```

### 	8.6 路由

​		Express中路由由三部分组成：`请求的类型`、`请求的URL地址`、`处理函数`

​		`app.get('/')`、`app.post('/')`	：就是简单的路由

​		方便路由的管理，不建议挂在在app上，推荐抽离为单独的模块

#### 		8.6.1 模块化路由

​			1.创建路由对应的.js文件

​			2.调用`express.Router()`	函数创建路由对象

​			3.向路由对象上挂在具体的路由

​			4.使用`module.exprts()`向外共享路由对象

​			6.使用`app.use()`函数注册路由模块

#### 		8.6.2 使用模块化路由

​			先创建一个路由对象，代码如下路由对象，并且导出路由对象

​			在服务器中导入路由模块，并且注册导入的路由对象，就可以使用

​			创建服务器.js

```js
const express = require('express');

const app = express();

//导入路由模块
const router = require('./router')

//注册路由模块
app.use(router);


app.listen(8001,()=>{
    console.log('服务器启动，端口号8001');
})
```

​			一个路由对象：

```js
//路由模块
//导入express
const express = require('express');
//创建路由对象
const router = express.Router();
//挂在具体的路由

router.get('/user',(req,res)=>{
    res.send('user Get router module')
})

router.post('/user',(req,res)=>{
    res.send('user Post router module')
})
//导出路由对象
module.exports = router;

```

#### 		8.6.3 	路由前缀

​			在注册路由模块时，在前面加上一个前缀，则每次访问路由都需要加上这个前缀

​			`app.use('/api',router)`	,则上面的服务器代码应该变为

```js
const express = require('express');

const app = express();

//导入路由模块
const router = require('./router')

//注册路由模块,并且添加了路由前缀
app.use('/api',router);


app.listen(8001,()=>{
    console.log('服务器启动，端口号8001');
})
```

### 	 8.7 中间件

​	`中间件`，指业务处理的中间处理环节

​	当一个请求到达服务器之后，可以连续调用多个中间件，对这次请求进行预处理

#### 8.7.1 格式

​	中间件的形参列表中，必须包含next参数，而路由处理函数中只包含req和res

```js
app.get('/',function(req,res,next){
    next();
})
```

#### 8.7.2  `next`函数的作用

​		next函数是实现多个中间件连续调用的关键，他表示把请求交给下一个中间件还是路由

#### 8.7.3 中间件的使用

​		在中间件的最后，一定要调用`next()`方法，去把请求交给下一个中间件或路由

```js
const mw = function(req,res,next){
    console.log('这是一个中间件');
    next();
}
```

#### 8.7.3 全局的中间件

​		客户端发起任意请求，都会触发的中间件，叫全局生效中间件

​		创建一个中间件之后，通过调用`app.use(中间件)`，即可定义一个全局生效的中间件

​		全局中间件可以定义多个，按顺序执行

#### 8.7.4 中间件的作用

​		多个中间件之间，共享一份`req`和`res`，所以我们可以在上游的中间件中，统一的为req或res添加`自定义`的`属性`或`方法`，供下游的中间件或路由使用

```js
const zjj = function(req,res){
    let tiem = Date.now();
    
    req.time = time;
    
    next();
}

app.get('/',(req,res)=>{
    res.send(req.time);
})
```



#### 8.7.5 中间件注意事项

​	1.在`路由之前`注册中间件

​	2.可以对请求连续调用多个中间件

​	3.一定要在最后调用`next()`

​	4.不要在`next()`之后写代码

​	5.多个中间件之间，共享req和res



#### 8.7.6 中间件分类

​	1. `应用级别中间件`

​			直接被app挂载的：`app.use()、app.get()、app.post()`

​	2.`路由级别中间件`

​			和应用级别中间件没有却别，路由中间件是绑定在`路由对象`上，不是`app`上

​	3.`错误级别中间件`

​			用来捕获项目中发生的异常错误，防止项目崩溃

​			参数必须有四个，分别是`(err,req,res,next)`

​			格式：`app.use(function(err,req,res,next){..})`

​	4.`Express内置中间件`

​			1. express.static()	：托管静态资源

​			2.express.json	：解析JSON格式的请求体数据

```js
app.use(express.json())
```

​			3.express.urlencoded	: 解析URL-encoded	格式的请求体数据

```js
app.use(express,urlencoded({extended:false}))
```

​	5.`第三方中间件`

​			由第三方提供的中间件，按需下载，提高开发效率

​			例如：`body-parser`：来解析请求数据，使用如下

​				1.`npm install body-parser` 安装中间件

​				2.使用`require`导入中间件

​				3.调用`app.use()`注册并使用中间件

​			注册之后，在路由中使用`req.body`可以获取请求发送过来的数据





## 9.MySQL

常见的数据库有：

* `MySQL`数据库
* `Oracle`数据库
* `SQL Server`数据库
* `Mongodb`数据库

前三者属于`关系型数据库`,设计理念相同，用法类似

`Mongodb`数据库属于`非关系型数据库`，一定程度弥补了关系型数据库的缺陷



### 9.1 	SQL语法

网站：https://www.w3school.com.cn/sql/sql_select.asp



### 9.2 在项目中操作数据库步骤

​	1.安装操作数MySQL数据库的第三方模块`mysql`	：`npm i mysql`

​	2.通过mysql模块连接到MySQL数据库

​	3.通过mysql模块执行SQL语句

### 9.3 配置mysql模块

```js
//导入 mysql 模块
const mysql = require('mysql');

const db = mysql.createPool({
    host:'127.0.0.1',     //数据库的 IP 地址
    user:'root',          //数据库的账号
    password:'123456',    //数据库的密码
    database:'node_db'    //指定数据库     
})
```

### 9.4 测试 mysql 模块是否连接成功

​	`db.query()`，如果返回的result结果是`[ RowDataPacket { '1': 1 } ]`，说明连接成功

```js
//测试 是否 连接 成功
db.query('select 1',(err,result)=>{
    if (err) {//连接错误时触发
        return  console.log('连接错误'+err.message);
    }
    //成功连接数据库
    console.log(result);
})
```

### 9.5 查询数据

​	第一个参数是SQL语句

​	返回的结果是一个数组，可以用数组的方法来获取其中具体的数据

```js
//查询
let sqlQuery = 'select * from nodejs'
db.query(sqlQuery,(err,result)=>{
    if (err) {
        return console.log('查询失败，请重试');
    }
    console.log(result);
})
```



### 9.6 插入数据

​	插入SQL中把数据用`?`当占位符，在`db.query()`中，第二个参数是插入的值，用数组的形式使用

​	返回结果是一个对象，对象中有个属性，如下

​	使用`result.affectedRows === 1`，说明插入成功

```js
//插入
const user = {id:1,name:'eric',pwd:'213055',cj:90};
const insertSQL = 'INSERT INTO nodejs VALUES(?,?,?,?)'
db.query(insertSQL,[user.id,user.name,user.pwd,user.cj],(err,result)=>{
    if (err) {
        return console.log("插入错误，请重试");
    }
    console.log(result);
})
```

​	插入数据的`简单`方法

​	把SQL语句的最后写成`SET ?`，在插入时，把参数设置为一个对象，那么会把这个对象里对应的列名插入进去

```js
const user = {name:'eric',pwd:'213055'};
const insertSQL = 'INSERT INTO nodejs SET ?'
db.query(insertSQL,user,(err,result)=>{
    if (err) {
        return console.log("插入错误，请重试");
    }
    console.log(result);
})
```



### 9.7 更新数据



```js
//更新
const user = {id:1,name:'zhangsan',pwd:'213055',cj:100};
const updatedSQL = 'UPDATE nodejs SET name=?,pwd=?,cj=? WHERE id=?';
db.query(updatedSQL,[user.name,user.pwd,user.cj,user.id],(err,result)=>{
    if (err) {
        return console.log("更新错误，请重试");
    }
    console.log(result);
    if(result.affectedRows === 1){
        console.log('更新数据成功');
    };
})
```



​	更新数据的`简单`方法：

​	更新字段用`SET ?`，传参第二个参数用对象和`对象.id`，传的对象匹配的字段会更新

```js
//更新
const user = {id:1,name:'zhangsan',pwd:'213055',cj:100};
const updatedSQL = 'UPDATE nodejs SET ? WHERE id=?';
db.query(updatedSQL,[user,user.id],(err,result)=>{
    if (err) {
        return console.log("更新错误，请重试");
    }
    console.log(result);
    if(result.affectedRows === 1){
        console.log('更新数据成功');
    };
})
```

### 9.8	删除数据

​	 

```js
//删除
const deleteSQL = 'DELETE FROM nodejs WHERE id=?';
db.query(deleteSQL,[3],(err,result)=>{
    if (err) {
        return console.log("删除错误，请重试");
    }
    if(result.affectedRows === 1){
        console.log('删除数据成功');
    };
})
```

`推荐使用标记删除，使用更新SQL语句，把对应的删除标识位修改为删除`



## 10. Web 开发模式

### 10.2 身份认证

​	1.`服务端渲染`	使用 `Session 认证机制`

​	2.`前后端分离` 使用 `JWT 认证机制`

### 10.3 Cookie

​	`Cookie`是存储在浏览器的一个字符串，一般不超过4kb，由`一个名称和一个值`组成,和其他几个控制Cookie有效期、安全性等的可选属性。

​	不同域名下的Cookie相互独立，当客户端发出请求时，`会自动把未过期的Cookie一同发送到服务器`

​	Cookie没有安全性，可以被伪造

### 10.4 Session

​	作用：	提高身份认证的安全性



## 11. express-session

#### 	11.1 配置 express-session 中间件

​		安装：`npm install express-session`

```js
//导入session中间件
let session = require('express-session');

//配置session中间件
app.use(session({
    secret:'keyboard cat',	//secret 属性的值可以为任意字符
    resave:false,			//固定写法
    saveUninitialized；true //固定写法
}))
```

### 	11.2 使用session

​		配置成功之后，可以通过`req.session`来访问和使用session对象，

```js
req.session.user = req.body		//把用户的信息存储在session中
req.session.islogin = true		//把用户的登录状态存储到session中

let login = req.session.islogin	//获取session中的数据

req.session.destroy()			//清空session，清空对应的客户端的session，不会清空其他客户端的
```

​	

## 12. JWT 认证机制

​	`JWT`:`JSON Web Token`

​	由于Session 需要配合 Cookie，而Cookie又不能跨域，所以在前后端分离项目中，使用 `JWT 认证机制`，在存在跨域接口时，推荐使用

​	在请求服务器之后，把客户端的用户信息保存在`Token`字符串中，保存在客户端浏览器中，服务器通过还原Token字符串的形式来认证用户

#### 	12.1 JWT 组成部分

​		由三部分组成，分别是`Header、Payload(载荷)、Signature(签名)`，三者之间用`.`分隔

​		`Payload`是真正的用户信息，其他两个是安全性相关的，保证Token的安全性

### 	12.2 安装JWT

​		`npm install jsonwebtoken express-jwt`

		*  `jsonwebtoken` 用于生成 JWT 字符串
		*  `express-jwt` 用于将JWT 字符串解析还原成 JSON 对象

### 	12.3 使用

```js
..
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
```

​		定义 secret 密钥

​		定义一个字符串，字符串随意，就是一个密钥

```js
const secretKey = 'erickiku xyz'
```

​		使用 jsonwebtoken 包提供的`sign()`方法，把用户的信息加密成JWT字符串，响应给客户端

​		有三个参数：`用户对象`、`secret密钥`、`有效时间`

```js
res.send(jwt.sign({username:username},secretKey,{expiresIn:'30s'}))
```

​		把`JWT字符串还原为JSON对象`

​		客户端每次访问接口时，需要想服务器传递请求头中的`Authorization字段`，将Token发送到服务器进行身份验证

​		通过`express-jwt`中间件，自动将客户端发送过来的Token解析还原成JSON对象

​		只要配置了`express-jwt`中间件，就可以把解析出来的用户信息，挂在到`req.user`属性上

```js
//用app.use()注册中间件
//expressJWT({secret:secretKey})	用来解析指定的密钥的Token
//.unless({path:[/^\/api\///]})		指定哪些接口不需要访问权限
app.use(expressJWT({secret:secretKey}).unless({path:[/^\/api\///]}))	//api开头的接口不需要权限
```



### 12.4 解析JWT失败后捕获错误

```js
app.use((err,req,res,next)=>{
    //token 解析失败导致的错误
    if(err.name === 'UnauthorizedError'){
        return res.send({status:401.message:'无效的token'})
    }
    
    //其他原因导致错误
    res.send({status:500,message:'未知错误'})
})
```



## 大事件项目

http://escook.cn:8088/#/mds/1.init
