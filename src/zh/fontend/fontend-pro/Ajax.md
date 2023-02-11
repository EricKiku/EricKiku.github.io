---
title: Ajax
icon: markdown
category:
  - 前端
tag:
  - Js
  - Ajax
---
# ""


vscode字体

`Consolas, 'Courier New', monospace`

`'Cascadia Code','黑体',Consolas,'Courier New',monospace`

# 1.Ajax

## 1.1 简介

**AJAX** = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。

AJAX 不是新的编程语言，而是一种使用现有标准的新方法。

AJAX 最大的优点是在不重新加载整个页面的情况下，可以与服务器交换数据并更新部分网页内容。

AJAX 不需要任何浏览器插件，但需要用户允许JavaScript在浏览器上执行。

## 1.2 XML简介

XML 可扩展标记语言

XML 被设计来用来传输和保存数据

XML 没有预定义标签，全是自定义标签，用来表示一些数据

```xml
<student>
	<name>孙悟空</name>
    <age>18</age>
    <gender>男</gender>
</student>
```

==早期使用XML从服务器获取数据，并解析，后被JSON代替==

## 1.3 Ajax特点

### 	1.3.1 优点

* 可以无刷新的获取服务器端的数据
* 可以更新页面部分内容

#### 	1.3.2 缺点

* 没有历史记录
* 存在跨域问题
* SEO(搜索引擎)不友好，异步请求过来的数据，在源代码里是没有的



# 2.HTTP

## 	2.1 请求报文

请求格式与参数

头的格式是	`属性: 值`，空格不能少

空行不能少

```
行	GET   /?pwd = ...	HTTP/1.1
头	Host: baidu.com
	Cookie: name=user
	...
空行(不能少)
体	username=admin&password=123
```







## 	2.2 响应报文



```
行	HTTP1.1   200  OK
头	Host: baidu.com
	Cookie: name=user
	...
空行(不能少)
体	<html>代码
```



# 3. Express

基于**Node.js**平台，快速、极简的Web开发框架

## 3.1 安装express:

终端:

`npm i express`

## 3.2 引入及使用 express

> 1.引入express

```js
const express = require('express');
```

>  2.创建应用对象

```js
const app = express();
```

> 3.创建路由规则

**request**是对请求报文的封装

**response**是对响应报文的封装

```js
app.get('/',(request,response)=>{
    
})
```

> 4.监听端口启动服务

```js
app.listen(8000,()=>{
    console.log("服务已经启动，8000端口正在监听")
})
```

> 5.在路由规则中设置响应

```js
app.get('/',(request,response)=>{
    response.send('Hello Express');
})
```

> 6.把文件放在Node中运行

终端：

```
node 文件名.js
```

就可以在浏览器输入:127.0.0.0:端口号		



# 4. Ajax发送请求

需要两个文件，一个前端，一个后端服务

## 4.1 准备

前端页面代码:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Ajax</title>
<style>
    #app{
        width: 200px;
        height: 100px;
        border: 1px solid rgb(136, 46, 240);
    }
</style>
</head>
<body>
    <button>点击发送请求</button>
    <div id="app"></div>
</body>
</html>
```

后端服务器代码

```js
const express = require('express')

const app = express();

app.get('/server',(require,response)=>{
    // 设置响应头
    response.setHeader("Access-Control-Allow-Origin","*");

    // 设置响应
    response.send("Hello Ajax");
});

