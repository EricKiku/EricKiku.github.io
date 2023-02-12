---
title: Pinia
icon: boluo
category:
  - 前端
  - 工具
tag:
  - Vue3
---
# ""


# 中文文档

https://pinia.web3doc.top/



# 为什么要使用 Pina？

Pinia 是 Vue 的存储库，它允许您跨组件/页面共享状态。 如果您熟悉 Composition API，您可能会认为您已经可以通过一个简单的 `export const state = reactive({})`. 这对于单页应用程序来说是正确的，但如果它是服务器端呈现的，**会使您的应用程序暴露于安全漏洞**。 但即使在小型单页应用程序中，您也可以从使用 Pinia 中获得很多好处：

- dev-tools 支持
  - 跟踪动作、突变的时间线
  - Store 出现在使用它们的组件中
  - time travel 和 更容易的调试
- 热模块更换
  - 在不重新加载页面的情况下修改您的 Store
  - 在开发时保持任何现有状态
- 插件：使用插件扩展 Pinia 功能
- 为 JS 用户提供适当的 TypeScript 支持或 **autocompletion**
- 服务器端渲染支持



# 开始

## 安装[#](https://pinia.web3doc.top/getting-started.html#安装)

用你最喜欢的包管理器安装 `pinia`：

```
yarn add pinia
# 或者使用 npm
npm install pinia
```

提示

