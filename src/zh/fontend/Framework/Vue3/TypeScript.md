---
title: TypeScript
icon: markdown
category:
  - 前端
tag:
  - Js
  - Ts
---
# ""


# TypeScript是什么

* 以JS为基础构建的语言
* 一个JS的`超集`
* 可以在任何支持JS的平台中执行
* TS扩展了JS，并添加了类型
* ==TS不能被JS解析器直接执行，需要把TS代码编译为JS==



# TS增加了什么

* 类型
* 支持ES的新特性，并添加了新特性
* 丰富的配置选项



# TS使用

## 1. TS开发环境

使用npm全局安装ts

```
npm install -g typescript
```

安装完成后我们可以使用 **tsc** 命令来执行 TypeScript 的相关代码，以下是查看版本号：

```
tsc -v
Version 3.2.2
```

## 2. 创建TS文件

`ts_test.ts`

要想运行，需要先转为JS文件：

```
tsc ts_test.ts
```

会生成一个同名的.JS文件

注：如果TS代码报错，可以初始化ts

```
tsc --init
```



# TS类型

## 1. TS类型声明

给变量声明：

```ts
//把a声明为数值类型，之后不能复制其他类型的值
let a: number;

a = 10;	//不报错

a='hello';	//报错
//-----------------
let b: string = 'hello'

//-----------------
let c: boolean = true


//-------------------
//如果声明同时赋值，则TS会自动把值的类型当做变量的类型
let d = false

d = 123;	//报错
```

给方法声明：

```ts
function fun1(a:number,b:number) {
    return a + b
}

console.log(fun1(10,20));
console.log(fun1('10',20));	//报错
console.log(fun1(10,20,30));//报错
console.log(fun1(10));	//报错

//-------------------------
//给方法返回值声明类型
function fun2(a:number,b:number):number {
    return a + b
}
```



## 2. TS的类型

### 类型别名

```ts
//可以被类型起别名，在使用的时候，就可以直接使用别名
type myType = 1 | 2 | 3 | 4 | 5
let k:myType;	//变量k的类型和myTy一样
k = 1;
k = 5;
k = 10;//报错
```



### 普通类型

```ts
let a: string;
a = 'hi';
//-------------------------
let b:number;
b = 1;
//-------------------------
let c:boolean;
c = true;

```

### 字面量声明：

```ts
//使用字面量声明，类似于常量
let d: 10;
d = 10;
d = 11;//报错
let e: '男' | '女';//e的值只能是其中一个类型"|"，连接多个类型(联合类型)
e = '男'
e = '女'
let f:string | boolean	//可以是字符或布尔
```

### any类型:

```ts
//以下两种不常用
let g:any;	//表示任意类型，相当于关闭了ts的类型检测
let h;		//h类型就是any，没有类型没有值，就是any
g = 10;
g = 'hi';
g = true;
```

### unknown类型：

```ts
let i: unknown;	//类型未知，就是一个类型安全的any，尽量不要使用any，使用unknown
i = 10;
i = 'hi';
```

any类型和unknown类型给其他类型赋值：

```ts
//但是any类型的值可以赋值给任意类型，如：
let j: string;
j = g;	//就可以，g是any类型，j是string类型，此时，j也变成了any类型
j = i;	//报错，j是string类型，i是unknown类型，unknown不能赋值给其他类型
//可以使用’类型断言‘
//类型断言语法：
// 1. 变量 as 类型
// 2. <类型>变量
j = i as string;//类型断言，i之前是unknown类型，断言之后是string类型	
```

### void类型

```ts
//void表示空，以函数为例，表示没有返回值的函数
function fun():void {
}

//表示没有返回值，void返回的是空，never没有返回值
function fun():never {   
}
```

### object类型

```ts
let k: object;

//一般使用下面这个方式，指定k是一个对象，并且这个对象要包含指定的属性
//语法:{属性:属性值类型,属性?:属性值类型,...}
//在属性后加'?'，表示该属性可有可无
let k:{name:string,age?:number}
k = {name:'zs',age:18}

//[propName:string]:any		表示任意类型的属性，propName是变量名，可以随意修改
let l:{name:string,[propName:string]:any}
l={name:'zs',age:20,gender:'男'}	//name属性必须有，其他不做要求
```

