---
title: Vue3
icon: markdown
category:
  - 前端
  - 框架
tag:
  - Vue
  - Vue3
---
# ""


# Vue3介绍

## 1. vue3与vue2区别

[Vue3与Vue2区别](https://blog.csdn.net/qq1195566313/article/details/122768533?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522167498039216800188535215%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=167498039216800188535215&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~pc_rank_34-7-122768533-null-null.142^v71^pc_new_rank,201^v4^add_ask&utm_term=%E5%B0%8F%E6%BB%A1vue3&spm=1018.2226.3001.4187)

## 2. vue3官网

[Vue3](https://cn.vuejs.org/guide/introduction.html)

# 创建Vue3项目

### 1.使用 vite 创建

```powershell
$ npm init vite@latest 	
```

之后，输入项目名称、选择框架、选择语言。

创建完成

完成之后，需要运行一下命令来安装包

```powershell
$ npm install
```



### 2.使用Vue脚手架创建

```powershell
$ npm init vue@latest
```

之后，输入项目名称、选择若干个插件或依赖是否需要

创建完成

完成之后，也需要运行一下命令来安装所有包

```powershell
$ npm install
```



# 目录、插件

认识使用vite创建的项目的目录

1. 首先就是和v2一样的目录
2. `vite-env-d.ts`：让ts认识.vue后缀
3. `index.html`：vite项目的入口文件
4. `tsconfig.json`：ts配置文件
5. `vite.config.ts`：vite配置文件



在.vue文件中:

* `<template>`只能写一组
* `<script setup>`只能写一组，不带setup可以多组
* `<style>`可以写多组



插件

`Vetur`：写vue2时，使用

`Volar`：写vue3时，使用，使用时，关闭`Vetur`

`TypeScript Vue Plugin(Volar)`：vue3的ts插件



# vue语法

vue3文件格式

```vue
<template>
  <div>
    {{ msg }}
    <button @click="addMsg">点我加1</button>
  </div>
</template>

<script setup lang="ts">
  const msg:number = 1
    
  const addMsg = ()=>{
    msg += 1;
  }
</script>

<style scoped>
</style>
```



语法大部分同vue2一样

## v-bind

v-bind有些特殊，可以在style中使用，可以使用script中的变量值

```vue
<script setup lang='ts'>
let color = "red"
</script>
<style scoped lang='less'>
.box{
    background-color: v-bind(color);
}
</style>
```







# ref 系列

只有被ref修饰的才是响应式对象，就和v2中写在data选项中一样

Vue3的响应式不是`Object.defineProperty()`实现的，是通过`Proxy`实现的。

使用ref或reactive包裹的对象，变成响应式时，是变成了Proxy对象

`ref`基本用法

```vue
<script setup lang="ts">
import { ref } from 'vue'	//必须先引入ref

let p = ref({ name: 'zs' })
const addMsg = () => {
  p.value.name = "lisi"
}
</script>
```



`isRef`

```vue
<script setup lang="ts">
import { ref,isRef } from 'vue'	//依旧先引入

let p1 = ref({ name: 'zs' })
let p2 = {name:'王五'}

const fun = () => {
  p1.value.name = "lisi"
  console.log(isRef(p1));	//是ref包裹的对象，返回true
  console.log(isRef(p2));	//返回false
}
</script>
```



`shallowRef`

浅层气ref，对象中的属性变化时，不会对页面刷新响应，只有对象变化了，才会响应页面。

```vue	
<script setup lang="ts">
import { shallowRef } from 'vue'	//先引入

let p1 = shallowRef({ name: 'zs' })	//使用shallowRef

const fun = () => {
  p1.value.name = "lisi"	//修改属性时，页面不改变
  p1.value = {	//修改整个对象，页面改变
    name:'lisi'
  }
}
</script>
```

:bulb:：`ref`和`shallowRef`不可一个代码块写，ref会影响shallowRef，使得shallowRef也会更新属性变化时的页面。原理是因为ref的底层调用了`triggerRef`

```vue
<script setup lang="ts">
import { shallowRef } from 'vue'

let p1 = shallowRef({ name: 'zs' })	//使用shallowRef
let p2 = ref({ name: 'zs' })	//使用ref
const fun = () => {
  p2.value.name = "lisi"	//ref起作用了
  p1.value.name = "lisi"	//shallowRef被影响了，改变视图

}
</script>
```





:bulb:：小技巧

1. 可以在Chrome浏览器的调试窗口的设置
   找到==启用自定义格式设置工具==
   这样输出Ref的对象时，会直接显示该对象的value属性，省去其他没有用处的内部属性

2. 在标签身上加ref属性，可以直接获取到该dom元素

   ```vue
   <template>
   	<!--在标签上添加ref属性，值随意-->
   	<button ref="btn" @click="fun">点我加1</button>
   </template>
   
   <script setup lang="ts">
   import { ref,isRef,shallowRef } from 'vue'
   //定义变量时，必须等于标签上ref的值
   //给ref添加泛型，可以让编码工具提示想赢代码
   let btn = ref<HTMLElement>()
   
   const fun = () => {
     //btn是真实dom。btn.value是dom元素。
     console.log(btn.value?.innerHTML);
   }
   </script>
   ```

   

# reactive 系列

`reactive`基础

reactive和ref一样，但是ref可以包裹所有类型，reactive只能包裹引用类型，如Array，Object，Map，Set

```vue
<template>
  <div>
    <input v-model="obj.name"/>
    {{ obj.name }}
  </div>
</template>

<script setup lang="ts">
import { ref,reactive } from 'vue'

const obj = reactive({name:'zs'})
</script>
```

:bulb:：不能直接给reactive创建的对象赋值。如果把reactive对象赋值，就会使reactive失效。

数组可以使用`.push()`追加数据

```vue
<template>
  <div>
    <input v-model="obj.name"/>
    {{ obj.name }}
  </div>
</template>

<script setup lang="ts">
import { ref,reactive } from 'vue'

const obj = reactive({name:'zs'})
let obj1 = {name:"zs"};
obj = obj1;	//就是把reactive的对象直接覆盖了，响应式就没了

</script>
```



`readonly`

让对象只读，不能修改

```vue
<script setup lang="ts">
import { ref,reactive,readonly } from 'vue'

const obj = reactive({name:'zs'})
let read = readonly(obj)
read.name = "lisi"	//报错，因为read只读
</script>
```



`shallowReactive`

同shallowRef一样，修改深层属性时，数据会改变，但是页面不会改变



# to

`toRef`

提取出来`响应式对象`中的某个属性，对于`非响应式对象`毫无用处。

使用这个方式提取出来的属性在发生变化时，源数据也会变化。

源数据变化时，提取的属性值，也会发生变化。

`toRef(源对象,源对象中的键)`

```vue
<script setup lang="ts">
import { toRef,reactive } from 'vue'
//使用reactive定义数据
let obj = reactive({
  num:1
})
//使用toRef来同步obj的某个属性
let numRef = toRef(obj,'num')

// numRef改变
numRef.value++;
console.log(obj); //obj.num 的值是 2
// obj改变
obj.num = 3;
console.log(numRef);
</script>
```



`toRefs`

```vue
<script setup lang="ts">
import { toRef,reactive,toRefs } from 'vue'

let obj = reactive({
  num:1,
  msg:2
})

//使用结构赋值，和toRefs，可以把一个对象中的所有属性变为ref对象
let {num,msg} = toRefs(obj)

console.log(num,msg);

</script>
```



`toRaw`

让一个响应式对象，变为非响应式对象

`toRaw()` 可以返回由 [`reactive()`](https://cn.vuejs.org/api/reactivity-core.html#reactive)、[`readonly()`](https://cn.vuejs.org/api/reactivity-core.html#readonly)、[`shallowReactive()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 或者 [`shallowReadonly()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreadonly) 创建的代理对应的原始对象。

```vue
<script setup lang="ts">
import { toRef,reactive,toRefs } from 'vue'

let obj = reactive({
  num:1,
  msg:2
})

toRaw(obj)	//变成一个普通对象


</script>
```



# computed

计算属性

使用方法1：回调函数

```vue
<script setup lang="ts">
import { ref,computed } from 'vue'

let firstName = ref('张')
let lastName = ref('三')

let fullName = computed(()=>{
  return firstName.value+lastName.value;
})
</script>
```

使用方法2：配置对象

```vue
<script setup lang="ts">
import { ref,computed } from 'vue'

let firstName = ref('张')
let lastName = ref('三')

let fullName = computed({
  get(){
    return firstName.value+lastName.value;
  },set(){
    firstName.value+lastName.value;
  }
})
</script>
```



# watch

侦听方法

`watch(属性,回调函数,配置项)`

配置项有：

deep:true	深度侦听

immediate:true	 立即执行一次

flush:"pre"	pre组件更新之前调用，sync同步执行，post组件更新之后执行

侦听一个普通类型

```vue
<template>
  <div>
      <input type="text" v-model="msg"/>
  </div>
</template>

<script setup lang="ts">
import { ref,computed,watch } from 'vue'

let msg = ref('erickiku')
//msg发生改变时，触发回调函数
watch(msg,(newV,oldV)=>{
  console.log(newV,oldV);
});
</script>
```



侦听多个普通类型

```vue
<script setup lang="ts">
import { ref,computed,watch } from 'vue'

let msg = ref('erickiku')

let msg2 = ref('erickiku')

//这时,newV和oldV分别是一个数组，对应这两个属性
watch([msg,msg2],(newV,oldV)=>{
  console.log(newV,oldV);
});
</script>
```



侦听对象中的属性

使用回调函数形式，返回属性的值，来进行侦听



```vue
<script setup lang="ts">
import { ref,computed,watch,reactive } from 'vue'

let msg = reactive({name:'zs'})

//
watch(()=>msg.name,(newV,oldV)=>{
  console.log(newV,oldV);
},{deep:true,immediate:true});	//可以在第三个参数开启深度侦听和立即执行一次
</script>
```



`watchEffect`

[官网中的watchEffect](https://cn.vuejs.org/api/reactivity-core.html#watcheffect)

不需要指定侦听的属性，在回调函数中，只要出现的属性变化了，就会执行回调

```vue
<script setup lang="ts">
import { ref,computed,watch,reactive,watchEffect } from 'vue'

let msg = ref('msg')	//修改时会触发侦听
let msg1 = ref('msg2')	//修改不会触发侦听

watchEffect(()=>{
  console.log(msg);
})
</script>
```

:bulb:：watchEffect的回调中，第一个参数可以有，可以是一个函数，函数名随意，在触发侦听的回调代码之前，先运行这个函数

```js
watchEffect((before)=>{
  console.log(msg);
  before(()=>{
    console.log("before");	//即是是在输出msg之后，侦听调用时也在最前
  })
})
```

停止侦听：

watchEffect会返回一个停止函数

```vue
<script setup lang="ts">
import { ref,computed,watch,reactive,watchEffect } from 'vue'

let msg = ref('msg')	//修改时会触发侦听
let msg1 = ref('msg2')	//修改不会触发侦听

let stop = watchEffect(()=>{
  console.log(msg);
})

stop()	//调用stop方法，侦听就失效了
</script>
```



# 组件与生命周期

vue3的组件写好之后，在其他地方使用import引用之后，就可以直接使用，不需要使用components注册

[生命周期](https://cn.vuejs.org/api/composition-api-lifecycle.html)

* `setup`最先触发
* `onBeforeMount(()=>{})`：创建之前
  这个时候获取元素是undefined
* `onMounted(()=>{})`：创建
  可以读取到dom元素
* `onBeforeUpdate(()=>{})`：更新之前
  获取dom元素时，获取的是更新之前的dom
* `onUpdated(()=>{})`：更新
  获取到更新之后的dom
* `onBeforeUnmount(()=>{})`：销毁之前
* `onUnmounted(()=>{})`：销毁
* `onRenderTracked(()=>{e})`
* `onRenderTriggered(()=>{e})`



# 布局

使用less，并且清除默认样式，reset.css

## 一个布局代码

`layout.vue`

```vue
<template>
  <div class="layout">
    <Menu></Menu>
    <div class="layout-right">
      <Header></Header>
      <Content></Content>
    </div>
  </div>
</template>

<script setup lang='ts'>
import Content from './Content/index.vue'
import Header from './Header/index.vue'
import Menu from './Menu/index.vue'
</script>
<style scoped lang='less'>
.layout{
  display: flex;
  height: 100%;
  overflow: hidden;
  &-right{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
```

`Header.vue`

```vue
<template>
  <div class="header">Header</div>
</template>

<script setup lang='ts'>
</script>
<style scoped lang='less'>
.header{
  height: 60px;
  border-bottom: 1px solid #ccc;
}
</style>
```

`Menu.vue`

```vue
<template>
  <div class="menu">
    Menu
  </div>
</template>

<script setup lang='ts'>
</script>
<style scoped lang='less'>
.menu {
  width: 200px;
  border-right: 1px solid #ccc;
}
</style>
```

`Content.vue`

```vue
<template>
  <div class="content">
    <div class="content-items" v-for="item in 100" :key="item">
      {{ item }}
    </div>
  </div>
</template>

<script setup lang='ts'>
</script>
<style scoped lang='less'>
.content{
  flex:1;
  margin: 20px;
  border: 1px solid #ccc;
  overflow: auto;
  &-items{
    padding: 20px;
    border: 1px solid #ccc;
  }
}
</style>
```



## Flex 布局语法教程

### *分类* [编程技术](https://www.runoob.com/w3cnote_genre/code)

网页布局（layout）是CSS的一个重点应用。

![img](https://www.runoob.com/wp-content/uploads/2015/07/7bf8bed24a17fbebd3e171f9630dbccb.gif)

布局的传统解决方案，基于[盒状模型](https://developer.mozilla.org/en-US/docs/Web/CSS/box_model)，依赖 [display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)属性 + [position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)属性 + [float](https://developer.mozilla.org/en-US/docs/Web/CSS/float)属性。它对于那些特殊布局非常不方便，比如，[垂直居中](https://css-tricks.com/centering-css-complete-guide/)就不容易实现。

![img](https://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png)

2009年，W3C提出了一种新的方案—-Flex布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。

![img](https://www.runoob.com/wp-content/uploads/2015/07/8712d713c7d0b884a5cb9770efc422b4.jpg)

Flex布局将成为未来布局的首选方案。本文介绍Flex布局的语法。

以下内容主要参考了下面两篇文章：[A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) 和 [A Visual Guide to CSS3 Flexbox Properties](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties)。

## 一、Flex布局是什么？

Flex是Flexible Box的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为Flex布局。

```
.box{
  display: flex;
}
```

行内元素也可以使用Flex布局。

```
.box{
  display: inline-flex;
}
```

Webkit内核的浏览器，必须加上-webkit前缀。

```
.box{
  display: -webkit-flex; /* Safari */
  display: flex;
}
```

注意，设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。

## 二、基本概念

采用Flex布局的元素，称为Flex容器（flex container），简称”容器”。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称”项目”。

![img](https://www.runoob.com/wp-content/uploads/2015/07/3791e575c48b3698be6a94ae1dbff79d.png)

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

## 三、容器的属性

以下6个属性设置在容器上。

> - flex-direction
> - flex-wrap
> - flex-flow
> - justify-content
> - align-items
> - align-content

### 3.1 flex-direction属性

flex-direction属性决定主轴的方向（即项目的排列方向）。

```
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

![img](https://www.runoob.com/wp-content/uploads/2015/07/0cbe5f8268121114e87d0546e53cda6e.png)

它可能有4个值。

> - row（默认值）：主轴为水平方向，起点在左端。
> - row-reverse：主轴为水平方向，起点在右端。
> - column：主轴为垂直方向，起点在上沿。
> - column-reverse：主轴为垂直方向，起点在下沿。

### 3.2 flex-wrap属性

默认情况下，项目都排在一条线（又称”轴线”）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。

![img](https://www.runoob.com/wp-content/uploads/2015/07/903d5b7df55779c03f2687a7d4d6bcea.png)

```
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

它可能取三个值。

（1）nowrap（默认）：不换行。

![img](https://www.runoob.com/wp-content/uploads/2015/07/9da1f23965756568b4c6ea7124db7b9a.png)

（2）wrap：换行，第一行在上方。

![img](https://www.runoob.com/wp-content/uploads/2015/07/3c6b3c8b8fe5e26bca6fb57538cf72d9.jpg)

（3）wrap-reverse：换行，第一行在下方。

![img](https://www.runoob.com/wp-content/uploads/2015/07/fb4cf2bab8b6b744b64f6d7a99cd577c.jpg)

### 3.3 flex-flow

flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。

```
.box {
  flex-flow: <flex-direction> <flex-wrap>;
}
```

### 3.4 justify-content属性

justify-content属性定义了项目在主轴上的对齐方式。

```
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

![img](https://www.runoob.com/wp-content/uploads/2015/07/c55dfe8e3422458b50e985552ef13ba5.png)

它可能取5个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。

> - flex-start（默认值）：左对齐
> - flex-end：右对齐
> - center： 居中
> - space-between：两端对齐，项目之间的间隔都相等。
> - space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

### 3.5 align-items属性

align-items属性定义项目在交叉轴上如何对齐。

```
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

![img](https://www.runoob.com/wp-content/uploads/2015/07/2b0c39c7e7a80d5a784c8c2ca63cde17.png)

它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。

> - flex-start：交叉轴的起点对齐。
> - flex-end：交叉轴的终点对齐。
> - center：交叉轴的中点对齐。
> - baseline: 项目的第一行文字的基线对齐。
> - stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

### 3.6 align-content属性

align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

```
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

![img](https://www.runoob.com/wp-content/uploads/2015/07/f10918ccb8a13247c9d47715a2bd2c33.png)

该属性可能取6个值。

> - flex-start：与交叉轴的起点对齐。
> - flex-end：与交叉轴的终点对齐。
> - center：与交叉轴的中点对齐。
> - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
> - space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
> - stretch（默认值）：轴线占满整个交叉轴。

### 四、项目的属性

以下6个属性设置在项目上。

> - order
> - flex-grow
> - flex-shrink
> - flex-basis
> - flex
> - align-self

### 4.1 order属性

order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```
.item {
  order: <integer>;
}
```

![img](https://www.runoob.com/wp-content/uploads/2015/07/59e399c72daafcfcc20ede36bf32f266.png)

### 4.2 flex-grow属性

flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

```
.item {
  flex-grow: <number>; /* default 0 */
}
```

![img](https://www.runoob.com/wp-content/uploads/2015/07/f41c08bb35962ed79e7686f735d6cd78.png)

如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

### 4.3 flex-shrink属性

flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

```
.item {
  flex-shrink: <number>; /* default 1 */
}
```

![img](https://www.runoob.com/wp-content/uploads/2015/07/240d3e960043a729bb3ff5e34987904f.jpg)

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效。

### 4.4 flex-basis属性

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

```
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

### 4.5 flex属性

flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

```
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

### 4.6 align-self属性

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

```
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

![img](https://www.runoob.com/wp-content/uploads/2015/07/55b19171b8b6b9487d717bf2ecbba6de.png)

该属性可能取6个值，除了auto，其他都与align-items属性完全一致。



# 父子组件传参

父子组件传参使用`define***`系列

## 父->子

`defineProps`

`父组件`

在子组件标签上使用v-bind的简写：来定义要传递的属性名，值就是要传递的值

```vue
<template>
  <Hello :msg1="name"></Hello>
</template>

<script setup lang="ts">
import Hello from './components/HelloWorld.vue'

const name = 'foo';
</script>
```



`子组件`

接收方式1：

使用`defineProps({})`接收，配置项中属性名对应标签上的属性名，type是指定类型，default是指定默认值，有默认值后可以不传递，没有默认值就必须传递该属性

接收的参数可以直接在模板中使用，但是如果要在script中使用则需要使用一个变量接收，然后用`变量.属性`才能获取

```vue
<template>
  <div class="content">
    {{ msg1 }}
  </div>
</template>

<script setup lang="ts">
let props = defineProps({
  msg1:{
    type:String,
    default:""
  }
})

console.log(props.msg1);
</script>
```

接收方式2：

使用`TS`专属方式接收：`withDefaults(参数1,参数2)`

该方法接收两个参数，第一个参数是`defineProps方法`，第二个参数是配置项，用于配置接收属性的默认值

在defineProps中使用泛型，`defineProps<{属性名:类型}>()`来接收属性

在配置项中定义默认值，而且需要一个回调函数返回属性的默认值

同样，可以直接在模板使用，在script中使用需要变量接收

```vue
<script setup lang="ts">
let props = withDefaults(defineProps<{
  msg: number[]
}>(), {
  msg: () => [1, 2]
})

console.log(props.msg);

</script>
```



## 子->父

`defineEmits`

`父组件`

定义一个自定义事件，如`on-send`，绑定父组件中的一个方法，如`getMsg`，然后让子组件去触发`on-send`，返回的数据作为父组件绑定的方法的形参

```vue
<template>
  <Hello @on-send="getMsg"></Hello>
</template>

<script setup lang="ts">
import Hello from './components/HelloWorld.vue'

let getMsg = (val: any)=>{
  console.log(val);
}
</script>
```



`子组件`

需要使用`defineEmits([])`来定义事件，事件名 对应 父组件中==给子组件标签定义的自定义事件名==，可以有多个，返回一个方法，如`emit`

使用该方法来触发某个事件名，第二个参数携带数据，会被父组件的形参所接收

```vue
<template>
  <div class="content">
    <button @click="send">点击</button>
  </div>
</template>

<script setup lang="ts">
let emit = defineEmits(['on-send'])

let send = ()=>{
  emit('on-send','erickiku');
}
</script>
```



第二种方式，使用`TS`专属方式接收：

依旧是泛型中定义类型`{(e:"事件名",形参名:形参类型):void}`，多个事件名中间不用逗号连续，不是对象，是一种类型，如：

```vue
<script setup lang="ts">
let emit = defineEmits<{
  (e:"on-send",val:string):void
  (e:"on-receive",val:string):void
}>()

let send = ()=>{
  emit('on-send','erickiku');
}
</script>
```





## 给父组件暴露属性或方法

`defineExpose({})`

`子组件`

```vue
defineExpose({
  name: 'bar',
  fun: () => {
    console.log('fun');
  }
})
```



`父组件`

先在子组件标签上定义ref和值，使用ref获取标签

`let i = ref<InstanceType<typeof HelloWorld>>();`

以上代码是可以获取到对应标签的实例类型的

使用`i.value?.暴露的属性名`来获取

但是在setup里直接获取子组件暴露的属性或方法是不能获取的到的，因为setup执行的时候，dom还没有渲染，所以应该在合适的生命周期中获取

```vue
<template>
  <HelloWorld ref="i"></HelloWorld>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const i = ref<InstanceType<typeof HelloWorld>>();

console.log(i.value?.name);
i.value?.fun()

</script>
```



# 瀑布流

使用父子组件传参

[瀑布流代码](https://blog.csdn.net/qq1195566313/article/details/122850170)



# 局部/全局组件

局部注册和全局注册和vue2一样



递归组件：

可以在组件内直接使用该组件文件名的标签来递归

`index.vue`

```vue
<indev></indev>	//直接使用自己文件名的标签
```



# ?

可选链操作符：`?.`，如果说`undefined.length`就会报错，因为undefiend没有length属性，但是可以`undefined?.length`，没有length就会直接返回undefined



`??`：当双问号前面是`undefined或null`时，返回后面的值，如果不是就返回前面的值，不包括`0和false`

```js
null ?? 123 >> 123
false ?? 123  >> false
```



# 动态组件

使用`<component>`标签来动态的展示组件，也可以使用路由实现

```html
<!-- currentTab 改变时组件也改变 -->
<component :is="tabs[currentTab]"></component>
```



```vue
<template>
  <button @click="switchItem(1)">切换组件1</button>
  <button @click="switchItem(2)">切换组件2</button>
  <component :is="com"></component>
</template>

<script setup lang="ts">
import { ref,shallowRef } from 'vue'
import Dongtai from './components/Dongtai.vue';
import Dongtai2 from './components/Dongtai2.vue';

const com = shallowRef(Dongtai)

const switchItem = (v:number)=>{
  if (v==1) {
    com.value = Dongtai
  }else{
    com.value = Dongtai2
  }
}
</script>
```

使用变量定义组件，然后在component标签中的`:is`的值填写变量。之后只要切换变量对应的组件，即可改变component标签展示的组件，实现动态切换组件



# 插槽

[V3官网--插槽](https://cn.vuejs.org/guide/components/slots.html#slots)



# 异步组件

[V3官网--异步组件](https://cn.vuejs.org/guide/components/async.html#async-components)



当组件中使用了顶层`await`时，整个组件就是一个异步组件

引入异步组件也必须使用`defineAsyncComponent`，使用必须前先引入



`子组件-异步组件`

使用了顶层await，此时就是一个异步组件，不需要async

```vue
<script setup lang='ts'>
import axios from 'axios'
let data: any;
    
await axios.get("/api/queryAllPost").then(res => {
    data = res.data
})
</script>
```



`其他引用子组件的父组件`

```vue
<template>
  <Suspense>
    <Await></Await>
    
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const Await = defineAsyncComponent(()=>import("./components/Await.vue"))
</script>
```



必须使用`defineAsyncComponent(()=>import(""))`方式引入，可以结合Vue3的`Suspense`标签使用。

标签下直接放要显示的组件，插槽中使用`#fallback`来显示异步组件未完成时展示的组件或内容



# Teleport

传送组件，可以把组件传送到任意位置

```vue
<template>
  <div class="out">
      <Teleport :disabled="false" to="body">
        <A></A>
      </Teleport>
  </div>
</template>
```

把A组件传送到body标签下，不再属于out的div标签

`:disables`可以通过js来控制是否禁用传送，为true则是禁用，不再传送



# transition动画



[V3官网-动画](https://cn.vuejs.org/guide/built-ins/transition.html#transition)



# provide依赖注入

[V3官网-provide](https://cn.vuejs.org/api/options-composition.html)

用于提供可以被后代组件注入的值。

`父组件`

```vue
<script setup lang="ts">
import { ref,provide } from 'vue'
import Provide from './components/Provide.vue';

provide("msg",ref<string>('message'));

</script>
```

`子组件及其所有后代组件`

```vue
<script setup lang='ts'>
import { ref,inject } from 'vue';

let msg = inject('msg')

</script>
```



# Mitt发布订阅库





# 自动引入插件

插件名：unplugin-auto-import，可以自动引入需要的依赖，安装之后引入插件时如果使用的是vite，则：

```vue
import AutoImport from 'unplugin-auto-import/vite'
```



# v-model

v-model在组件上使用时，可以在组件内接收v-model绑定的变量值

`父组件`

```vue
<CustomInput v-model="searchText" />
```

`子组件`

```vue
<!-- CustomInput.vue -->
<template>
  <input
    :value="modelValue"
    @input="change"
  />
</template>

<script setup>
defineProps(['modelValue'])
let emits = defineEmits(['update:modelValue'])
let change = ()=>{
    emits("update:modelValue",'change')
}
</script>

```

子组件也可以通过`defineProps`来获取到父组件双向绑定的值，接收时，第一个必须是`modelValue`，更多的v-model则根据定义的名称。而通过适当的方法也可以修改这个变量的值，从而达到双向绑定



如果要在同一个组件上绑定多个v-model，则需要给第二个以上的vmodel定义名字：`v-model:textV="value"`，在子组件中注册事件时，不再是`update:modelValue`，而是`update:textV`



# globalProperties

全局变量或方法

在main.js中定义全局可用的变量或方法

```js
app.config.globalProperties.msg = 'hello'
```

在组件模板中可以直接使用，

在js中：

```js
  mounted() {
    console.log(this.msg) // 'hello'
  }
```





# 样式穿透

当想要修改UI库或者自定义组件中的样式时，会不生效，需要样式穿透

如，eleUI的某个组件的样式是`el-input__inner`，但是直接

```css
.el-input__inner:{}
```

是不生效的，因为scoped的原因，所以需要加上:deep

```css
:deep(.el-input__inner){color:red}
```





# 宏任务与微任务

[教学视频](https://www.bilibili.com/video/BV1dS4y1y7vd/?p=46&vd_source=4826e78be6a985a9a8641312e495221e)





# unocss原子化css

原子化css：减少了css体积，提高了css复用，减少起名的复杂度，但是增加了 记忆成本

安装

```bash
$ npm i -D unocss
```



[原子化视频](https://www.bilibili.com/video/BV1dS4y1y7vd?p=49&vd_source=4826e78be6a985a9a8641312e495221e)





# 桌面程序Electron

先创建一个vite+vue3+ts的项目



[Electron官网](https://www.electronjs.org/zh/)



# 环境变量

主要作用就是让开发者区分不同的运行环境，来兼容开发和生产

例如：npm run dev就是开发环境，npm run build就是生产环境



查看环境方法：

此方法是vite方法

```js
console.log(import.meta.env);	//输出一个对象，含有环境相关的属性
```

vuecli方法是：

```
log(process.env)
```





自定义环境变量：

开发环境和生产环境都需要配置文件

新建文件：`.env`+`.任意名字`。如：`.env.development`

一般开发环境文件名：`.env.development`

生产环境文件名：`.env.production`



自定义全局环境变量时，ENV 这一变量必须写

`.env.development`

```env
ENV = 'development'

VITE_BASE_URL='/api'
```

`.env.production`

```env
ENV = 'production'

VITE_BASE_URL='/api'
```



定义好两个文件之后，使用npm run dev即可自动读取对应的development文件，打包之后使用会自动读取production文件



# Vue3性能优化

1.浏览器开发者工具的`Lighthouse`选项卡，可以给项目跑分



[其他优化](https://www.bilibili.com/video/BV1dS4y1y7vd?p=55&vd_source=4826e78be6a985a9a8641312e495221e)



























# 面试

> 异步组件打包优化问题

如果组件是异步组件，但是使用的使用是直接import from 方式引入的，那么打包时，会全部打包到一个js文件中，程序运行时会被异步组件阻挡，会有相当长的延迟时间

所以，必须使用`defineAsyncComponent`方式去引入异步组件，打包时，会另外打成一个单独的js文件，只有使用到时，才会去加载





















