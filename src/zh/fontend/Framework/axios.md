---
title: Axios
icon: aJax
category:
  - 前端
tag:
  - Js
  - Ajax
---
# ""


## 1.  JSON-Server

文档：	https://github.com/typicode/json-server

可以很快的创建http服务，无须编写代码

```
npm install -g json-server
```

### 2. 创建`db.json`文件

```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

### 3.启动服务

启动服务的目录，必须是`db.json`所在的目录

```
json-server --watch db.json
```

启动之后可以通过提示的URL来访问



## 2. axios

文档：https://www.axios-http.cn/docs/intro

Axios 是一个基于 promise 的网络请求库，可以用于浏览器和 node.js

### 特性

- 从浏览器创建 [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- 从 node.js 创建 [http](http://nodejs.org/api/http.html) 请求
- 支持 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- 拦截请求和响应
- 转换请求和响应数据
- 取消请求
- 自动转换JSON数据
- 客户端支持防御[XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)

### 安装

使用 npm:

```bash
$ npm install axios
```

使用 yarn:

```bash
$ yarn add axios
```

使用 jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

使用 unpkg CDN:

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```



### 基本使用

`axios`中的参数：

`method`：请求的类型，可以是`GET、POST、PUT、DELETE`

`url`：请求的路径

`data`：请求体



`axios`返回的是一个`Promise`对象，所以可以用`.then()`来接收回调的结果

`then`的参数`response`包含了很多参数，其中`data`是响应体，用来获取服务器返回的数据

```js
post.addEventListener('click',function () {
    axios({
        //请求类型
        method: 'POST',
        //请求URL
        url:' http://localhost:3000/posts',
        //设置请求体
        data:{
            title:"我是一片文章",
            author:"EircKiku"
        }
    }).then(response=>{
        console.log(response);
    })
})
```





### 其他发送方式

##### axios.request(config)

```js
get.addEventListener('click',function () {
    axios.request({
        method:'GET',
        url:' http://localhost:3000/posts',
    }).then(response=>{
        console.log(response);
    })
})
```

##### axios.get(url[, config])

##### axios.delete(url[, config])

##### axios.head(url[, config])

##### axios.options(url[, config])

##### axios.post(url[, data[, config]])

```js
post.addEventListener('click',function () {
    axios.post(
        'http://localhost:3000/comments',
        {
            "body":"你真是666啊",
            "postId":2
        }).then(res=>{
        console.log(res);
    })
})
```

##### axios.put(url[, data[, config]])

##### axios.patch(url[, data[, config]])



### 配置config

基本上每个axios发送的参数中，都有`config`配置对象，配置对象大概有以下参数：

这些是创建请求时可以用的配置选项。只有 `url` 是必需的。如果没有指定 `method`，请求将默认使用 `GET` 方法。

网址：https://www.axios-http.cn/docs/req_config



### 默认配置

可以把一些重复的配置写在`全局默认配置`中

```js
axios.defaults.method = 'GET';
axios.defaults.baseURL = 'http://localhost:3000'
get.addEventListener('click',function () {
    axios.request({
        url:'/posts',
    }).then(response=>{
        console.log(response);
    })
})
```



### 创建实例对象

默认配置只能为一个协议，域名，做默认配置，让他变得简单，但是多个协议，域名就不可以，需要用到`实例对象`

实例对象创建方法：

```js
const 对象名 = axios.create({
    //该对象的默认的配置
    //如基本URL
    baseURL:'https://api.apiopen.top,
    //超时时间
    timeout:2000
})
```

可以创建多个对象，用来给多个不同的路径配置默认值

实例对象的使用：

```js
duanzi({
    url:'/getJoke'
}).then(res=>{
    console.log(res);
})
```





## 拦截器

在请求或响应被 then 或 catch 处理前拦截它们。

`axios.interceptors.request`的`use`方法有两个回调函数，一个成功，一个失败

如果请求拦截器成功的返回值是失败的Promise，则响应拦截器也会走失败的回调，自己的请求回调也会走失败的Promise

### 请求拦截器

多个请求拦截器时，靠后的先执行，然后向上执行

其中，参数`config`就是请求对象的配置，可以对配置进行修改

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
```



### 响应拦截器

多个响应拦截器时，靠前的先执行，向下执行其他的

参数`response`就是服务器返回的对象，有头，请求体，请求状态，如果想在自己的请求回调中直接处理请求体，则在响应拦截器中可以返回`response.data`，这样，自己的回调获取的直接就是请求体

```js
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```



## axios取消请求

### CancelToken `deprecated`

您可以使用 *cancel token* 取消一个请求。

1. 先在请求配置对象中添加属性`cancelToken`，值为`new axios.CancelToken(c=>{})`
2. 在创建全局变量，在第一部的属性的值的回调函数中把这个变量的值赋为形参`c`
3. 在全局中，调用第二部的变量，即可取消请求

```js
//2.声明全局变量
let cancel = null;
get.addEventListener('click',function () {
    axios.request({
        url:'/posts',
        //1.添加配置对象的属性cancleToken
        cancelToken:new axios.CancelToken(c=>{
            cancel = c;
        })
    }).then(response=>{
        console.log(response);
    })
})
//3.点击取消请求
cancleBtn.addEventListener('click',function () {
    cancel();
})
```



通常用户多次点击时，需要取消上一次的请求

```js
//2.声明全局变量
let cancel = null;
get.addEventListener('click',function () {
    //检测上一个请求是否完成
    if(cancel !== null){
        //取消上一次的请求
        cancel()
    }
    axios.request({
        url:'/posts',
        //1.添加配置对象的属性cancleToken
        cancelToken:new axios.CancelToken(c=>{
            cancel = c;
        })
    }).then(response=>{
        //请求完成时，把cancel初始化
        cancel = null;
        console.log(response);
    })
})
//3.点击取消请求
cancleBtn.addEventListener('click',function () {
    cancel();
})
```





## 源码