### function类型

```ts
//语法：
//(形参:类型,形参:类型...)=>返回值类型

//表示m是一个函数，有两个参数，都是number类型，返回值是number类型
let m:(a:number,b:number)=>number;
```

### array类型

```ts
let n:string[]	//表示存储字符串类型的数组
n=['a','a','a','a']

//语法： 类型[]	或者	Array<类型>
let o:Array<number>;
o=[1,2,3]
```

### 元组类型

TS新增类型

```ts
//元组用于声明固定长度的数组
let p:[string,string];	//声明了元组，其中只能有两个元素，都是string类型
p=['a','b']
//语法:[类型，类型，类型...]
```

### 枚举类型

TS新增类型

```ts
//一般用于变量只有几个可选的值，如性别，可以使用枚举
enum Gender{
    Male,
    Female
}
let q:{name:string,gender:Gender}
i = {name:'zs',gender:Gender.Male}
```



# 编译

## 1. 自动编译文件

```
tsc xxx.ts -w
```

让TS编译器自动监视文件的变化，发生变化后自动编译

缺点，只能监视一个文件

## 2. 配置文件

`tsconfig.json`

有了配置文件，就可以全局编译:

```
tsc		编译目录下所有ts文件
```

```
tsc -w	编译所有ts文件，并监视
```



配置文件详细：

```json
{
    /*
    	"include" 指定哪些ts文件需要编译
    	路径：** 表示任意目录	* 表示任意文件
    */
    "include":["./src/**/*" ],
    /*
    	"exclude" 指定哪些ts文件不需要编译
    	以下实例表示不编译hello目录下的所有文件
    	默认值:['node_modules','bower_components','jspm_packages']
    */
    "exclude":["./src/hello/**/*"],
    /*
    	files表示指定编译哪些文件
    */
    "files":[
        '***.ts',
        '***.ts'
    ],
    /*
    	TS编译器选项
    */
    "compilerOptions":{
        /*
    		编译的ES版本
    		可选项： 'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'esnext'
    	*/
        "target":"es6",
        /*
            编译导入模块时导入方式
            可选项： 'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015', 'es2020', 'es2022', 'esnext', 'node16', 'nodenext'
        */
        "module":"es6",
        /*
            用来指定项目中要使用的库，一般不修改
            可选项： 'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'esnext', 'dom', 'dom.iterable', 'webworker', 
'webworker.importscripts', 'webworker.iterable', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays', 'es2018.asyncgenerator', 'es2018.asynciterable', 'es2018.intl', 'es2018.promise', 'es2018.regexp', 'es2019.array', 'es2019.object', 'es2019.string', 'es2019.symbol', 'es2020.bigint', 'es2020.date', 'es2020.promise', 'es2020.sharedmemory', 'es2020.string', 'es2020.symbol.wellknown', 'es2020.intl', 'es2020.number', 'es2021.promise', 'es2021.string', 'es2021.weakref', 'es2021.intl', 'es2022.array', 'es2022.error', 'es2022.intl', 'es2022.object', 'es2022.sharedmemory', 'es2022.string', 'esnext.array', 'esnext.symbol', 'esnext.asynciterable', 'esnext.intl', 'esnext.bigint', 'esnext.string', 'esnext.promise', 'esnext.weakref'.
        */
        "lib":[],
        /*
            用于指定编译之后文件所在目录
        */
        "outDir":"./dist",
        /*
            用于将编译的文件合并成一个文件
        */
        "outFile":"./dist/app.js",
        /*
           	是否对js文件进行编译，默认false
        */
        "allowJs":false,
        /*
           	检查js代码是否符合语法规范，默认false
        */
        "checkJs":false,
        /*
           	是否删除所有注释，默认false不删除
        */
        "removeComments":false,
        /*
           	编译之后不生成js文件，一般用于检错
        */
        "noEmit":false,
        /*
           	当有错误时，不生成编译后文件
        */
        "noEmitOnError":false,
        /*
           	生成的js文件，是否使用严格模式
        */
        "alwasyStrict":false,
        /*
			不允许隐式any类型，any类型必须声明
        */
        "noImplicitAny":false,
        /*
           	不允许不明确类型的this
        */
        "noImplicitThis":false,
        /*
           	严格检查空值null。将可能是null的变量报错
        */
        "strictNullChecks":false,
        /*
           	所有严格检查的总开关。为true时，上面几个检查都开启，反之亦然
        */
        "strict":false
    }
}
```



