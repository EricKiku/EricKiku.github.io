---
title: Html进阶
icon: html
category:
  - 前端
tag:
  - Html
---
# ""


# classList

可以返回DOM对象的`class`属性值，很方便的操作class

```html
<script>
    let app = document.getElementById('app')
    //classList.add 给class属性添加值
    app.classList.add('cl5')
    //classList.remove	给class属性删除值
    app.classList.remove('cl2')
    //togglt，如果没有就添加，如果有就删除
    app.classList.toggle('cl3')
    console.log(app.classList);
</script>
```

# dataset

可以获取和修改元素身上的`自定义属性：以data-*`格式的数据

```html
<body>
    <div id="app" data-btn-click="DIYClick"></div>

    <script>
        let app = document.getElementById('app')
        console.log(app.dataset.btnClick);
        app.dataset.btnClick = 'DIYClick2'
    </script>
</body>
```

# contenteditable

让元素内容可编辑

```html
<div id="app" contenteditable="true">
    可以编辑
</div>
```

# DOCTYPE

如果删掉第一行，那么就是`怪异模式`，否则就是`标准模式`

```html
<!DOCTYPE html>
```

# 语义化标签

#### （一） header

> 通常被放置在页面或者页面中某个区块元素的顶部，包含整个页面或者区块的标题、简介等信息，起到引导与导航的作用。

我们不但可以放置页面或者页面中某个区块的标题，还可以放置搜索表单、logo图片等元素，按照最新的W3C标准，我们还可以放置`<nav>`导航栏。

下面是一个使用`<header>`标签的网站头部实例：



```html
<header>
    ![](images/logo.png)
    <h1>**信息科技有限公司</h1>
</header>
```

需要注意的是，一个文档中可以包含一对或者一对以上的`<header>`标签。标签的位置是次要的，不一定非要显示在页面的上方，我们可以为任何需要的区块标签添加`<header>`元素，例如下面将要讲解的`<article>`、`<section>`等标签。

#### （二）nav

> 表示页面的导航，可以通过导航连接到网站的其他页面，或者当前页面的其它部分。

`<nav>`不但可以作为页面独立的导航区域存在，而且我们可以在`<header>`标签中使用。此外，`<nav>`标签还可以显示在侧边栏中。由此可见，一个页面之中可以有多个`<nav>`标签。

根据HTML5标准，`<nav>`标签只用于页面的主要导航部分。因为搜索引擎或者屏幕阅读器会根据`<nav>`标签来确定网站的主体内容，所以并不是任意一组超链接都适合放置在`<nav>`标签中,我们只要将主要的，基本的链接组放进`<nav>`即可,对于有辅助性的页脚链接则不推荐使用`<nav>`标签。

下面来看一个结合`<header>`标签的导航栏应用案例：



```html
<header>
   ![](images/logo.png)
   <h1>**信息科技有限公司</h1>
   <nav>
       <li><a href="#">首页</a></li>
       <li><a href="example.html">客户案例</a></li>
       <li><a href="service_one.html">技术服务</a></li>          
       <li><a href="aboutus_one.html">关于我们</a></li>
       <li><a href="connection.html">联系我们</a></li>
   </nav>
</header>
```

值得我们注意的是,HTML5规范不允许将`<nav>`标签嵌套在`<address>`标签中使用。

#### （三）aside

> 所包含的内容不是页面的主要内容、具有独立性，是对页面的补充。

`<aside>`一般使用在页面、文章的侧边栏、广告、友情链接等区域。

示例如下：



```html
<article>
   <h1>HTML5学习之语义化标签</h1>
   <p>....正文.....</p>
   <aside>
       <h2>什么是语义化标签</h2>
       <p>语义化标签就是......</p>
   </aside>
</article>
```

#### （四）footer

> 一般被放置在页面或者页面中某个区块的底部，包含版权信息、联系方式等信息。

跟`<header>`标签一样，`<footer>`标签的使用个数没有限制，可以在任意需要的区块底部使用。

示例如下：



```xml
<footer>
    <small>
        版权所有 © 2016-2017 **信息科技有限公司
    </small>
</footer>
```

#### （五）article

> 表示包含于一个文档、页面、应用程序或网站中的一段独立的内容，可以被独立的发布或者重新使用文章标记标签。

`<article>`元素应该使用在相对比较独立、完整的的内容区块，所以我们可以在一篇博客、一个论坛帖子、一篇新闻报道或者一个用户评论中使用`<article>`元素。通常情况下，一个`<article>`元素包括标题、正文和脚注。和`<nav>`标签一样，该标签同样不能用在`<address>`标签中；

示例如下：



```xml
<article>
   <h1>HTML5学习之语义化标签</h1>
   <p>....正文.....</p>
   <footer>版权所有*伪版必究</footer>
</article>
```

`<article>`标签还可以嵌套使用，但是它们必须是部分与整体的关系。例如在一篇发表的博客中，我们可以对读者评论使用`<article>`标签。

示例如下：



```html
<article>
   <h1>HTML5学习之语义化标签</h1>
   <p>....正文.....</p>
   <article>
       <header>
           <h2>读者评论</h2>
       </header>
       <article>
           <header>
               <h3>评论人：张三</h3>
               <p>评论时间：<time datetime="2017-01-17">2017-2-15 11:45:23</time></p>
           </header>
           <p>张三到此一游</p>
       </article>
   </article>
</article>
```