> 如果您的应用使用 Vue 2，您还需要安装组合 API：`@vue/composition-api`。 如果您使用 Nuxt，则应遵循 [这些说明](https://pinia.web3doc.top/ssr/nuxt.html)。

如果你使用的是 Vue CLI，你可以试试这个 [**非官方插件**](https://github.com/wobsoriano/vue-cli-plugin-pinia)。

创建一个 pinia（根存储）并将其传递给应用程序：

```
import { createPinia } from 'pinia'

app.use(createPinia())
```

## 什么是 Store ？

一个 Store （如 Pinia）是一个实体，它持有未绑定到您的组件树的状态和业务逻辑。换句话说，**它托管全局状态**。它有点像一个始终存在并且每个人都可以读取和写入的组件。它有**三个概念**，[state](https://pinia.web3doc.top/core-concepts/state.html)、[getters](https://pinia.web3doc.top/core-concepts/getters.html) 和 [actions](https://pinia.web3doc.top/core-concepts/actions.html) 并且可以安全地假设这些概念等同于组件中的“数据”、“计算”和“方法”。

## 我什么时候应该使用 

存储应该包含可以在整个应用程序中访问的数据。这包括在许多地方使用的数据，例如导航栏中显示的用户信息，以及需要通过页面保留的数据，例如一个非常复杂的多步骤表格。

另一方面，您应该避免在存储中包含可以托管在组件中的本地数据，例如页面本地元素的可见性。

并非所有应用程序都需要访问全局状态，但如果您需要一个，Pania 将使您的生活更轻松。



# 定义一个 Store[#](https://pinia.web3doc.top/core-concepts/#定义一个-store)

[Watch a free video lesson on Vue School](https://vueschool.io/lessons/define-your-first-pinia-store?friend=vuerouter)

在深入了解核心概念之前，我们需要知道 Store 是使用 `defineStore()` 定义的，并且它需要一个**唯一**名称，作为第一个参数传递：

```ts
import { defineStore } from 'pinia'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore('main', {
  // other options...
})
```

这个 *name*，也称为 *id*，是必要的，Pinia 使用它来将 store 连接到 devtools。 将返回的函数命名为 *use...* 是跨可组合项的约定，以使其符合你的使用习惯。

## 使用 store[#](https://pinia.web3doc.top/core-concepts/#使用-store)

我们正在 *定义* 一个 store，因为在 `setup()` 中调用 `useStore()` 之前不会创建 store：

```ts
import { useStore } from '@/stores/counter'

export default {
  setup() {
    const store = useStore()

    return {
      // 您可以返回整个 store 实例以在模板中使用它
      store,
    }
  },
}
```

您可以根据需要定义任意数量的 store ，并且**您应该在不同的文件中定义每个 store **以充分利用 pinia（例如自动允许您的包进行代码拆分和 TypeScript 推理）。

如果您还没有使用 `setup` 组件，[您仍然可以将 Pinia 与 *map helpers* 一起使用](https://pinia.web3doc.top/cookbook/options-api.html)。

一旦 store 被实例化，你就可以直接在 store 上访问 `state`、`getters` 和 `actions` 中定义的任何属性。 我们将在接下来的页面中详细介绍这些内容，但自动补全会对您有所帮助。

请注意，`store` 是一个用`reactive` 包裹的对象，这意味着不需要在getter 之后写`.value`，但是，就像`setup` 中的`props` 一样，**我们不能对其进行解构**：

```
export default defineComponent({
  setup() {
    const store = useStore()
    // ❌ 这不起作用，因为它会破坏响应式
    // 这和从 props 解构是一样的
    const { name, doubleCount } = store

    name // "eduardo"
    doubleCount // 2

    return {
      // 一直会是 "eduardo"
      name,
      // 一直会是 2
      doubleCount,
      // 这将是响应式的
      doubleValue: computed(() => store.doubleCount),
      }
  },
})
```

为了从 Store 中提取属性同时保持其响应式，您需要使用`storeToRefs()`。 它将为任何响应式属性创建 refs。 当您仅使用 store 中的状态但不调用任何操作时，这很有用：

```
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const store = useStore()
    // `name` 和 `doubleCount` 是响应式引用
    // 这也会为插件添加的属性创建引用
    // 但跳过任何 action 或 非响应式（不是 ref/reactive）的属性
    const { name, doubleCount } = storeToRefs(store)

    return {
      name,
      doubleCount
    }
  },
}
```

## 解构store

```js
import { useStore } from './store/index'

const Store = useStore();

//这个方式结构出来的三个变量不是响应式的，修改不会影响state
let {current,msg,name} = Store
```

响应式解构方法：使用新的API

```ts
import { useStore } from './store/index'
import {storeToRefs} from 'pinia'

const Store = useStore();

//这个方式解构出来的是响应式
let {current,msg,name} = storeToRefs(Store)
//修改值需要使用.value	
const change =  ()=>{
  current.value = 10;
  msg.value='no';
  name.value='eric'
  console.log(current,msg,name);
}
```





# State

[Watch a free video lesson on Vue School](https://vueschool.io/lessons/access-state-from-a-pinia-store?friend=vuerouter)

大多数时候，state 是 store 的核心部分。 我们通常从定义应用程序的状态开始。 在 Pinia 中，状态被定义为返回初始状态的函数。 Pinia 在服务器端和客户端都可以工作。

```ts
import { defineStore } from 'pinia'

const useStore = defineStore('storeId', {
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      counter: 0,
      name: 'Eduardo',
      isAdmin: true,
    }
  },
})
```

提示

>  如果您使用的是 Vue 2，您在 `state` 中创建的数据遵循与 Vue 实例中的 `data` 相同的规则，即 state 对象必须是普通的，并且您需要在以下情况下调用 `Vue.set()` **为其添加新的**属性。 **另请参阅：[Vue#data](https://vuejs.org/v2/api/#data)**。

## 访问 “state”

默认情况下，您可以通过 `store` 实例访问状态来直接读取和写入状态：

```ts
const store = useStore()

store.counter++
```





## 修改state

修改有四种方法

1.直接修改，不推荐

2.使用$patch方法，参数是对象，对象中的属性是state的属性

3.使用$patch方法，参数是箭头函数，参数是state，可以修改state中的值

4.使用action,在action中定义方法，然后调用，注意在action中的方法不能是箭头函数，this会出错

```js
import { useStore } from './store/index'

const Store = useStore();

const change = ()=>{
  //1. Store.current++;
  //2. Store.$patch({current:5})
  //3. Store.$patch((state)=>{
  //   state.current++
  // })
  //4. Store.setCurrent(50);
}
```



# API

### 1.$reset()

重置state到初始值

```js
const store = useStore()

store.$reset()
```

### 2.$subscribe()

订阅状态，任何state的变化都会触发这个函数

```ts
const store = useStore()

//args:有新值旧值等属性，state就是state
store.$subscribe((args,state)=>{})
```

### 3.$onActions()

订阅Action的状态，action的函数触发会触发这个方法

```ts
const store = useStore()

//args是带有一些属性的对象
store.$onAction((args)=>{})
```



# 插件

pinia不是持久化，想要持久化需要插件