# webpack打包ts

## 1. 基础打包

安装依赖包：

```
npm i -D webpack webpack-cli typescript ts-loader
```

新建`webpack.config.js`配置文件：

```js
const path = require('path')

module.exports={
    entry:"./src/main.ts",
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"bundle.js"
    },

    module:{
        rules:[
            {
                test:/\.ts$/,
                use:'ts-loader',
                exclude:/node_modules/
            }
        ]
    }
}
```

新建目录：

`src/main.ts`

新建`tsconfig.json`配置文件

```json
{
  "compilerOptions": {
    "module": "es6",
    "target": "es6",
    "strict": true
  }
}
```

在`package.json`中，添加调试：

```json
"scripts": {
    "build":"webpack"
},
```

打包：

```
npm run build
```

## 2. 增强打包

安装各种loader和plugin，来增强打包的能力，详细需要看：

https://gitee.com/EricKiku/web/blob/master/Webpack/%E7%AC%94%E8%AE%B0/Webpack5.md

处理各种资源



# 面向对象

## 1. 类

创建一个类：

1. 类的属性

   * 类中直接定义的属性是`实例属性`，需要对象去访问，如：`name`属性

   * 类中使用`static`定义的属性是`静态属性`，可以用类去访问，如：`age`属性

   * 使用`readonly`定义的属性是`只读属性`，只能访问，不能修改

   * `static`和`readonly`可以一块：`static readonly 属性:类型

   ```js
   // 定义一个类
   class Person {
       name:string = 'zs';
       static age:number=20;
       readonly gender:string='男'
   }
   
   let person = new Person()
   
   console.log(person);
   console.log(person.name);
   console.log(Person.age);
   ```

2. 类的方法

   * 类的方法也有`static`，可以定义静态方法

   ```js
   // 定义一个类
   class Person {
       name:string = 'zs';
       satHello(){
           console.log('hello');
       }
   }
   let person = new Person()
   
   person.satHello()
   ```

3. 构造函数

   * 构造函数会在`对象创建时`调用
   * `this`就是指向当前的实例对象

   ```js
   // 定义一个类
   class Person {
       name:string;
       age:number;
   	//构造函数	
       constructor(name:string,age:number){
           this.name = name;
           this.age = age;
       }
   }
   let person = new Person("张三",20)
   let person1 = new Person("李四",20)
   console.log(person);
   console.log(person1);
   
   ```

   

## 2. 继承

把多个类的公共代码写在一个父类中，然后子类继承父类

* 子类继承父类之后，就相当于把父类里的所有属性和方法都写在子类中
* 子类继承之后，会拥有所有父类的方法和属性
* 子类可以直接添加父类中没有的方法，只属于该子类，其他子类无法使用
* 如果子类中添加了和父类`相同的方法`，则子类会覆盖掉父类的方法，称为`方法重写`

```js
// 定义一个父类
class Person {
    name:string;
    age:number;

    satHello(){
        console.log('hello');
    }

    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }
}
//创建子类，继承父类
class Student extends Person{
    //该子类独有的方法
    study(){
        console.log(`${this.name}在学习`);
    }
    //重写了父类的方法
    satHello(){
        console.log('我整在学习，不要打扰我');
    }
}
//创建子类，继承父类
class Teacher extends Person{

}

let stu = new Student('张三',20)
let teh = new Teacher('老刘',40)
console.log(stu);
console.log(teh);