#### （六）section

> 是一个主题性的内容分组，通常用于对页面进行分块或者对文章等进行分段

`<section>`标签所包裹的是有一组相似的主题的内容，可以用这个标签来实现文章的章节、标签式对话框中的各种标签页等类似的功能。
 `<section>`通常包含一个头部`<header>`、可能还会包含一个尾部`<footer>`。
 示例如下：



```xml
<article>
    <h1>JavaScript框架</h1>
    <p>Javascript框架是指以Javascript语言为基础搭建的编程框架。</p>
    <section>
        <h2>angular.Js<h2>
        <p>angular.Js是一款优秀的前端JS框架</p>
    </section>
    <section>
        <h2>Vue.js<h2>
        <p>Vue.js是用于构建交互式的Web界面的库</p>
    </section>
    <section>
        <h2>Node.Js<h2>
        <p>Node.js就是运行在服务端的JavaScript</p>
    </section>
</article>
```

在这篇关于JS框架的文章中,所列举的三个框架都是文章主题构成的一部分，所以我们使用`<section>`标签对其进行分段。

我们不但可以在`<article>`标签中使用`<section>`标签，还可以在`<section>`标签中使用`<article>`标签。

示例如下：



```xml
<section>
    <h1>HTML5技术栈</h1>
    <p>广义而言的HTML5包含HTML、CSS和JavaScript三个部分</p>
    <article>
        <h2>HTML<h2>
        <p>内容</p>
    </article>
    <article>
        <h2>CSS<h2>
        <p>样式</p>
    </article>
    <article>
        <h2>JavaScript<h2>
        <p>行为</p>
    </article>
</section>
```

在这个例子中，`<section>`代表一段内容，在这段内容中，HTML、CSS、Javascript是三个完全独立的部分，因而我们使用`<article>`标签。

`<div>、<section>、<article>`三者的比较：

- `<div>`：应用广泛，只要我们想为一个区域定义一个样式或者为其添加JS行为，就可以使用div标签

- `<section>`：包含的内容是一个明确的主题，通常有标题区域

- `<article>`:如果我们的页面中需要一个单独的模块来实现一个单独的功能，就用`<article>`，其他的时候都用`<section>`。




# canvas

## 1.基本用法

### canvas画布

`<canvas>`是H5新增的元素，使用Js脚本来绘制图形

默认具有宽高是300px，150px

如果浏览器是旧版，如IE9之前的IE，不支持canvas元素，需要有一个替换内容。如果浏览器支持canvas元素，会忽略内容

```html
<canvas id="canvas">
    <span>您的浏览器不支持canvas，请切换浏览器</span>
</canvas>
```

### 属性

canvas只有两个属性：`width和height`

只能写在canvas标签体上，不能写在style标签中，因为写在style中会影响画出的图形的大小

### 渲染

canvas标签只是创造了一个画布，想要绘制需要在js里找到他的渲染上下文

canvas元素有一个叫做`getContext`的方法，用来获取渲染上下文和它的绘画功能，只有一个参数，上下文的格式：`"2d"、"3d"`

```html
<script>
    let can = document.getElementById('canvas')

    let ctx = can.getContext('2d')
</script>
```



## 2.绘制矩形

矩形是canvas唯一支持的原生图形

canvas提供了三种方法绘制矩形：


1. 绘制一个填充的矩形
   `fillRect(x,y,width,height)`
   x，y是偏移量，相对于画布左上角。width，height是宽高

   ```js
   ctx.fillRect(0,0,100,100)
   ```

2. 绘制一个矩形的边框
   `strokeRect(x,y,width,height)`
   x，y是偏移量，相对于画布左上角。width，height是宽高

   ```js
   ctx.strokeRect(100,100,100,100)
   ```

3. 清除指定矩形区域，让清除部分完全透明，其实就是盖了一层
   `clearRect(x,y,width,height)`
   x，y是偏移量，相对于画布左上角。width，height是宽高

   ```js
   ctx.clearRect(x,y,width,height)
   ```

4. 添加样式和颜色
   `fillStyle`：设置图形的填充颜色
   `strokeStyle`：设置图形轮廓的颜色
   `lineWidth`：设置当前绘线的粗细
   `lineJoin`：设定线条与线条接合处的样式

   ​							`round`：圆角
   ​							`bevel`：斜角

   ​							`miter`：直角

   ```js
   ctx.fillStyle="deeppink"
   ctx.strokeStyle='red'
   ctx.lineWidth=10;
   ctx.lineJoin="round"
   ```

   

## 3.绘制路径

​	

1. `moveTo(x，y)`
   将笔触移动到指定坐标，设置起点

2. `lineTo(x，y)`
   绘制一条从当前位置到指定x，y位置的直线

3. `closePath()`
   闭合路径之后图形绘制命令有重新指向到上下文中。
   闭合路径不是必须的，这个方法会通过绘制一条从当前点到开始点的直线来闭合图形

4. `stroke()`
   绘制线条

5. `fill()`

   绘制实心图形
