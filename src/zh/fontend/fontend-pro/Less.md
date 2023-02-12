---
title: Less
icon: less
category:
  - 前端
tag:
  - Js
  - Css
---
# ""


## Less

提高编写CSS的效率，最终编译为CSS代码

> 使用less

这行代码是嵌入到html文件中去编译Less代码，也可以通过其他软件预编译，就不再需要该代码

`<script src="https://cdn.jsdelivr.net/npm/less@4" ></script>`

在代码最后引入上面的代码，必须在引入CSS之后再引入这句话

> 预编译

`vs code`的插件`EASY LESS`可以自动生成与less文件对应的css文件

新建`.less`文件，以Less风格写CSS代码，使用`vs code`可以自动编译成`.css`文件,方便了管理和扩展，最后只要引入对应的`.css`文件就行了



Less之间可以导入，想要在一个less文件中使用另一个less文件中的变量啥的，需要导入

`@import "路径.less"`



##  :herb:注释

---

以`//`开头的注释，预编译之后	，在CSS文件中没有这个注释

以`/**/`包裹的注释会被编译到CSS文件中





## :herb:变量

----

使用`@`来声明一个变量，变量都是块级作用域，被大括号分隔

### 普通变量:

```less
@width: 10px;
@height: @width + 10px;

#header {
  width: @width;
  height: @height;
}
```

编译之后的CSS:

```css
#header {
  width: 10px;
  height: 20px;
}
```

### 属性变量

把一个变量的值设为一个选择器，或者一个属性,或者一个URL路径，就需要这样使用`@{变量名}`

less文件

```less
@head:#header;
@wid:width;

@{head} {
  @{wid}: 100px;
  height: 100px;
}
```

编译的CSS:

```css
#header {
  width: 100px;
  height: 100px;
}
```

### 变量的延迟加载

因为less的变量是块级作用域，在这个块中使用这个变量时，会等待该块代码全部执行完毕之后再赋值，也就是如果后面有使用的变量，则会使用后面的变量值

less:

```js
@value:0;
.class{
    @value:1;
    .box{
        @value:2;
        three:@value;
        @value:3;
    }
    one:@value;
}
```

CSS:

```css
.class {
  one: 1;
}
.class .box {
  three: 3;
}
```



## :herb:Less的嵌套规则

类似于HTML的嵌套，卸载内部的就是默认的子类，在选择器上会有一个`空格`，因为是子类

如果想让他作为兄弟元素，则需要在前加`&`,常用于`:hover、:after`等,就没有空格

less:

```less
box{
    background-color:red;
    &:hover{
         background-color:pink;
    }
}
```

CSS:

```css
box{
    background-color:red;
}
 box:hover{
    background-color:pink;
}
```



## :herb:混合

####  普通混合

当某个代码片段经常使用，比如一个特定的样式，就可以使用混合，将该代码片段定义在一个混合中，

> 定义混合:`.变量名{代码片段}`。如果不加括号，就会编译到css文件中，如果`.变量名(){}`就不会编译到css中
>
> 使用混合:`.变量名`，有括号时，加括号`.变量名()`

定义一个juzhong混合，然后给`#inner和#inner1`使用,在css文件中相当于把混合直接复制到指定位置

```less
.juzhong(){
    width: 200px;
    height: 200px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    background-color: blue;
}

#app{
    position: relative;
    width: 300px;
    height: 300px;
    margin: 0 auto;
    margin-top: 50px;
    background-color: aqua;
    #inner{
        .juzhong;
    }
    #inner1{
        .juzhong;
    }
}
```

#### 带参混合

定义混合时，可以在括号中传输参数，在使用时，也需要带参数使用

参数在代码块中直接当变量使用

```less
.juzhong(@width,@height,@color){....}

box{
    .juzhong(100px,100px,red);
}
```

#### 带默认值的参数混合

定义混合时，括号中的形参可以使用默认值，这样即是不传参也不会报错`@变量:默认值`

```less
.juzhong(@width:100px,@height:100px,@color:red);

box{
    .juzhong();
}
```

#### 命名参数

在使用混合时，可以指定该参数传给哪个形参.`.juzhong(@变量:值)`

```less
.juzhong(@w:100px,@h:100px,@c:red)

box{
    .juzhong(@c:pink);
}
```

#### 匹配模式混合

在调用一个混合时，会自动调用同一个名字的混合，并且第一个参数是`@_`的混合。

不管调用哪个混合，都会调用同名且参数第一个是`@_`的混合

L,R是匹配标识，在调用时，直接`.mixin(L/R,..)`就可以调用指定的混合

```less
.mixin(@_){}

.mixin(L,@h,@c){}

.mixin(R,@h,@bo){}
```



#### arguments混合

和js里的`arguments`一样，保存的是实参列表，传输的实参不传给形参也可以使用，是一个伪数组

```less
.border(@1,@2,@3){
    border:@arguments
}

#box{
    .border(1px,solid,red);
}
```

css:

```css
box{
    border:1px solid red
}
```



## :herb:运算

less运算时，只要有一个值带单位就可以计算

```less
box{
    width:(100 + 100px);
}
```

CSS:

```css
.box1 {
  width: 200px;
}
```



没有看完的

https://www.bilibili.com/video/BV1YW411T7vd?p=6&spm_id_from=pageDriver&vd_source=4826e78be6a985a9a8641312e495221e

怀疑少集