stu.study()
```



## 3. super

代表的就是父类

一般多用于：如果在子类中重写了父类的构造器函数，则在子类的构造函数中必须写`super()`，来调用父类的构造函数

```js
// 定义一个父类
class Person {
    name:string;
    constructor(name:string){
        this.name = name;
    }
}
class Student extends Person{
    //子类特有的属性
    banji:string;
    //重写构造函数
    constructor(name:string,banji:string){
        //调用父类的构造函数，并且传参
        super(name)
        this.banji = banji
    }
}
let stu = new Student('张三','一年级')
console.log(stu);
```



## 4. 抽象类

* 如果想让一个类，只用于`被继承`，而不用于`创建实例`，则需要将该类定义为`抽象类`

* 抽象类不能用于创建实例，只能用于被继承
* 抽象类中可以写`抽象方法`，抽象方法没有`代码体`，仅有结构。也可以有非抽象的普通方法
* 子类继承父类时，必须重写父类的所有抽象方法

```js
// 定义一个抽象父类
abstract class Person {
    name:string;
    constructor(name:string){
        this.name = name;
    }
    //抽象方法，没有代码体，只有结构
    abstract sayHello():void;
}

class Student extends Person{
    banji:string;
    constructor(name:string,banji:string){
        super(name)
        this.banji = banji
    }
    //必须重写父类的抽象方法
    sayHello(): void {
        console.log('你好'); 
    }
}
let stu = new Student('张三','一年级')
stu.sayHello()

```



## 5. 接口

* 用于定义一个类的结构

* 定义一个类中应该包含哪些`属性和方法`

* 同时接口也可以当做类型声明去使用
* 接口中的所有属性都`不能有实际的值`
* 接口中的所有方法都是`抽象方法`
* 接口就是一个规范，必须符合这个规范，才可以在特定场景中使用
* 类使用`implements`来实现接口

```js
//定义一个接口
interface myInter{
    name:string;
    sayHello():void
}
class MyClass implements myInter{
    name: string;
    constructor(name:string){
        this.name = name
    }
    sayHello(){
        console.log('hello');
        
    }
}
```



## 6. 属性封装

* 如果不想让类中的属性被随意访问，就需要对属性进行私有声明`private`
* 属性默认的声明是`public`，可以随意被访问，包括继承的子类
* 属性的第三个声明是：`protected`，声明的属性只能在该类或子类中访问或修改
* 私有声明的属性不能被直接访问，需要`getter/setter`方法
* 获取属性值需要使用`属性.get***`，设置属性值需要使用`属性.set***`

```js
// 属性封装
class Animal{
    private name:string;
    private age:number;
    constructor(name:string,age:number){
        this.name = name;
        this.age = age
    }
    // getter方法
    getName(){
        return this.name
    }
    //setter方法
    setName(value:string){
        this.name = value
    }
}

let dog = new Animal('小黑',5);
dog.setName('小小黑')
console.log(dog.getName());
```

* 上述方式需要使用调用get或set方法去修改属性，还可以使用`get/set 方法名(){}`
* 这样只需要访问使用`get/set`方法定义的方法名即可
* 看似是访问的属性，实际上还是经过了`get/set`方法

```js
// 属性封装
class Animal{
    private _name:string;
    private age:number;
    constructor(name:string,age:number){
        this.name = name;
        this.age = age
    }
    // getter方法
    get name(){
        return this._name
    }
    //setter方法
    set name(value:string){
        this._name = value
    }
}
let dog = new Animal('小黑',5);
dog.name = '小小黑'	//直接访问name方法，就和访问属性用于，更接近原始的写法
console.log(dog.name);
```



# 泛型

* 在方法参数和返回值的类型不确定的时候，可以使用`泛型`

* 在方法名后使用`<>`指定泛型

* 在调用方法时，方法名后可以指定类型

  ```ts
  // 泛型
  function fun1<T>(a:T):T {
      return a
  }
  fun1<number>(10);
  fun1<string>('hello');
  ```

* 泛型可以同时指定多个

  ```js
  // 泛型
  function fun1<T,K>(a:T,b:K):T {
      return a
  }
  fun1<number,string>(10,'he');
  fun1<string,boolean>('hello',true);
  ```

* 泛型也可以是类或接口

* `fun1<Inter>`也可以`fun1<T extends Inter>`，意思是`T`类型实现接口

  ```js
  // 泛型
  //定义一个接口
  interface Inter{
      name:string;
  }
  function fun1<Inter>(a:Inter):Inter {
      return a
  }
  //传参时，必须满足接口的结构
  fun1<Inter>({name:'zs'});
  
  //类使用泛型
  class MyClass<T>{
      name:T;
      constructor(name:T){
          this.name = name
      }
  }
  ```

  
