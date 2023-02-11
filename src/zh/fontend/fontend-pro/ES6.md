---
title: ES6
icon: markdown
category:
  - 前端
tag:
  - Js
  - NodeJs
  - ES6
---
# ""


## ES6 入门网址

https://es6.ruanyifeng.com/

##  `let`

​	用于变量声明，具有块级作用域，也就是在大括号中有块级作用域，而`var`没有这个特点

* 不存在变量提升

* 块级作用域

* 具有暂时性死去

* 不能重复声明

* ```js
  var num = 10;
  if(true){
      console.log(num);
      let num = 20;
  }
  //num is not defined
  ```

​	面试题:

```js
var arr = [];
for(var i =0; i < 2;i++){
    arr[i] = function(){
        console.log(i);
    }
}
arr[0]();
arr[1]();
//0 0
```

​	面试题

```js
let arr = [];
for(let i =0; i < 2;i++){
    arr[i] = function(){
        console.log(i);
    }
} 
arr[0]();
arr[1]();
//0 1
```



## `const`

  1. 声明一个常量
  2. 定义时必须要赋值
  3. 一般常量需要大写
  4. 定义的值不能修改
  5. 具有块级作用域
  6. 用const定义的数组，对象，内容可以发生改变



## `解构赋值`

ES6 允许按照一定的模式从数组和对象中提取值，对变量进行赋值，被称为`解构赋值`

数组：

```js
const arr = ['张三','李四'];
let [zs,lisi] = arr;
log(zs);	//张三
log(lisi);  //李四
```

对象

```js
const person = {
    name:'张三',
    age:21
}
let {naem,age} = person;
log(name);  //张三
log(age);	//21
```



## `模板字符串[``]`

新的声明字符串的方法：单引号==``==

```js
let str = `我是字符串`
```

优势：

  1. 可以直接出现换行符

  ```js
  let str = `
  			<div>
  			</div>
  		  `
  ```

  2. 变量拼接`${}`

  ```js
  let str = '我是人，叫';
  let str1 = `${str}张三`
  ```



## `简化对象和方法写法`

  1. 可以直接在对象中，写入变量和函数

  ```js
  let name = "张三";
  let sayHello = function(){
      log('hello')
  }
  
  const person = {
      name,
      sayHello
  }
  ```

  ```js
  let person = {
      name,
      skill(){
          log('我会打代码')
      }
  }
  ```



## `箭头函数`

​	ES6允许使用箭头来定义函数`()=>{}`

```js
let fn = (a,b)=>{
    return a+b 
}
```

特性：

  1. `this`是静态的，始终指向函数声明时所在的作用域下的`this`

  ```js
  function fun1(){
      log(this.name)
  }
  let fun2 = ()=>{
      log(this.name)
  }
  window.name = "window.name"
  const person = {
      name:"张三"
  }
  
  fun1.call(person);	//张三
  fun2.call(person);	//window.name
  ```

  2. 不能作为构造函数使用

  3. 不能使用`arguments`获取实参变量伪数组

  4. 箭头函数简写

  ```js
  //当形参有且只有一个的时候，可以省略小括号
  let fun1 = name =>{
      return log(name);
  }
  
  //当代码体只有一条语句时，可以省略大括号,并且执行结果就是函数的返回值
  let fun2 = n =>  n * n
  ```

  5. 箭头函数需求：

  ```js
  //从数组返回偶数的元素
  let arr = [2,3,4,5,6]
  let result = arr.filter(item => item % 2 === 0)
  log(result)
  ```

  6. 箭头函数适合与`this`无关的回调，如定时器、数组的方法

  7. 不适合与`this`有关的回调，事件回调，对象的方法



## `函数参数默认值`

​	ES6允许给函数参数赋值初始值

  1. **形参初始值，具有默认值的参数，一般放在最后**

  ```js
  function fun1(a,b,c=10){
      return a+b+c
  }
  ```

  2. **可以与结构赋值结合**

  ```js
  function fun({host,username,password,port='8080'}){
      log(host);
      log(username);
      log(password);
      log(port);    
  }
  
  let local = {
      host:'localhost',
      username:'root',
      password:'123456',
      port:3306
  }
  fun(local);
  ```



## `rest参数`

​	1.用来获取函数的实参，代替`arguments`，如果前面有多个参数，`rest参数`必须放在形参最后

```js
function date(...args){
    log(args);			//one two three
}

date('one','two','three');	
```



## `扩展运算符`

​	把一个`数组`转换为一个`逗号`分隔的`参数序列`。就相当于把数组的中括号给去掉了

```js
const tfboys = ['易烊千玺','王俊凯','王源'];

function tf(){
    log(arguments);		//'易烊千玺','王俊凯','王源'	,不是一个数组
}

tf(...tfboys);//把数组拆分成三个单独的字符串，当做实参传递
```

1. 应用：数组的合并

```js
const arr1 = ['赵四','刘能'];
const arr2 = ['王宝强','宋小宝'];

const arrAll = [...arr1,...arr2];	//就合并在一块了
```

2. 数组的克隆

```js
const arr = ['A','B','C'];

const arr1 = [...arr];		//这样arr1的值就和arr一模一样
```

3. 将伪数组转换为真正的数组

```js
let divs = document.querySelectorAll('div');		//得到一个伪数组

let divArr = [...divs];		//把伪数组转换成为真数组
```





## `symbol`