app.listen(8000,()=>{
    console.log('服务已经启动，端口号8000');
})
```

==在响应的代码块中，把路径修改为/server，在访问浏览器的指定路径时会使用回调函数==

==设置响应头的部分是为了解决跨域问题==

## 4.2 发送请求

发送GET请求，与POST请求的区别就是`open`初始化的时候，和服务器需要有一个`app.post`

```js
btn.onclick = function () {
    //1.创建对象
    let xhr = new XMLHttpRequest();
    //2.初始化， 设置请求的方法和url
    xhr.open("GET","http://127.0.0.1:8000/server");
    //3.发送
    xhr.send();
    //4.事件绑定，处理服务器返回的结果
    //readystate是xhr中的属性，表示状态
    //0 未初始化    1 open方法调用完毕  2 send方法调用完毕
    //3 服务器返回了结果    4 服务器返回所有结果
    xhr.onreadystatechange = function () {
        //判断(服务器返回了所有的结果)
        if(xhr.readyState === 4){
            //判断响应状态码200 404 403 401 500
            //2开头的都是成功
            if(xhr.status >= 200 && xhr.status < 300) {
                //处理结果  行 头 空行 体
                //1.响应行  .status 状态码  statusText 状态字符串
                console.log(xhr.status);
                console.log(xhr.statusText);
                //2.响应头,所有响应头
                console.log(xhr.getAllResponseHeaders());
                //3.响应体
                console.log(xhr.response);

                app.innerHTML = xhr.response;
            }else{

            }
        }
    }
}
```

`发送请求时，如果带参数，GET请求的参数是直接拼接在URL后，使用?pwd=123&...`

`而POST的请求参数是写在.send()发送方法中:`

```js
xhr.send("admin=zs&pwd=123");
```

且参数的格式不止一个:`admin=zs/admin:zs`

## 设置请求头信息

`xhr.setRequestHeader("键","值)`

|                                      |                                     |
| ------------------------------------ | ----------------------------------- |
| `'Content-Type'`(设置请求参数的格式) | 'application/x-www-form-urlencoded' |
| `name`                               | 'atguigu'                           |

设置name会不被允许，则需要在服务器端添加

```js
response.setHeader("Access-Control-Allow-Headers","*");
```

## 发送和接收JSON数据

在服务器端设置返回数据为**JSON**格式

首先定义对象，在通过`JSON.stringify()`来装换为JSON格式

```js
app.all("/json-server",(require,response)=>{
    response.setHeader("Access-Control-Allow-Origin","*");
    let data = {
        name:"eric",
        age:18
    }
    response.send(JSON.stringify(data));
})
```

在前端接收时，分`自动转换为对象`和`手动转换为对象`

```js
btn[2].onclick = function () {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST","http://127.0.0.1:8000/json-server");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState ===4) {
            if (xhr.status >=200 && xhr.status < 300) {
                // let data = JSON.parse(xhr.response);
                // app.innerHTML = data.name + data.age;
                app.innerHTML = xhr.response.name
            }
        }
    }
}
```

==自动转换:==

在`open`之前设置接收的数据格式:`xhr.responseType = "json"`。接收的数据会自动转换为json格式

==手动转换==

在接收数据之后，通过`JSON.parse()`来转换



## Nodemon

用处：自动重启服务器			[nodemon网址](https://www.npmjs.com/package/nodemon)

安装：终端：`npm install -g nodemon`

使用nodemon来管理服务端:`nodemon server.js`



## IE缓存问题

IE会对Ajax请求缓存，导致更新之后，ie依然使用之前的ajax请求

解决方法：在请求URL上添加一个值

```
xhr.open("GET","http://127.0.0.1:8000/server?t="+Date.now())
```

这样每次请求都不一样，不会被缓存影响



## 请求超时和网络异常

超时响应：

```js
//1.创建对象
let xhr = new XMLHttpRequest();
//设置超时2s就触发超时回调函数
xhr.timeout = 2000;
//超时回调
xhr.ontimeout = function () {
    alert('网络超时，请重试');
}
```

网络出错响应

```js
//1.创建对象
let xhr = new XMLHttpRequest();
//网络出错
xhr.onerror = function () {
    alert('you new is not link');
}
```



## 手动取消Ajax请求

调用XMLHttpRequest创建的对象的`.abort()`方法，可以取消Ajax请求

```js
//1.创建对象
let xhr = new XMLHttpRequest();
.
.
btn.onclick = function(){
    xhr.abort()
}
```



## 多次Ajax请求处理

使用一个变量，来标识是否有`多个相同的`Ajax请求正在发送，如果有就停止上一个，再发送新的请求

```js
let xhr = null;
//定义标识
let inSending = false;

btn.onclick = function(){
    //如果标识为true则说明有请求正在发送，则停止他，并且再创建一个
    if(isSending === true){
        xhr.abort();
    }
    xhr = new XMLHttpRequest();
    //修改标识为正在发送
    isSending = true;
    xhr.open(...);
    xhr.send();
    xhr.onreadystatechange = function(){
        if(x.readyState === 4){
            //说明请求完成了，把标识修改为没有请求
            isSending = false;
        }
    }
}
```





# 5.JQuery发送AJAX请求

未学



# 6.axios发送AJAX请求

### 6.1	安装

终端：`npm install axios`

CDN页面链接：

`<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>`

速度更快的CND:网址	https://www.bootcdn.cn/axios/



### 需要跨域:

```js
    response.setHeader("Access-Control-Allow-Origin","*");
    response.setHeader("Access-Control-Allow-Headers","*");
```



### 6.2 发送请求

```js
//配置baseURL
// axios.defaults.baseURL = "http://127.0.0.1:8000";
btns[0].onclick = function () {
    axios.get("http://127.0.0.1:8000/axios-server",{
        //url参数
        params:{
            admin:"eric",
            pwd:"213055"
        },
        headers:{
            name:"atguigu",
            age:20
        }
    }).then(value =>{
        console.log(value);
    })
};
```

请求体要写在第二个参数位置



### 6.3 发送请求方式二

```js
 btns[1].onclick = function () {
     axios({
         //请求方法
         methods:'POST',
         //url
         url:'/server',
         //url参数
         params:{
             username:"zs",
             pwd:1234565
         },
         //头信息
         headers:{
             a:100,
             b:100
         },
         //请求体参数
         data:{
             username:"admin",
             password:"admin"
         }
     }).then(response=>{
         console.log(response);
     })
 }
```



# 7. fetch 发送Ajax请求

未学





# 8.同源策略

同源：`协议、域名、端口号`必须完全相同

违背同源策略就是跨域





# 9. JSONP

非官方的跨域解决方案，只支持get请求





# 10. CORS

官方的跨域解决方案

在服务器设置响应头，即可跨域

**`response.setHeader("Access-Control-Allow-Origin","*");`**

**`response.setHeader("Access-Control-Allow-Headers","*");`**
